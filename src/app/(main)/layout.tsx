import { ReactNode } from "react";
import MainLayout from "@/components/_layouts/MainLayout";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
