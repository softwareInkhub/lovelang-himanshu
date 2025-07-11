import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import ProductDetail from "@/pages/product-detail";
import Collection from "@/pages/collection";
import HairConcern from "@/pages/hair-concern";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import ThankYou from "@/pages/thank-you";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartDrawer from "@/components/cart/cart-drawer";
import FloatingActions from "@/components/ui/floating-actions";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/products/:slug" component={ProductDetail} />
            <Route path="/collections/:collection" component={Collection} />
            <Route path="/hair-concerns/:concern" component={HairConcern} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/thank-you" component={ThankYou} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer />
      <FloatingActions />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
