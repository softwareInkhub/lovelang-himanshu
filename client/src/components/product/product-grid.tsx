import ProductCard from "./product-card";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <div className="space-y-8">
      {title && (
        <h2 className="text-3xl font-bold text-center">{title}</h2>
      )}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
