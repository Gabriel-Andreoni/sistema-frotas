"use client";

import { useState } from "react";
import { Menu } from "../components/menu";
import toast, { Toaster } from "react-hot-toast";
import { formatarFrotas } from "./formatarFrotas";

export default function CadastrarFrotas() {
  const [frotasRaw, setFrotasRaw] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sucess, setSucess] = useState<boolean>(false);

  async function cadastrarFrotas() {
    const frotasFormatadas = formatarFrotas(frotasRaw);

    setIsLoading(true);

    const req = await fetch("http://localhost:3000/api/frotas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(frotasFormatadas),
    });

    if (req.status === 200) {
      setSucess(true);
      toast("Frota cadastrada com sucesso.");
      setFrotasRaw("");
      setIsLoading(false);
    } else {
      setSucess(false);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {sucess && <Toaster />}
      <Menu />

      <div className="w-8/12 p-4">
        <textarea
          className="w-full h-full p-4 border bg-[#ffffff10] rounded-lg resize-none outline-none"
          onChange={(e) => {
            setFrotasRaw(e.target.value);
          }}
          value={frotasRaw}
        ></textarea>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <button
          className="p-2 bg-green-500 rounded-lg cursor-pointer"
          onClick={cadastrarFrotas}
          disabled={isLoading}
        >
          Cadastrar Frota
        </button>
        <button
          className="p-2 bg-red-500 rounded-lg cursor-pointer"
          onClick={() => setFrotasRaw("")}
          disabled={isLoading}
        >
          Limpar Frotas
        </button>
      </div>
    </div>
  );
}
