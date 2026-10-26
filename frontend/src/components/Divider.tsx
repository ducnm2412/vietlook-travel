// Đường chia giữa các section. `from` = màu section phía trên, `to` = màu section phía dưới.
// `overlay` dùng bên trong section có ảnh nền: đặt tuyệt đối ở mép trên (top) hoặc mép dưới (bottom).
type Shape = "curve" | "tilt" | "mountains" | "waves";

const PATHS: Record<Shape, string> = {
  curve: "M0 0 C360 90 1080 90 1440 0 V100 H0 Z",
  tilt: "M0 100 L1440 15 V100 Z",
  // Đồi thoai thoải, đường cong mềm
  mountains: "M0 70 C180 30 320 30 480 62 S780 98 960 60 1260 22 1440 58 V100 H0 Z",
  waves: "M0 60 C120 20 240 20 360 60 S600 100 720 60 960 20 1080 60 1320 100 1440 60 V100 H0 Z",
};

export default function Divider({
  shape,
  from = "transparent",
  to,
  overlay,
  flip = false,
}: {
  shape: Shape;
  from?: string;
  to: string;
  overlay?: "top" | "bottom";
  flip?: boolean;
}) {
  const svg = (
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={`block h-full w-full ${flip ? "-scale-x-100" : ""}`} aria-hidden>
      {shape === "waves" && <path d={PATHS.waves} fill={to} opacity={0.4} transform="translate(-180 -14)" />}
      {shape === "mountains" && <path d="M0 52 C220 12 420 18 620 50 S1000 80 1180 38 1380 20 1440 30 V100 H0 Z" fill={to} opacity={0.45} />}
      <path d={PATHS[shape]} fill={to} />
    </svg>
  );

  if (overlay)
    return (
      <div className={`pointer-events-none absolute inset-x-0 h-12 md:h-20 ${overlay === "top" ? "-top-px rotate-180" : "-bottom-px"}`}>{svg}</div>
    );

  return <div className="h-12 md:h-20" style={{ background: from }}>{svg}</div>;
}
