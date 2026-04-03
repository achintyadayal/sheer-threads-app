import { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/user/ProductCard";
import FilterSortBar from "../components/user/FilterSortBar";

function NewArrivals() {
  const { products, addToCart } = useContext(AppContext);

  const [selectedFabric, setSelectedFabric] = useState("All");
  const [sortOption, setSortOption] = useState("Default");

  // Get base latest 6 products early, so we only filter/sort the 6 latest items.
  // Alternatively, we can filter/sort ALL and then take 6, but depending on requirements,
  // New Arrivals usually implies the *newest 6* filtered/sorted among themselves.
  const latestProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [products]);

  // Extract unique fabrics from these latest products, or from all products 
  // if you want the dropdown to show all possible fabrics
  const uniqueFabrics = useMemo(() => {
    const fabrics = products.map((p) => p.fabric).filter(Boolean);
    return [...new Set(fabrics)];
  }, [products]);

  // Apply Filter and Sort on the latest 6
  const displayedProducts = useMemo(() => {
    let filtered = [...latestProducts];

    // 1. Filter by Fabric
    if (selectedFabric !== "All") {
      filtered = filtered.filter((p) => p.fabric === selectedFabric);
    }

    // 2. Sort by Price
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [latestProducts, selectedFabric, sortOption]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">
        New Arrivals
      </h1>

      <FilterSortBar
        fabrics={uniqueFabrics}
        selectedFabric={selectedFabric}
        setSelectedFabric={setSelectedFabric}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {displayedProducts.length === 0 ? (
        <p className="text-neutral-500">No new arrivals match your criteria.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NewArrivals;
