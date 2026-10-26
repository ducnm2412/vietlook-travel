import { Router } from 'express';
import toursRouter from './tours.js';
import inquiriesRouter from './inquiries.js';
import { carCities, destinations, posts, themes, vehicles } from '../data/tours.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

router.use('/tours', toursRouter);
router.use('/inquiries', inquiriesRouter);
router.get('/destinations', (req, res) => res.json(destinations));
router.get('/themes', (req, res) => res.json(themes));
router.get('/car-cities', (req, res) => res.json(carCities));
router.get('/vehicles', (req, res) => res.json(vehicles));

// GET /api/posts?category=&limit=&page=
router.get('/posts', (req, res) => {
  const { category, type, limit = 12, page = 1 } = req.query;
  let list = category ? posts.filter((p) => p.category === category) : posts;
  if (type) list = list.filter((p) => p.type === type);
  const start = (Number(page) - 1) * Number(limit);
  res.json({
    total: list.length,
    categories: [...new Set(posts.map((p) => p.category))],
    items: list.slice(start, start + Number(limit)).map(({ contentHtml, contentHtmlZh, ...p }) => p),
  });
});

router.get('/posts/:slug', (req, res) => {
  const post = posts.find((p) => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

export default router;
