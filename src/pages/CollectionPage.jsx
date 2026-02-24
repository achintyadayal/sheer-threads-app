import { useParams } from "react-router-dom";
import { initialProducts } from "../Data/mockData";
import ProductCard from "../components/user/ProductCard";

function CollectionPage() {
  const { type } = useParams();

  const filtered = initialProducts.filter(product =>
    product.category.toLowerCase().includes(type.toLowerCase())
  );

  return (
    <div className="pt-24 px-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 capitalize text-yellow-500">
        {type} Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;
