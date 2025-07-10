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
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-6 md:grid md:grid-cols-2 md:gap-4 flex overflow-x-auto gap-3 pb-4 lg:pb-0 scrollbar-hide">
        {products.map((product, index) => (
          <div key={product.id} className="flex-shrink-0 lg:flex-shrink min-w-[170px] sm:min-w-[180px] lg:min-w-0">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
