import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useAuth } from "@/hooks/useAuth";
import SearchDialog from "@/components/ui/search-dialog";
import LoginButton from "@/components/auth/login-button";
import UserProfile from "@/components/auth/user-profile";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, toggleDrawer } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [location, navigate] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const navigateToSection = (sectionId: string, category?: string) => {
    if (location !== '/') {
      // Navigate to home page first
      navigate('/');
      // Wait for navigation to complete, then scroll and filter
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          if (category) {
            setTimeout(() => {
              const categoryBtn = document.querySelector(`[data-category="${category}"]`) as HTMLButtonElement;
              categoryBtn?.click();
            }, 500);
          }
        }
      }, 100);
    } else {
      // Already on home page, just scroll and filter
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (category) {
          setTimeout(() => {
            const categoryBtn = document.querySelector(`[data-category="${category}"]`) as HTMLButtonElement;
            categoryBtn?.click();
          }, 500);
        }
      }
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl lg:text-2xl font-bold text-stone-900">
              lovelang.
            </Link>
            
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <button 
                onClick={() => navigateToSection('best-sellers')}
                className="text-sm lg:text-base text-stone-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                Our Hair Kit
              </button>
              <button 
                onClick={() => navigateToSection('best-sellers', 'hair-fall')}
                className="text-sm lg:text-base text-stone-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                For Hair Fall
              </button>
              <button 
                onClick={() => navigateToSection('best-sellers', 'frizz')}
                className="text-sm lg:text-base text-stone-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                For Frizz
              </button>
              <button 
                onClick={() => navigateToSection('best-sellers', 'damage')}
                className="text-sm lg:text-base text-stone-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                For Damage
              </button>
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

              {/* Auth Section */}
              {!isLoading && (
                isAuthenticated ? (
                  <UserProfile />
                ) : (
                  <LoginButton size="sm" />
                )
              )}
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden p-2">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col space-y-4 mt-8">
                    <button 
                      onClick={() => {
                        navigateToSection('best-sellers');
                        document.querySelector('[data-state="open"] button')?.click();
                      }}
                      className="text-stone-700 hover:text-orange-600 transition-colors text-left"
                    >
                      Our Hair Kit
                    </button>
                    <button 
                      onClick={() => {
                        navigateToSection('best-sellers', 'hair-fall');
                        document.querySelector('[data-state="open"] button')?.click();
                      }}
                      className="text-stone-700 hover:text-orange-600 transition-colors text-left"
                    >
                      For Hair Fall
                    </button>
                    <button 
                      onClick={() => {
                        navigateToSection('best-sellers', 'frizz');
                        document.querySelector('[data-state="open"] button')?.click();
                      }}
                      className="text-stone-700 hover:text-orange-600 transition-colors text-left"
                    >
                      For Frizz
                    </button>
                    <button 
                      onClick={() => {
                        navigateToSection('best-sellers', 'damage');
                        document.querySelector('[data-state="open"] button')?.click();
                      }}
                      className="text-stone-700 hover:text-orange-600 transition-colors text-left"
                    >
                      For Damage
                    </button>
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
