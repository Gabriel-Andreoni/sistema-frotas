"use client";

import { useEffect, useState } from "react";

export function AnalisarFrotas() {
  const [frotas, setFrotas] = useState([]);
  const [frotasParaProcurar, setFrotasParaProcurar] = useState("");
  const [frotasDuplicadas, setFrotasDuplicadas] = useState([]);
  useEffect(() => {
    async function getFrotas() {
      const req = await fetch("/api/frotas");
      const frotasAPI = await req.json();

      setFrotas(frotasAPI);
    }

    getFrotas();
  }, []);

  function procurarFrotas() {
    const frotasSplitada = frotasParaProcurar.split("\n");
    const frotasSet = new Set(frotasSplitada.map((f) => f));

    setFrotasDuplicadas(
      frotas.map((f) => (frotasSet.has(f) ? f : null)).filter((f) => f != null),
    );
  }

  return (
    <div className="w-9/12 h-full p-4 flex gap-4 items-start">
      <ul className="w-4/12 h-full p-4 flex flex-col gap-2 border bg-white/10 rounded-lg overflow-y-scroll scrollbar-none">
        {frotas === undefined ? (
          <span>Não tem frotas</span>
        ) : (
          frotas.map((f, index) => {
            return (
              <li className="w-full" key={index}>
                {f}
              </li>
            );
          })
        )}
      </ul>
      <textarea
        className="w-4/12 h-full p-4 border bg-white/10 rounded-lg outline-none resize-none scrollbar-none"
        onChange={(e) => setFrotasParaProcurar(e.target.value)}
        value={frotasParaProcurar}
      ></textarea>
      <ul className="w-4/12 h-full p-4 bg-white/10 border rounded-lg overflow-y-scroll scrollbar-none">
        {frotasDuplicadas.length === 0 ? (
          <span>Não existem frotas duplicadas</span>
        ) : (
          frotasDuplicadas.map((f, i) => {
            return <li key={i}>{f}</li>;
          })
        )}
      </ul>
      <button
        onClick={procurarFrotas}
        className="p-2 bg-green-500 rounded-lg cursor-pointer"
      >
        Procurar
      </button>
    </div>
  );
}
