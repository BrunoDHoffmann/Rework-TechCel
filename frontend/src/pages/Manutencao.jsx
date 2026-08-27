import { useEffect, useState } from "react";
import { api } from "../api.js";
import { generateServicePDF } from "../pdf.js";

function formatDate(value) {
  return new Date(value).toLocaleString("pt-BR");
}

export default function Manutencao() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [includeValues, setIncludeValues] = useState(true);
  const [cart, setCart] = useState([]); // { item_id, name, quantity_used, available }
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [itemSearch, setItemSearch] = useState("");
  const [itemCatFilter, setItemCatFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // OS a excluir
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadItems() {
    setItems(await api.listItems());
  }

  async function loadServices() {
    setServices(await api.listServices());
  }

  useEffect(() => {
    loadItems();
    loadServices();
    api.listCategories().then(setCategories);
  }, []);

  const filteredItems = items.filter((i) => {
    const matchName =
      !itemSearch || i.name.toLowerCase().includes(itemSearch.toLowerCase());
    const matchCat = !itemCatFilter || i.category_id === Number(itemCatFilter);
    return matchName && matchCat;
  });

  function flashError(msg) {
    setError(msg);
    setTimeout(() => setError(""), 4000);
  }

  function addToCart() {
    if (!selectedItem) return;
    const item = items.find((i) => i.id === Number(selectedItem));
    if (!item) return;
    const qty = Number(selectedQty);
    if (qty <= 0) return;

    setCart((prev) => {
      const existing = prev.find((c) => c.item_id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item_id === item.id
            ? { ...c, quantity_used: c.quantity_used + qty }
            : c
        );
      }
      return [
        ...prev,
        {
          item_id: item.id,
          name: item.name,
          quantity_used: qty,
          available: item.quantity,
        },
      ];
    });
    setSelectedItem("");
    setSelectedQty(1);
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((c) => c.item_id !== itemId));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return flashError("Descreva a manutenção.");
    if (cart.length === 0) return flashError("Adicione ao menos um item.");

    try {
      await api.createService({
        description: description.trim(),
        client_name: clientName.trim() || null,
        items: cart.map((c) => ({
          item_id: c.item_id,
          quantity_used: c.quantity_used,
        })),
      });
      setDescription("");
      setClientName("");
      setCart([]);
      setSuccess("Manutenção registrada e estoque atualizado.");
      setTimeout(() => setSuccess(""), 4000);
      loadItems();
      loadServices();
    } catch (err) {
      flashError(err.message);
    }
  }

  async function confirmDelete(restoreStock) {
    if (!deleteTarget) return;
    try {
      await api.deleteService(deleteTarget.id, restoreStock);
      setDeleteTarget(null);
      loadServices();
      if (restoreStock) loadItems(); // estoque mudou, atualiza a lista de peças
    } catch (err) {
      setDeleteTarget(null);
      flashError(err.message);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Nova manutenção */}
      <section className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Nova manutenção</h2>

        {error && (
          <div className="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg bg-emerald-100 px-4 py-2 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Cliente (opcional)
            </label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nome do cliente"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Descrição do serviço
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex.: Manutenção de celular — troca de bateria e conector"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Peças utilizadas
            </label>
            <div className="mb-2 flex flex-col gap-2 sm:flex-row">
              <input
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)}
                placeholder="Pesquisar peça por nome..."
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <select
                value={itemCatFilter}
                onChange={(e) => setItemCatFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-48"
              >
                <option value="">Todas as categorias</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">
                  {filteredItems.length
                    ? "Selecione uma peça..."
                    : "Nenhuma peça encontrada"}
                </option>
                {filteredItems.map((i) => (
                  <option key={i.id} value={i.id} disabled={i.quantity <= 0}>
                    {i.name} (estoque: {i.quantity})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={selectedQty}
                onChange={(e) => setSelectedQty(e.target.value)}
                className="w-16 shrink-0 rounded-lg border border-slate-300 px-2 py-2 text-center text-sm"
              />
              <button
                type="button"
                onClick={addToCart}
                className="shrink-0 whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Adicionar
              </button>
            </div>
          </div>

          {cart.length > 0 && (
            <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {cart.map((c) => (
                <li
                  key={c.item_id}
                  className="flex items-center justify-between px-3 py-2 text-sm"
                >
                  <span>
                    {c.name}{" "}
                    <span className="text-slate-400">
                      × {c.quantity_used}
                    </span>
                    {c.quantity_used > c.available && (
                      <span className="ml-2 text-red-500">
                        (estoque: {c.available})
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(c.item_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    remover
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            Registrar manutenção e baixar estoque
          </button>
        </form>
      </section>

      {/* Histórico */}
      <section className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Histórico de manutenções</h2>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={includeValues}
              onChange={(e) => setIncludeValues(e.target.checked)}
              className="h-4 w-4"
            />
            Incluir valores no PDF
          </label>
        </div>
        {services.length === 0 && (
          <p className="text-sm text-slate-400">
            Nenhuma manutenção registrada ainda.
          </p>
        )}
        <ul className="space-y-3">
          {services.map((s) => (
            <li key={s.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{s.description}</p>
                  <p className="text-xs text-slate-400">
                    OS Nº {String(s.id).padStart(4, "0")} • {formatDate(s.created_at)}
                    {s.client_name ? ` • ${s.client_name}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => generateServicePDF(s, { includeValues })}
                    className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-700"
                  >
                    Gerar PDF
                  </button>
                  <button
                    onClick={() => setDeleteTarget(s)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    excluir
                  </button>
                </div>
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {s.items.map((si) => (
                  <li
                    key={si.id}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs"
                  >
                    {si.item_name} × {si.quantity_used}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Modal de confirmação ao excluir uma OS */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">
              Excluir OS Nº {String(deleteTarget.id).padStart(4, "0")}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Deseja devolver ao estoque os itens usados nesta manutenção?
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {deleteTarget.items.map((si) => (
                <li
                  key={si.id}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs"
                >
                  {si.item_name} × {si.quantity_used}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => confirmDelete(true)}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                Sim, devolver ao estoque e excluir
              </button>
              <button
                onClick={() => confirmDelete(false)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
              >
                Não devolver, apenas excluir
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
