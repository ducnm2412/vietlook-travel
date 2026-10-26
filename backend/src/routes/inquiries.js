import { Router } from 'express';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const router = Router();
const DATA_FILE = path.resolve('storage/inquiries.json');
const TYPES = ['booking', 'tailor-made', 'car', 'visa', 'contact', 'partner'];

async function load() {
  try {
    return JSON.parse(await readFile(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

// POST /api/inquiries — lưu mọi loại yêu cầu (đặt tour, thiết kế tour, xe, visa, liên hệ)
// TODO: gửi email xác nhận (nodemailer) khi có cấu hình SMTP
router.post('/', async (req, res) => {
  const { type, name, email } = req.body || {};
  if (!TYPES.includes(type)) return res.status(400).json({ message: 'Invalid inquiry type' });
  if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

  const items = await load();
  const item = { id: `VL${Date.now()}`, status: 'new', createdAt: new Date().toISOString(), ...req.body };
  items.push(item);
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2));
  res.status(201).json({ id: item.id, message: 'Received' });
});

router.get('/', async (req, res) => {
  res.json(await load());
});

export default router;
