// Video YouTube cho trang chi tiết tour: slug tour -> ID video (11 ký tự sau "watch?v=" hoặc "youtu.be/").
// Dữ liệu gốc từ vietlooktravel.com chưa có video nào; thêm dòng ở đây là trang tour tự hiện khung video.
// Ví dụ: "ha-long-4-days-3-nights-tour-from-hanoi": "dQw4w9WgXcQ",
export const TOUR_VIDEOS: Record<string, string> = {};

// Lấy ID từ link YouTube dán trong nội dung tour (nếu có)
export function findYouTubeId(html: string) {
  return html.match(/youtu(?:be\.com\/(?:embed\/|watch\?v=)|\.be\/)([\w-]{11})/)?.[1] ?? null;
}
