import { Search } from "lucide-react";

export default function HeaderSearch() {
  return (
    <div className="hidden max-w-md flex-1 items-center lg:flex">
      <div className="flex w-full items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3">
        <Search className="h-4 w-4 text-zinc-500" />

        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
        />
      </div>
    </div>
  );
}