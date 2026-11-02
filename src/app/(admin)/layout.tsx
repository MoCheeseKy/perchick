import { ReactNode } from "react";
import AdminLayout from "@/components/_layouts/AdminLayout";

export default function AdminAppLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
