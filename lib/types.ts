export type Niche =
  | 'Health'
  | 'Beauty'
  | 'Skincare'
  | 'Pet'
  | 'Fitness'
  | 'Wellness'
  | 'Lifestyle';

export interface ProductLink {
  productName: string;
  url: string;
  /** Override commission for this specific product (otherwise inherits brand commissionRate) */
  commission?: number;
  /** Optional product thumbnail */
  image?: string;
}

export interface Brand {
  id: string;
  name: string;
  /** Path to logo in /public, or external URL */
  logo?: string;
  /** Fallback colored tile when no logo image exists */
  logoTile?: { bg: string; fg: string; initials: string };
  niche: Niche;
  /** Default commission percentage for this brand */
  commissionRate: number;
  /** Banner image / gradient for the slideshow when this brand is featured */
  bannerImage?: string;
  bannerGradient?: string;
  /** Marketing tagline shown in slideshow */
  tagline?: string;
  /** Whether this brand appears in the priority banner slideshow */
  priority?: boolean;
  /** Order in the priority banner — lower = earlier */
  priorityOrder?: number;
  /** Trending / fire badge */
  trending?: boolean;
  /** Higher commission badge */
  highCommission?: boolean;
  /** All product affiliate links for this brand */
  links: ProductLink[];
}

export type FilterCategory =
  | 'All Brands'
  | 'Health'
  | 'Beauty'
  | 'Skincare'
  | 'Pet'
  | 'Trending'
  | 'Higher Commission';
