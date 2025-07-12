import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import fs from 'fs';
import path from 'path';

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

  // Protected route example
  app.post("/api/checkout", isAuthenticated, async (req, res) => {
    const userId = (req.user as any)?.claims?.sub;
    // Process checkout for authenticated user
    res.json({ success: true, message: "Checkout processed successfully" });
  });

  // Component API routes for page builder
  app.get("/api/components/:name", (req, res) => {
    try {
      const name = req.params.name;
      const configPath = path.join(process.cwd(), `client/src/configs/${name.toLowerCase().replace('section', '')}.json`);
      const componentPath = path.join(process.cwd(), `client/src/components/builder/${name}.tsx`);

      // Read config file
      let config = {};
      if (fs.existsSync(configPath)) {
        const configData = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(configData);
      }

      // Read component code
      let code = '';
      if (fs.existsSync(componentPath)) {
        code = fs.readFileSync(componentPath, 'utf-8');
      }

      res.json({ config, code });
    } catch (error) {
      console.error('Error reading component:', error);
      res.status(500).json({ error: 'Failed to read component' });
    }
  });

  app.post("/api/components/:name", (req, res) => {
    try {
      const name = req.params.name;
      const { code, config } = req.body;
      
      const configPath = path.join(process.cwd(), `client/src/configs/${name.toLowerCase().replace('section', '')}.json`);
      const componentPath = path.join(process.cwd(), `client/src/components/builder/${name}.tsx`);

      // Ensure directories exist
      const configDir = path.dirname(configPath);
      const componentDir = path.dirname(componentPath);
      
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
      }

      // Write config file
      if (config) {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      }

      // Write component code
      if (code) {
        fs.writeFileSync(componentPath, code);
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error saving component:', error);
      res.status(500).json({ error: 'Failed to save component' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
