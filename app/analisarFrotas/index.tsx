"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function AnalisarFrotas() {
  const [frotas, setFrotas] = useState([]);
  const [frotasParaProcurar, setFrotasParaProcurar] = useState("");
  const [frotasDuplicadas, setFrotasDuplicadas] = useState([]);
  const [temFrotaDuplicada, setTemFrotaDuplicada] = useState(Boolean);

  useEffect(() => {
    async function getFrotas() {
      const req = await fetch("/api/frotas");
      const frotasAPI = await req.json();

      setFrotas(frotasAPI[0]);
    }

    getFrotas();
  }, []);

  function procurarFrotas() {
    const frotasSplitada = frotasParaProcurar.split("\n");
    const frotasSet = new Set(frotasSplitada.map((f) => f));

    const frotasDuplicadasArray = frotas.map((f) => (frotasSet.has(f) ? f : null)).filter((f) => f != null);
    if(frotasDuplicadasArray.length === 0) {
      setTemFrotaDuplicada(true);
      toast("Não existem frotas duplicadas.", {toasterId: "frotaDuplicada"});
    } else {
      setTemFrotaDuplicada(false);
      toast(`Frotas duplicadas: ${frotasDuplicadasArray.length}`, {toasterId: "frotaDuplicada"})
    }


    setFrotasDuplicadas(
      frotas.map((f) => (frotasSet.has(f) ? f : null)).filter((f) => f != null),
    );
  }

  return (
    <div className="w-9/12 h-full p-4 flex gap-4 items-start">
      {temFrotaDuplicada ? <Toaster toasterId="frotaDuplicada" /> : <Toaster toasterId="frotaDuplicada" />}
      <ul className="w-4/12 h-full p-4 flex flex-col gap-2 border bg-white/10 rounded-lg overflow-y-scroll scrollbar-none">
        {frotas != undefined ? (
          frotas.map((f, index) => {
            return (
              <li className="w-full" key={index}>
                {f}
              </li>
            );
          })
        ) : (
          <span>Nenhuma frota cadastrada</span>
        )}
      </ul>
      <textarea
        className="w-4/12 h-full p-4 border bg-white/10 rounded-lg outline-none resize-none scrollbar-none"
        onChange={(e) => setFrotasParaProcurar(e.target.value)}
        value={frotasParaProcurar}
      ></textarea>
      <ul className="w-4/12 h-full p-4 bg-white/10 border rounded-lg overflow-y-scroll scrollbar-none">
        {frotasDuplicadas.length === 0 ? (
          null
        ) : (
          frotasDuplicadas.map((f, i) => {
            return <li key={i}>{f}</li>;
          })
        )}
      </ul>
      <button
        onClick={procurarFrotas}
        className="w-28 p-2 bg-green-500 text-black rounded-lg cursor-pointer"
      >
        Procurar
      </button>
      <button
        onClick={() => setFrotasParaProcurar("")}
        className="w-28 p-2 bg-red-500 text-black rounded-lg cursor-pointer"
      >
        Limpar
      </button>
    </div>
  );
}
