import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Admin routes
  app.get('/api/admin/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      // Check if user is admin
      if (user?.role !== 'admin' && user?.role !== 'super_admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      // Mock admin stats for now
      const stats = {
        totalUsers: 1248,
        totalOrders: 3567,
        totalProducts: 45,
        totalRevenue: 156790,
        monthlyGrowth: 12.5,
        pendingOrders: 23,
        recentOrders: [
          { id: "ORD-001", customer: "Sarah Johnson", amount: 1240, status: "Processing", date: "2025-01-10" },
          { id: "ORD-002", customer: "Mike Chen", amount: 890, status: "Shipped", date: "2025-01-10" },
          { id: "ORD-003", customer: "Emily Davis", amount: 1560, status: "Delivered", date: "2025-01-09" },
          { id: "ORD-004", customer: "John Smith", amount: 740, status: "Pending", date: "2025-01-09" }
        ],
        topProducts: [
          { name: "Mango + Hyaluronic Shampoo", sales: 234, revenue: 127530 },
          { name: "Peach + Biotin Hair Mask", sales: 187, revenue: 129930 },
          { name: "Avocado + Ceramide Combo", sales: 156, revenue: 218400 },
          { name: "Mango Hair Mask", sales: 89, revenue: 61855 }
        ]
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  // Protected route example
  app.post("/api/checkout", isAuthenticated, async (req, res) => {
    const userId = (req.user as any)?.claims?.sub;
    // Process checkout for authenticated user
    res.json({ success: true, message: "Checkout processed successfully" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
