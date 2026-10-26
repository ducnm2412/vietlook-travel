# Vietlook Travel

- `frontend/` — Next.js (App Router, TypeScript, Tailwind) — cổng 3000
- `backend/` — Node.js + Express — cổng 4000

## Chạy dự án

```bash
# Terminal 1
cd backend
cp .env.example .env
npm install
npm run dev

# Terminal 2
cd frontend
npm install
npm run dev
```

Mở http://localhost:3000. API: http://localhost:4000/api/health, /api/tours
