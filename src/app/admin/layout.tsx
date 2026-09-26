import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Réserve les 80 px occupés par le header fixe sur toutes les pages admin.
  return <div className="pt-20">{children}</div>;
}
