import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingBag, Menu, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { useAuth } from "@/hooks/useAuth";
import SearchDialog from "@/components/ui/search-dialog";
import WishlistDrawer from "@/components/wishlist/wishlist-drawer";
import LoginButton from "@/components/auth/login-button";
import UserProfile from "@/components/auth/user-profile";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { items, toggleDrawer } = useCartStore();
  const { favorites } = useFavoritesStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;
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
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-stone-100">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl lg:text-2xl font-bold text-stone-900 hover:text-orange-600 transition-colors">
              lovelang.
            </Link>
            
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigateToSection('best-sellers')}
                className="text-sm lg:text-base text-stone-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 font-medium px-3 lg:px-4"
              >
                Our Hair Kit
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/hair-concerns/hair-fall')}
                className="text-sm lg:text-base text-stone-700 hover:text-orange-600 hover:bg-red-50 transition-all duration-200 font-medium px-3 lg:px-4"
              >
                For Hair Fall
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/hair-concerns/frizz')}
                className="text-sm lg:text-base text-stone-700 hover:text-orange-600 hover:bg-yellow-50 transition-all duration-200 font-medium px-3 lg:px-4"
              >
                For Frizz
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/hair-concerns/damage')}
                className="text-sm lg:text-base text-stone-700 hover:text-orange-600 hover:bg-green-50 transition-all duration-200 font-medium px-3 lg:px-4"
              >
                For Damage
              </Button>
            </nav>
            
            <div className="flex items-center space-x-1 lg:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-stone-100 transition-colors"
                title="Search products"
              >
                <Search className="w-4 h-4 lg:w-5 lg:h-5 text-stone-600" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDrawer}
                className="relative p-2 hover:bg-orange-50 transition-colors"
                title="Shopping cart"
              >
                <ShoppingBag className="w-4 h-4 lg:w-5 lg:h-5 text-stone-600" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {/* Wishlist in header */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 hover:bg-pink-50 transition-colors md:flex hidden"
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors ${
                  favoritesCount > 0 ? 'text-pink-500 fill-pink-500' : 'text-stone-600'
                }`} />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-pink-500 text-white text-xs">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>

              {/* Admin Link */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('/admin-panel', '_blank')}
                className="hidden md:flex text-sm text-stone-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 font-medium px-3"
              >
                Admin
              </Button>

              {/* Auth Section */}
              {!isLoading && (
                isAuthenticated ? (
                  <UserProfile />
                ) : (
                  <LoginButton size="sm" className="ml-2" />
                )
              )}
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden p-2">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80">
                  <div className="flex flex-col h-full">
                    <div className="py-6">
                      <h2 className="text-lg font-bold text-stone-900 mb-6">Menu</h2>
                      <nav className="space-y-2">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigateToSection('best-sellers');
                            document.querySelector('[data-state="open"] button')?.click();
                          }}
                          className="w-full justify-start text-stone-700 hover:text-orange-600 hover:bg-orange-50 transition-all"
                        >
                          Our Hair Kit
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigate('/hair-concerns/hair-fall');
                            document.querySelector('[data-state="open"] button')?.click();
                          }}
                          className="w-full justify-start text-stone-700 hover:text-orange-600 hover:bg-red-50 transition-all"
                        >
                          For Hair Fall
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigate('/hair-concerns/frizz');
                            document.querySelector('[data-state="open"] button')?.click();
                          }}
                          className="w-full justify-start text-stone-700 hover:text-orange-600 hover:bg-yellow-50 transition-all"
                        >
                          For Frizz
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigate('/hair-concerns/damage');
                            document.querySelector('[data-state="open"] button')?.click();
                          }}
                          className="w-full justify-start text-stone-700 hover:text-orange-600 hover:bg-green-50 transition-all"
                        >
                          For Damage
                        </Button>
                        
                        {/* Admin Link in Mobile Menu */}
                        <Button
                          variant="ghost"
                          onClick={() => {
                            window.open('/admin-panel', '_blank');
                            document.querySelector('[data-state="open"] button')?.click();
                          }}
                          className="w-full justify-start text-stone-700 hover:text-orange-600 hover:bg-orange-50 transition-all"
                        >
                          Admin Panel
                        </Button>
                      </nav>
                    </div>
                    
                    <div className="mt-auto pb-6 space-y-3">
                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setIsWishlistOpen(true);
                          document.querySelector('[data-state="open"] button')?.click();
                        }}
                        className="w-full justify-start p-4 bg-pink-50 hover:bg-pink-100 transition-all rounded-lg border"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Heart className="w-5 h-5 text-pink-500" />
                          <span className="text-sm font-medium text-stone-700">Wishlist</span>
                          {favoritesCount > 0 && (
                            <Badge className="bg-pink-500 text-white ml-auto">{favoritesCount}</Badge>
                          )}
                        </div>
                      </Button>

                      {/* Cart Button */}
                      <Button
                        variant="ghost"
                        onClick={() => {
                          toggleDrawer();
                          document.querySelector('[data-state="open"] button')?.click();
                        }}
                        className="w-full justify-start p-4 bg-orange-50 hover:bg-orange-100 transition-all rounded-lg border"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <ShoppingBag className="w-5 h-5 text-orange-500" />
                          <span className="text-sm font-medium text-stone-700">Cart</span>
                          {itemCount > 0 && (
                            <Badge className="bg-orange-500 text-white ml-auto">{itemCount}</Badge>
                          )}
                        </div>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}
