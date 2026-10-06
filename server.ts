import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDatabase, saveInquiry, getInquiries } from './server/db.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Test and initialize MySQL connection
  const dbInit = await initDatabase();
  if (dbInit.success) {
    console.log(`✅ MySQL / TiDB Cloud connected successfully! (DB: ${dbInit.currentDb}, Version: ${dbInit.version})`);
  } else {
    console.warn(`⚠️ Database connection warning: ${dbInit.error}`);
  }

  // API Routes
  // 1. Health & Database connection status
  app.get('/api/db/status', async (req, res) => {
    try {
      const status = await initDatabase();
      res.json({
        connected: status.success,
        database: status.currentDb || 'itzfizz',
        version: status.version,
        error: status.error,
        serverTime: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({ connected: false, error: err.message });
    }
  });

  // 2. Submit Contact Form (Saves to MySQL)
  app.post('/api/contact', async (req, res) => {
    try {
      const { fullName, email, subject, message } = req.body;

      if (!fullName || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const result = await saveInquiry({
        fullName: String(fullName).trim(),
        email: String(email).trim(),
        subject: String(subject).trim(),
        message: String(message).trim(),
      });

      console.log(`[DB] Saved contact inquiry #${result.id} from ${fullName} <${email}>`);

      res.status(201).json({
        success: true,
        id: result.id,
        message: 'Inquiry saved successfully to MySQL database!',
      });
    } catch (err: any) {
      console.error('[DB Error] Failed to save inquiry:', err.message);
      res.status(500).json({
        success: false,
        error: 'Failed to record inquiry into database: ' + err.message,
      });
    }
  });

  // 3. Retrieve inquiries (for management/preview)
  app.get('/api/inquiries', async (req, res) => {
    try {
      const rows = await getInquiries(50);
      res.json({ success: true, count: rows.length, inquiries: rows });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite development middlewares or static files in production
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
});
