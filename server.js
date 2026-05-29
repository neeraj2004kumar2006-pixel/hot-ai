import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { initialDummyArticles, initialTechTricks, initialAiTools } from './src/utils/dummyData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Read credentials securely from env (not VITE_)
const ADMIN_ID = process.env.ADMIN_ID || 'admin_hotai';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'HotAI@2026Secure';
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_hot_ai_2026';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Setup upload directory
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\\s+/g, '-')}`)
});
const upload = multer({ storage });

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.hotai_auth_token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Login Route
app.post('/api/login', (req, res) => {
  const { id, password } = req.body;
  if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ id, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('hotai_auth_token', token, {
      httpOnly: true,
      sameSite: 'none',
	  secure: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    return res.json({ success: true, message: 'Logged in' });
  }
  return res.status(401).json({ success: false, error: 'Invalid credentials' });
});

// Logout Route
app.post('/api/logout', (req, res) => {
  res.clearCookie('hotai_auth_token');
  res.json({ success: true, message: 'Logged out' });
});

// Verify Session Route
app.get('/api/verify', verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Image Upload Route (Protected)
app.post('/api/upload', verifyToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

// Setup static file serving for React build
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir, { index: false })); // false so we can intercept /

// Helper functions for SEO Meta Injection
const allContent = [...initialDummyArticles, ...initialTechTricks, ...initialAiTools];

const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
};

// Catch-all route for SPA and Server-Side Meta Injection
app.get(/.*/, (req, res) => {
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('Frontend not built. Run npm run build first.');
  }

  let html = fs.readFileSync(indexPath, 'utf8');

  // Inject dynamic SEO meta tags if routing to an article
  const articleMatch = req.path.match(/^\/article\/(.+)$/);
  if (articleMatch) {
    const slug = articleMatch[1];
    const article = allContent.find(a => (a.slug || generateSlug(a.title || a.name)) === slug);
    if (article) {
      const title = `${article.seoTitle || article.title || article.name} - Hot AI`;
      const desc = article.seoDescription || article.excerpt || article.title || article.name;
      const image = article.featuredImage?.url || 'https://hotai.com/default-og.jpg';
      const url = `https://hotai.com${req.path}`;
      
      const metaTags = `
        <title>${title}</title>
        <meta name="description" content="${desc}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${desc}" />
        <meta name="twitter:image" content="${image}" />
      `;
      // Replace default title with our robust meta tags block
      html = html.replace(/<title>.*?<\/title>/, metaTags);
    }
  }

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Hot AI secure backend running on port ${PORT}`);
});
