// Logo dạng huy hiệu tròn: biểu tượng gốc (giữ nguyên màu) ở giữa, vòng trắng có chữ chạy quanh
// theo đúng màu wordmark của logo (VIETLOOK xanh, TRAVEL đỏ). Kích thước do className quyết định.
const BLUE = "#1680c0";
const RED = "#ed1f28";

// plain: bỏ vòng chữ (dùng cho logo in chìm mờ – chữ quá nhạt sẽ bị Lighthouse báo thiếu tương phản)
export default function LogoBadge({ className = "", alt = "Vietlook Travel", plain = false }: { className?: string; alt?: string; plain?: boolean }) {
  const word = (
    <>
      <tspan fill={BLUE}>VIETLOOK</tspan> <tspan fill={RED}>TRAVEL</tspan> <tspan fill={BLUE}>•</tspan>{" "}
    </>
  );
  return (
    <span className={`relative block aspect-square rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          {/* Đường tròn cho chữ, bắt đầu từ bên trái để chữ đọc theo chiều kim đồng hồ */}
          <path id="logo-badge-ring" d="M 100,100 m -79,0 a 79,79 0 1,1 158,0 a 79,79 0 1,1 -158,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke={BLUE} strokeWidth="3" />
        <circle cx="100" cy="100" r="66" fill="none" stroke={RED} strokeWidth="1.5" />
        {/* Chỉ vòng chữ xoay (CSS .logo-ring-spin); biểu tượng và viền đứng yên */}
        {!plain && (
        <g className="logo-ring-spin">
          <text fontSize="17" fontWeight="800" letterSpacing="1.5" fontFamily="var(--font-poppins), system-ui, sans-serif">
            <textPath href="#logo-badge-ring" textLength="490" lengthAdjust="spacingAndGlyphs">
              {word}
              {word}
            </textPath>
          </text>
        </g>
        )}
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-mark.webp" alt={alt} width={210} height={210} fetchPriority="high" decoding="async" className="absolute left-1/2 top-1/2 w-[63%] -translate-x-1/2 -translate-y-1/2" />
    </span>
  );
}
