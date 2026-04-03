import { useParams } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/user/ProductCard";
import FilterSortBar from "../components/user/FilterSortBar";

function CollectionPage() {
  const { type } = useParams();
  const { products, addToCart } = useContext(AppContext);

  const [selectedFabric, setSelectedFabric] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products by category, matching the URL param case-insensitively
  const categoryProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category &&
        product.category.toLowerCase() === type.toLowerCase()
    );
  }, [products, type]);

  // Extract unique fabrics from this specific collection category
  const uniqueFabrics = useMemo(() => {
    const fabrics = categoryProducts.map((p) => p.fabric).filter(Boolean);
    return [...new Set(fabrics)];
  }, [categoryProducts]);

  // Apply Search, Filter and Sort
  const displayedProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Search by name or description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Filter by Fabric
    if (selectedFabric !== "All") {
      filtered = filtered.filter((p) => p.fabric === selectedFabric);
    }

    // Sort by Price
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [categoryProducts, selectedFabric, sortOption, searchQuery]);

  return (
    <div className="pt-24 px-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 capitalize text-yellow-500">
        {type} Collection
      </h1>

      {categoryProducts.length > 0 && (
        <FilterSortBar
          fabrics={uniqueFabrics}
          selectedFabric={selectedFabric}
          setSelectedFabric={setSelectedFabric}
          sortOption={sortOption}
          setSortOption={setSortOption}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      {displayedProducts.length === 0 ? (
        <p className="text-gray-500">
          No products match your criteria.
        </p>
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

export default CollectionPage;
