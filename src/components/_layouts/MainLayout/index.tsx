import { MainLayoutProps } from "./_types";
import Header from "./header";
import Footer from "./footer";

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-amber-500 selection:text-white">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
