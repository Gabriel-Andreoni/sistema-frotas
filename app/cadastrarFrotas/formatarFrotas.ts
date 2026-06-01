export function formatarFrotas(frota: string) {
  return frota
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const frota = line.match(/display\s*:\s*['"]([^'"]+)['"]/i);
      if (!frota) return [];
      return frota[1].split(" - ").join(" - ").trim();
    });
}
