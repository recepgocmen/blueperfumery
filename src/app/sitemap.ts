import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";
import { SITE_URL } from "@/lib/catalog";

const STATIC_ROUTES = [
  "",
  "/satin-al",
  "/kadin-parfum",
  "/erkek-parfum",
  "/nis-parfum",
  "/parfumunu-bul",
  "/hakkimizda",
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));

  try {
    const { data } = await getProducts({ status: "active", limit: 100 });
    return [
      ...staticEntries,
      ...data.map((product) => ({
        url: `${SITE_URL}/parfum/${product.id}`,
        lastModified: product.updatedAt,
      })),
    ];
  } catch {
    return staticEntries;
  }
};

export default sitemap;
