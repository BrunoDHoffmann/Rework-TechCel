import { useState } from "react";
import Estoque from "./pages/Estoque.jsx";
import Manutencao from "./pages/Manutencao.jsx";

const TABS = [
  { id: "estoque", label: "Estoque" },
  { id: "manutencao", label: "Manutenção" },
];

export default function App() {
  const [tab, setTab] = useState("estoque");

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-slate-900 text-white shadow">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">Rework Tec Cel</h1>
            <p className="text-sm text-slate-300">
              Controle de estoque de peças de manutenção
            </p>
          </div>
          <nav className="flex gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  tab === t.id
                    ? "bg-white text-slate-900"
                    : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {tab === "estoque" ? <Estoque /> : <Manutencao />}
      </main>
    </div>
  );
}
