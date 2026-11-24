import type { Product } from "@/lib/api";
import { formatPrice, hasCampaign } from "@/lib/catalog";

type Props = {
  product: Pick<Product, "price" | "originalPrice">;
  className?: string;
};

const Price = ({ product, className }: Props) => (
  <span className={`tabular-nums ${className ?? ""}`}>
    {hasCampaign(product) && (
      <>
        <span className="sr-only">Eski fiyat </span>
        <s className="price-was mr-[0.5em] text-[0.75em]">
          {formatPrice(product.originalPrice)}
        </s>
        <span className="sr-only">Kampanya fiyatı </span>
      </>
    )}
    {formatPrice(product.price)}
  </span>
);

export default Price;
