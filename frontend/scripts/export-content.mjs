// Xuất toàn bộ nội dung (tour, xe, fast track, bài viết, danh mục) từ backend thành JSON tĩnh trong frontend,
// để trang đọc trực tiếp lúc build thay vì chờ gọi API. Chạy lại mỗi khi dữ liệu backend thay đổi:
//   npm run export-content
import { writeFileSync } from 'node:fs';
import { carCities, cars, destinations, fastTrack, posts, themes, tours, vehicles } from '../../backend/src/data/tours.js';

const out = new URL('../src/data/content.json', import.meta.url);
writeFileSync(out, JSON.stringify({ tours: [...tours, ...cars, ...fastTrack], posts, destinations, themes, carCities, vehicles }));
console.log(`Đã ghi ${tours.length} tour, ${cars.length} xe, ${fastTrack.length} fast track, ${posts.length} bài viết`);
