/**
 * API Client for Blue Perfumery Backend
 * Server-side safe API calls using Next.js fetch with caching
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://blueperfumery-backend.vercel.app/api";

// API Response types matching backend
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Product type matching backend
export interface Product {
  _id?: string;
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  ml: number;
  gender: "male" | "female" | "unisex";
  category:
    | "woman"
    | "man"
    | "unisex"
    | "niches"
    | "urban"
    | "classic"
    | "luxury"
    | "premium"
    | "exclusive"
    | "artisanal";
  status: "active" | "inactive" | "discontinued";
  stock: number;
  sku: string;
  image?: string;
  notes: string[];
  characteristics: string[];
  ageRange: {
    min: number;
    max: number;
  };
  shopierLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetch all products with filters
 * Server Component friendly with Next.js caching
 */
export async function getProducts(params?: {
  gender?: string;
  category?: string;
  brand?: string;
  status?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<PaginatedResponse<Product>> {
  try {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const url = `${API_BASE_URL}/products${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Fetch single product by ID
 */
export async function getProductById(id: string): Promise<Product> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const response: ApiResponse<Product> = await res.json();

    if (!response.success || !response.data) {
      throw new Error(response.error || "Product not found");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/**
 * Fetch products by gender (for category pages)
 */
export async function getProductsByGender(
  gender: "male" | "female" | "unisex",
  limit: number = 100
): Promise<Product[]> {
  try {
    const response = await getProducts({
      gender,
      status: "active",
      limit,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching ${gender} products:`, error);
    return [];
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(
  category: string,
  limit: number = 100
): Promise<Product[]> {
  try {
    const response = await getProducts({
      category,
      status: "active",
      limit,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    return [];
  }
}

/**
 * Search products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await getProducts({
      search: query,
      status: "active",
      limit: 50,
    });

    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

/**
 * Get all brands
 */
export async function getBrands(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/brands`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.status}`);
    }

    const response: ApiResponse<string[]> = await res.json();
    return response.data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const response: ApiResponse<string[]> = await res.json();
    return response.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

