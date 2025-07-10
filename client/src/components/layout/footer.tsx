import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold text-primary-400 mb-6">lovelang.</div>
            <p className="text-stone-300 mb-6">
              Fruit-powered, science-backed hair care solutions for every hair concern.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-6 h-6 hover:text-primary-400 cursor-pointer transition-colors" />
              <Facebook className="w-6 h-6 hover:text-primary-400 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 hover:text-primary-400 cursor-pointer transition-colors" />
              <Youtube className="w-6 h-6 hover:text-primary-400 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Products</h4>
            <ul className="space-y-3 text-stone-300">
              <li><Link href="/products/mango-hyaluronic" className="hover:text-white transition-colors">Mango + Hyaluronic</Link></li>
              <li><Link href="/products/peach-biotin" className="hover:text-white transition-colors">Peach + Biotin</Link></li>
              <li><Link href="/products/avocado-ceramide" className="hover:text-white transition-colors">Avocado + Ceramide</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Hair Masks</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-stone-300">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-stone-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/ingredients" className="hover:text-white transition-colors">Ingredients</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400 mb-4 md:mb-0">
              © 2025 YUSHKA COSMETICS LLP. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-stone-400">We Accept:</span>
              <div className="flex space-x-3">
                <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                <div className="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                <div className="w-8 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center">UPI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
