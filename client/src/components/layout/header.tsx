import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import SearchDialog from "@/components/ui/search-dialog";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, toggleDrawer } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl lg:text-2xl font-bold text-primary-600">
              lovelang.
            </Link>
            
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <Link href="/" className="text-sm lg:text-base text-stone-700 hover:text-primary-600 transition-colors">
                Our Hair Kit
              </Link>
              <a href="#peach-products" className="text-sm lg:text-base text-stone-700 hover:text-primary-600 transition-colors">
                For Hair Fall
              </a>
              <a href="#mango-products" className="text-sm lg:text-base text-stone-700 hover:text-primary-600 transition-colors">
                For Frizz
              </a>
              <a href="#avocado-products" className="text-sm lg:text-base text-stone-700 hover:text-primary-600 transition-colors">
                For Damage
              </a>
            </nav>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="p-2"
              >
                <Search className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDrawer}
                className="relative p-2"
              >
                <ShoppingBag className="w-4 h-4 lg:w-5 lg:h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden p-2">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link href="/" className="text-stone-700 hover:text-primary-600 transition-colors">
                      Our Hair Kit
                    </Link>
                    <a href="#peach-products" className="text-stone-700 hover:text-primary-600 transition-colors">
                      For Hair Fall
                    </a>
                    <a href="#mango-products" className="text-stone-700 hover:text-primary-600 transition-colors">
                      For Frizz
                    </a>
                    <a href="#avocado-products" className="text-stone-700 hover:text-primary-600 transition-colors">
                      For Damage
                    </a>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
