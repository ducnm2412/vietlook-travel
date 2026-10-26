import { Router } from 'express';
import { brief, cars, fastTrack, tours } from '../data/tours.js';

const router = Router();
const all = [...tours, ...cars, ...fastTrack];

// GET /api/tours?kind=tour|car|fast-track&region=&destination=&theme=&category=&minDays=&maxDays=&q=&limit=
router.get('/', (req, res) => {
  const { kind = 'tour', region, destination, theme, category, minDays, maxDays, q, limit } = req.query;
  let result = all.filter((t) => t.kind === kind);
  if (region) result = result.filter((t) => t.region === region);
  if (destination) result = result.filter((t) => t.destinations.includes(destination));
  if (theme) result = result.filter((t) => t.theme === theme);
  if (category) result = result.filter((t) => t.categories.includes(category));
  if (minDays) result = result.filter((t) => t.days >= Number(minDays));
  if (maxDays) result = result.filter((t) => t.days <= Number(maxDays));
  if (q) {
    const s = String(q).toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(s) || t.summary.toLowerCase().includes(s));
  }
  if (limit) result = result.slice(0, Number(limit));
  res.json(result.map(brief));
});

router.get('/:slug', (req, res) => {
  const tour = all.find((t) => t.slug === req.params.slug);
  if (!tour) return res.status(404).json({ message: 'Tour not found' });
  res.json(tour);
});

export default router;
