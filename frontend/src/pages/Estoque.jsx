import { useEffect, useState } from "react";
import { api } from "../api.js";

const emptyForm = {
  name: "",
  category_id: "",
  quantity: 0,
  cost_price: "",
  sale_price: "",
};

// Input numérico que mantém um rascunho próprio e só confirma (onCommit)
// quando o valor realmente muda, ao sair do campo ou apertar Enter.
function EditableNumber({ value, onCommit, className, step = "1" }) {
  const [draft, setDraft] = useState(value ?? "");

  useEffect(() => {
    setDraft(value ?? "");
  }, [value]);

  function commit() {
    if (String(draft) !== String(value ?? "")) onCommit(draft);
  }

  return (
    <input
      type="number"
      min="0"
      step={step}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
      className={className}
    />
  );
}

export default function Estoque() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [newCategory, setNewCategory] = useState("");
  const [editingCat, setEditingCat] = useState(null); // { id, name }
  const [error, setError] = useState("");

  async function loadCategories() {
    setCategories(await api.listCategories());
  }

  async function loadItems() {
    setItems(
      await api.listItems({
        search: search || undefined,
        categoryId: filterCategory || undefined,
      })
    );
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterCategory]);

  function handleError(err) {
    setError(err.message);
    setTimeout(() => setError(""), 4000);
  }

  async function handleCreateItem(e) {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        quantity: Number(form.quantity) || 0,
        cost_price: form.cost_price === "" ? null : Number(form.cost_price),
        sale_price: form.sale_price === "" ? null : Number(form.sale_price),
        category_id: form.category_id === "" ? null : Number(form.category_id),
      };
      await api.createItem(payload);
      setForm(emptyForm);
      loadItems();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleAdjust(item, delta) {
    try {
      await api.adjustQuantity(item.id, delta);
      loadItems();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleSetQuantity(item, value) {
    const target = Number(value);
    if (Number.isNaN(target) || target < 0) return;
    const delta = target - item.quantity;
    if (delta === 0) return;
    try {
      await api.adjustQuantity(item.id, delta);
      loadItems();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleDeleteItem(id) {
    if (!confirm("Excluir este item?")) return;
    try {
      await api.deleteItem(id);
      loadItems();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleUpdatePrice(item, field, rawValue) {
    const value = rawValue === "" ? null : Number(rawValue);
    if (value !== null && (Number.isNaN(value) || value < 0)) return;
    if (String(item[field] ?? "") === String(rawValue)) return; // sem mudança
    try {
      await api.updateItem(item.id, { [field]: value });
      loadItems();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleRenameCategory() {
    if (!editingCat || !editingCat.name.trim()) {
      setEditingCat(null);
      return;
    }
    try {
      await api.updateCategory(editingCat.id, editingCat.name.trim());
      setEditingCat(null);
      loadCategories();
      loadItems();
    } catch (err) {
      handleError(err);
      setEditingCat(null);
    }
  }

  async function handleCreateCategory(e) {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await api.createCategory(newCategory.trim());
      setNewCategory("");
      loadCategories();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleDeleteCategory(id) {
    if (!confirm("Excluir categoria? Os itens ficarão sem categoria.")) return;
    try {
      await api.deleteCategory(id);
      loadCategories();
      loadItems();
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Categorias */}
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Categorias</h2>
        <form onSubmit={handleCreateCategory} className="mb-3 flex gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nova categoria"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
            Adicionar
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {categories.length === 0 && (
            <span className="text-sm text-slate-400">Nenhuma categoria.</span>
          )}
          {categories.map((c) =>
            editingCat && editingCat.id === c.id ? (
              <span
                key={c.id}
                className="flex items-center gap-1 rounded-full bg-slate-200 px-2 py-1 text-sm"
              >
                <input
                  autoFocus
                  value={editingCat.name}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, name: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameCategory();
                    if (e.key === "Escape") setEditingCat(null);
                  }}
                  className="w-32 rounded border border-slate-300 px-2 py-0.5 text-sm"
                />
                <button
                  onClick={handleRenameCategory}
                  className="text-emerald-600 hover:text-emerald-800"
                  title="Salvar"
                >
                  ✓
                </button>
                <button
                  onClick={() => setEditingCat(null)}
                  className="text-slate-400 hover:text-slate-600"
                  title="Cancelar"
                >
                  ×
                </button>
              </span>
            ) : (
              <span
                key={c.id}
                className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm"
              >
                {c.name}
                <button
                  onClick={() => setEditingCat({ id: c.id, name: c.name })}
                  className="text-slate-400 hover:text-slate-700"
                  title="Renomear categoria"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDeleteCategory(c.id)}
                  className="text-slate-400 hover:text-red-600"
                  title="Excluir categoria"
                >
                  ×
                </button>
              </span>
            )
          )}
        </div>
      </section>

      {/* Cadastro de item */}
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Cadastrar item</h2>
        <form
          onSubmit={handleCreateItem}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6"
        >
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nome da peça"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm lg:col-span-2"
          />
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            placeholder="Qtd"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.cost_price}
            onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
            placeholder="Custo (opcional)"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.sale_price}
            onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
            placeholder="Venda (opcional)"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 lg:col-span-6">
            Cadastrar item
          </button>
        </form>
      </section>

      {/* Busca e filtro */}
      <section className="flex flex-col gap-3 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar por nome..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-56"
        >
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </section>

      {/* Lista de itens */}
      <section className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Custo</th>
              <th className="px-4 py-3">Venda</th>
              <th className="px-4 py-3 text-center">Quantidade</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-slate-400">
                  Nenhum item encontrado.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3 text-slate-500">
                  {item.category ? item.category.name : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400">R$</span>
                    <EditableNumber
                      value={item.cost_price}
                      step="0.01"
                      onCommit={(v) => handleUpdatePrice(item, "cost_price", v)}
                      className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-right"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400">R$</span>
                    <EditableNumber
                      value={item.sale_price}
                      step="0.01"
                      onCommit={(v) => handleUpdatePrice(item, "sale_price", v)}
                      className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-right"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleAdjust(item, -1)}
                      className="h-8 w-8 rounded-lg bg-slate-200 font-bold hover:bg-slate-300"
                    >
                      −
                    </button>
                    <EditableNumber
                      value={item.quantity}
                      onCommit={(v) => handleSetQuantity(item, v)}
                      className="w-16 rounded-lg border border-slate-300 px-2 py-1 text-center"
                    />
                    <button
                      onClick={() => handleAdjust(item, 1)}
                      className="h-8 w-8 rounded-lg bg-slate-200 font-bold hover:bg-slate-300"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
