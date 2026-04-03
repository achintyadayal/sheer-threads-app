import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../api/productService";

export const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const prodId = product._id || product.id;
      const existingItem = prev.find((item) => (item._id || item.id) === prodId);
      if (existingItem) {
        return prev.map((item) =>
          (item._id || item.id) === prodId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent less than 1 quantity
    setCart((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        filteredProducts: products,
        loading,
        cart,
        showCart,
        setShowCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
