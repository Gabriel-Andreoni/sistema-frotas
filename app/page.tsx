import { AnalisarFrotas } from "./analisarFrotas";
import { Menu } from "./components/menu";

export default function Home() {
  return (
    <main className="w-full h-screen flex">
      <Menu />
      <AnalisarFrotas />
    </main>
  );
}
