import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/user/ProductCard";
import { initialProducts } from "../Data/mockData";



function NewArrivals() {

  // Get latest 6 products (you can change number)
const latestProducts = initialProducts.slice(-6).reverse();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">
        New Arrivals
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
