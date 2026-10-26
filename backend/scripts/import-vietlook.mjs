// Lấy nội dung thật từ vietlooktravel.com (WordPress REST API) -> src/data/vietlook.json
// Chạy: node scripts/import-vietlook.mjs
import { writeFile } from 'node:fs/promises';

const BASE = 'https://vietlooktravel.com/wp-json/wp/v2';

async function getAll(path) {
  const out = [];
  for (let page = 1; ; page++) {
    const sep = path.includes('?') ? '&' : '?';
    const res = await fetch(`${BASE}/${path}${sep}per_page=100&page=${page}`);
    if (!res.ok) break;
    const items = await res.json();
    out.push(...items);
    if (page >= Number(res.headers.get('x-wp-totalpages') || 1)) break;
  }
  return out;
}

const decode = (s = '') =>
  s.replace(/<[^>]*>/g, '').replace(/&#8211;/g, '–').replace(/&#8217;/g, '’').replace(/&#8216;/g, '‘').replace(/&#8220;|&#8221;/g, '"')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#038;/g, '&').replace(/&#\d+;/g, '').replace(/\s+/g, ' ').trim();

const image = (p) => p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

// Thời lượng: tìm "3 days", "2D1N", "half-day", "1 day" trong tiêu đề hoặc nội dung
function duration(title, text) {
  const s = `${title} ${text.slice(0, 400)}`;
  let m = s.match(/(\d+)\s*(?:days?|ngày)/i) || s.match(/(\d+)\s*D\s*\d+\s*N/i);
  if (m) return Number(m[1]);
  return 1;
}

const types = await getAll('tour_types?_fields=id,name,slug,parent,count');
const typeById = Object.fromEntries(types.map((t) => [t.id, t]));
// Chỉ lấy nhóm tiếng Anh: tour-packages, private-car-rental, fast-track, travel-experience
const ROOTS = ['tour-packages', 'private-car-rental', 'fast-track', 'travel-experience'];
const rootOf = (t) => (t.parent ? rootOf(typeById[t.parent]) : t);

const rawTours = await getAll('tour?_embed=wp:featuredmedia&_fields=slug,title,content,excerpt,tour_types,_links,_embedded');
const tours = rawTours
  .map((p) => {
    const ts = p.tour_types.map((id) => typeById[id]).filter(Boolean);
    const roots = [...new Set(ts.map((t) => rootOf(t).slug))].filter((r) => ROOTS.includes(r));
    if (!roots.length) return null;
    const html = p.content.rendered;
    const text = decode(html);
    const title = decode(p.title.rendered);
    const gallery = [...new Set([...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]))];
    const img = image(p) || gallery[0] || null;
    const code = text.match(/Tour Code\s*:?\s*([A-Z]{1,4}\d{1,4})/i)?.[1] || null;
    return {
      slug: p.slug,
      title,
      kind: roots.includes('private-car-rental') ? 'car' : roots.includes('fast-track') ? 'fast-track' : 'tour',
      categories: ts.map((t) => t.slug),
      days: duration(title, text),
      code,
      image: img,
      gallery: [img, ...gallery].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 8),
      summary: decode(p.excerpt?.rendered).slice(0, 220) || text.replace(/^\d{1,2}:\d{2}\s*/, '').slice(0, 220),
      contentHtml: html,
    };
  })
  .filter(Boolean);

const cats = await getAll('categories?_fields=id,name,slug,parent,count');
const catById = Object.fromEntries(cats.map((c) => [c.id, c]));
const rawPosts = await getAll('posts?_embed=wp:featuredmedia&_fields=slug,title,excerpt,content,date,categories,_links,_embedded');
// Bỏ các chuyên mục tiếng Việt vì site dùng tiếng Anh
const VI_CATEGORIES = ['Cẩm nang', 'Tin tức'];
const posts = rawPosts.filter((p) => !VI_CATEGORIES.includes(catById[p.categories[0]]?.name)).map((p) => ({
  slug: p.slug,
  title: decode(p.title.rendered),
  date: p.date,
  category: catById[p.categories[0]]?.name || 'News',
  image: image(p),
  excerpt: decode(p.excerpt.rendered).slice(0, 200),
  contentHtml: p.content.rendered,
}));

const tourTypes = types
  .filter((t) => t.parent && ROOTS.includes(rootOf(t).slug) && t.count > 0)
  .map((t) => ({ slug: t.slug, name: decode(t.name), root: rootOf(t).slug, count: t.count }));

await writeFile(new URL('../src/data/vietlook.json', import.meta.url), JSON.stringify({ tourTypes, tours, posts }, null, 1));
console.log(`tours: ${tours.length}, posts: ${posts.length}, types: ${tourTypes.length}`);
