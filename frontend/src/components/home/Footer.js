import Link from "next/link";
import { Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6 text-2xl font-display font-bold tracking-tighter text-white">
            <Store className="text-neon-primary" />
            LIANA LUXE
          </Link>
          <p className="text-gray-400 max-w-sm">
            Next-generation ecommerce platform merging premium fashion, fragrance, and digital experiences.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-display">Explore</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link href="/shop" className="hover:text-neon-primary transition-colors">Shop All</Link></li>
            <li><Link href="/collections" className="hover:text-neon-primary transition-colors">Collections</Link></li>
            <li><Link href="/about" className="hover:text-neon-primary transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-display">Connect</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-neon-primary transition-colors">Twitter (X)</a></li>
            <li><a href="#" className="hover:text-neon-primary transition-colors">Discord</a></li>
            <li><a href="#" className="hover:text-neon-primary transition-colors">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} LIANA LUXE. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
