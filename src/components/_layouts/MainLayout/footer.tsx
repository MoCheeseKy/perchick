import Link from "next/link";
import Wrapper from "@/components/_shared/Wrapper";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white text-neutral-600 text-xs py-8">
      <Wrapper backgroundColor="bg-transparent">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-neutral-900">
              perchick<span className="text-orange-500">.</span>
            </span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-500 text-xs">
              Toko Olahan Ayam Pilihan
            </span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/" className="hover:text-neutral-950 transition-colors">
              Beranda
            </Link>
            <Link href="/products" className="hover:text-neutral-950 transition-colors">
              Katalog
            </Link>
            <Link href="/product-managements" className="hover:text-neutral-950 transition-colors">
              Admin
            </Link>
            <a
              href="https://wa.me/6281210714320"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-neutral-400 text-[11px] gap-2">
          <p>© {new Date().getFullYear()} Perchick Store. Seluruh hak cipta dilindungi.</p>
          <p>Tugas Besar Web Programming • Telkom University</p>
        </div>
      </Wrapper>
    </footer>
  );
}
