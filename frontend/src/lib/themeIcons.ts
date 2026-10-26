import { faFlag, faLandmark, faShip, faSuitcaseRolling, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Icon Font Awesome cho từng chủ đề tour (theo slug danh mục trên vietlooktravel.com)
const THEME_ICONS: Record<string, IconDefinition> = {
  "cruise-tour": faShip,
  "travel-experience": faLandmark,
  "vietnam-tours": faFlag,
};

export const themeIcon = (slug: string) => THEME_ICONS[slug] ?? faSuitcaseRolling;
