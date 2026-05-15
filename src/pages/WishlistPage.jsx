import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useContext(AppContext);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-20 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h1
            className="text-4xl md:text-5xl tracking-tight text-[#c8a66d] mb-3"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            Your Wishlist
          </h1>
          <p
            className="text-sm text-[#1b1c1c]/50 tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} saved
          </p>
        </motion.div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-24"
          >
            <Heart size={48} className="mx-auto mb-6 text-[#c8a66d]/40" />
            <h2
              className="text-2xl text-[#1b1c1c]/70 mb-4"
              style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
            >
              Your wishlist is empty
            </h2>
            <p
              className="text-sm text-[#1b1c1c]/40 mb-8 max-w-md mx-auto"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Discover our collections and save the pieces that speak to you.
            </p>
            <Link
              to="/new-arrivals"
              className="inline-block bg-[#c8a66d] text-white px-10 py-3 text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-[#e5c186] transition-all duration-300 active:scale-95"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Explore Collections
            </Link>
          </motion.div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlist.map((product, index) => (
                <motion.div
                  key={product._id || product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border border-[#d1c5b5]/20 group"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product._id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#c8a66d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-5">
                    <p
                      className="text-[10px] tracking-widest text-[#1b1c1c]/50 mb-2 uppercase"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {product.category || "Exclusive Piece"}
                    </p>
                    <Link to={`/product/${product._id}`}>
                      <h3
                        className="text-lg text-[#c8a66d] mb-1 hover:text-[#e5c186] transition-colors truncate"
                        style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                      >
                        {product.name}
                      </h3>
                    </Link>
                    <span
                      className="text-sm text-[#1b1c1c]"
                      style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                    >
                      ₹ {product.price?.toLocaleString()}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] tracking-[0.15em] uppercase font-bold transition-all duration-300 active:scale-95 ${
                          product.stock === 0
                            ? "bg-[#d1c5b5]/30 text-[#1b1c1c]/30 cursor-not-allowed"
                            : "bg-[#c8a66d] text-white hover:bg-[#e5c186]"
                        }`}
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        <ShoppingBag size={14} />
                        {product.stock === 0 ? "Sold Out" : "Add to Cart"}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product._id || product.id)}
                        className="p-2.5 border border-[#d1c5b5]/30 text-[#1b1c1c]/40 hover:text-red-500 hover:border-red-500/30 transition-all duration-300 active:scale-95"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
