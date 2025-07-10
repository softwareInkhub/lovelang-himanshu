import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Home } from "lucide-react";

export default function ThankYou() {
  const orderId = `LL${Date.now()}`;
  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-20"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold mb-6"
        >
          Thank You for Your Order!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-stone-600 mb-8"
        >
          Your order has been successfully placed and we'll send you a confirmation email shortly.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Order Details</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-semibold">#{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold">{deliveryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-semibold text-green-600">Confirmed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button className="bg-primary-600 hover:bg-primary-700">
            <Package className="w-5 h-5 mr-2" />
            Track Your Order
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
