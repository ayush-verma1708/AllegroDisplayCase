import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// (async () => {
//   const server = await registerRoutes(app);

//   app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
//     const status = err.status || err.statusCode || 500;
//     const message = err.message || "Internal Server Error";

//     res.status(status).json({ message });
//     throw err;
//   });

//   // Add this middleware before serving static files
//   app.use((req, res, next) => {
//     if (req.url.endsWith('.js')) {
//       res.type('application/javascript');
//     }
//     next();
//   });

//   // Then your existing static file serving
//   app.use(express.static('dist'));

//   // importantly only setup vite in development and after
//   // setting up all the other routes so the catch-all route
//   // doesn't interfere with the other routes
//   if (app.get("env") === "development") {
//     await setupVite(app, server);
//   } else {
//     serveStatic(app);
//   }

//   // ALWAYS serve the app on port 5000
//   // this serves both the API and the client.
//   // It is the only port that is not firewalled.
//   server.listen(5000, '127.0.0.1', () => {
//     console.log('Server running on http://localhost:5000');
//   });
// })();

async function createServer() {
  const server = await registerRoutes(app);

  // Error handler (keep this)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Static files middleware (keep this)
  app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
      res.type('application/javascript');
    }
    next();
  });

  app.use(express.static('dist'));

  // Vite setup (keep this)
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  return server;
}

// Development: Run server directly
if (process.env.NODE_ENV !== 'production') {
  createServer().then(server => {
    const PORT = process.env.PORT || 5000; // Fallback to 5000 locally
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}

// Production: Export for Vercel
export default createServer();