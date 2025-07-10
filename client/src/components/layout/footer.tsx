import { useState } from "react";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-stone-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="text-center mb-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Get <span className="italic">early access</span> to launches, offers, and all things about lovelang
          </h3>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-stone-900"
              required
            />
            <Button type="submit" variant="secondary" className="bg-white text-primary-600 hover:bg-stone-100">
              Subscribe
            </Button>
          </form>
          <p className="text-primary-100 text-sm mt-4">
            By signing up, you agree with our privacy policy.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold text-primary-400 mb-6">lovelang.</div>
            <p className="text-stone-300 mb-6">
              Fruit-powered, science-backed hair care solutions for every hair concern.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
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
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-3">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold mb-2">Pan India delivery</h4>
            <p className="text-stone-400 text-sm">Receive your order anywhere in india.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-3">
              <div className="text-white font-bold">48h</div>
            </div>
            <h4 className="font-semibold mb-2">Fast shipping</h4>
            <p className="text-stone-400 text-sm">Super fast dispatch in 48 hours.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-3">
              <div className="text-white font-bold">24/7</div>
            </div>
            <h4 className="font-semibold mb-2">Customer service</h4>
            <p className="text-stone-400 text-sm">We are available from Monday to Friday to answer your questions.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-3">
              <div className="text-white font-bold">🔒</div>
            </div>
            <h4 className="font-semibold mb-2">Secure payment</h4>
            <p className="text-stone-400 text-sm">Your payment information is processed securely.</p>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-stone-400 mb-2">
                © 2025 YUSHKA COSMETICS LLP. All Rights Reserved.
              </p>
              <p className="text-stone-500 text-sm">
                Address: 1106/B, East 14 Road, Ankleshwar Le Sub Post Office, Ankleshwar GIDC, Ankleshwar, Bharuch, Gujarat – 393002
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-stone-400 text-sm">We Accept:</span>
              <div className="flex space-x-3">
                <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                <div className="w-10 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">UPI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
