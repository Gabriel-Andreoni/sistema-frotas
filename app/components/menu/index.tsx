"use client";

import { useState } from "react";
import Link from "next/link";

export function Menu() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  return (
    <nav
      className={`${isOpen ? "w-3/12" : "w-2/12"} h-full bg-green-500 transition-all`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <ul className="w-full h-full p-4 flex flex-col justify-center items-start gap-2">
        <li className="text-xl cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="text-xl cursor-pointer">
          <Link href="/cadastrarFrotas">Cadastrar Frota</Link>
        </li>
      </ul>
    </nav>
  );
}
