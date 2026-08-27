// Usa a API no MESMO host em que a tela foi aberta (localhost, 127.0.0.1 ou
// um IP da rede), na porta 8010. Assim não depende de o "localhost" funcionar
// na máquina. Pode ser sobrescrito por VITE_API_URL, se definido.
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:8010`;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let detail = "Erro na requisição";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch {
      // ignora corpo não-JSON
    }
    throw new Error(detail);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // Categorias
  listCategories: () => request("/categories"),
  createCategory: (name) =>
    request("/categories", { method: "POST", body: JSON.stringify({ name }) }),
  updateCategory: (id, name) =>
    request(`/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
    }),
  deleteCategory: (id) =>
    request(`/categories/${id}`, { method: "DELETE" }),

  // Itens
  listItems: ({ search, categoryId } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryId) params.set("category_id", categoryId);
    const qs = params.toString();
    return request(`/items${qs ? `?${qs}` : ""}`);
  },
  createItem: (payload) =>
    request("/items", { method: "POST", body: JSON.stringify(payload) }),
  updateItem: (id, payload) =>
    request(`/items/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  adjustQuantity: (id, delta) =>
    request(`/items/${id}/quantity`, {
      method: "PATCH",
      body: JSON.stringify({ delta }),
    }),
  deleteItem: (id) => request(`/items/${id}`, { method: "DELETE" }),

  // Manutenções
  listServices: () => request("/services"),
  createService: (payload) =>
    request("/services", { method: "POST", body: JSON.stringify(payload) }),
  deleteService: (id, restoreStock = false) =>
    request(`/services/${id}?restore_stock=${restoreStock}`, {
      method: "DELETE",
    }),
};
