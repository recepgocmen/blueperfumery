export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  gender: "male" | "female" | "unisex";
  notes: string[];
  description: string;
  ageRange: {
    min: number;
    max: number;
  };
  characteristics: string[];
}
