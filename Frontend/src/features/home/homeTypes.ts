// src/features/home/homeTypes.ts

export interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface HomeCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface HomeResponse {
  sliders: SliderItem[];
  banners: Banner[];
  featured: HomeCard[];
}

export interface HomeState {
  loading: boolean;
  error: string | null;
  sliders: SliderItem[];
  banners: Banner[];
  featured: HomeCard[];
}