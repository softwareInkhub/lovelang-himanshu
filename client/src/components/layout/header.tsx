import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, toggleDrawer } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            lovelang.
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-stone-700 hover:text-primary-600 transition-colors">
              Our Hair Kit
            </Link>
            <Link href="/products" className="text-stone-700 hover:text-primary-600 transition-colors">
              For Hair Fall
            </Link>
            <Link href="/products" className="text-stone-700 hover:text-primary-600 transition-colors">
              For Frizz
            </Link>
            <Link href="/products" className="text-stone-700 hover:text-primary-600 transition-colors">
              For Damage
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDrawer}
              className="relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-stone-700 hover:text-primary-600 transition-colors">
                    Our Hair Kit
                  </Link>
                  <Link href="/products" className="text-stone-700 hover:text-primary-600 transition-colors">
                    For Hair Fall
                  </Link>
                  <Link href="/products" className="text-stone-700 hover:text-primary-600 transition-colors">
                    For Frizz
                  </Link>
                  <Link href="/products" className="text-stone-700 hover:text-primary-600 transition-colors">
                    For Damage
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
