export interface Spice {
  id: number;
  name: string;
  price?: string;
  color?: string;
  heat?: number;
}

export interface Blend {
  id: number;
  name: string;
  description: string;
  spices: number[];
  blends: number[];
}

export interface GlobalState {
  spices: Spice[];
  blends: Blend[];
  loading: boolean;
}

export interface NewBlend {
  name: string;
  description: string;
  spices: number[];
  blends: number[];
}