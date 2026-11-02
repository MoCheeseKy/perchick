import { AdminLayoutProps } from "./_types";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import AdminFooter from "./footer";

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-neutral-100 text-neutral-900 font-sans">
      <AdminSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
