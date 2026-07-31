import type { ReactNode } from "react";

type DataTableProps = {
  children: ReactNode;
};

export default function DataTable({
  children,
}: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <table className="w-full text-left">
        {children}
      </table>
    </div>
  );
}