import { useParams, Link } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Collection-Specific Configuration
   ───────────────────────────────────────────── */
const COLLECTION_CONFIG = {
  solids: {
    title: "SOLIDS",
    subtitle: "A study of form, texture, and structural purity.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIIxWG2o-cViwcSdh7G6DbQxnze4uKDvpeQWYJnYVW4JwcVp7EHXFlD5D1YQiYTmPZEYtgX-Iw2h8HrwbI4lKugQSRVLtZ7EBaQAtfrs7EFPFFPz7FLBoG5TryLg8XperBnQcUI7fL8ulaT-w-PlsAS9mVl-0LUUsOtbnXBZhOyUQAw6LqNAzCWG1tUmupqObu8JxDhqhyxJOnGbqm1kIweAZFPzlkwVYFD_huOjTKecW9C6E9UoZe2b5MhoUH06mTi31wStucLpw",
    heroAlt: "Avant-garde architectural fashion silhouette in solid black fabric",
    ethos: {
      tagline: "The Philosophy",
      heading:
        "Reducing fashion to its architectural essence: Color. Form. Space.",
      body: "The Solids collection explores the relationship between the human silhouette and rigid geometry. By stripping away pattern and embellishment, we reveal the raw integrity of the garment's construction.",
    },
  },
  festive: {
    title: "FESTIVE",
    titleAccent: "Luminous",
    titleAccentItalic: "Shadows",
    subtitle:
      "A celebration of midnight craftsmanship and solar brilliance. Explore our curated selection of Golden Hour Lehengas and Obsidian Sherwanis.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDutK9AC7aIdsAuR_dp70ZIqA1hhsgLsXfCAj5uG9sAU0ivTTOf0qmA7p31ibKDVEXRPniIr8eneJNk0mC3PMygGKiEwXV7tf4xSv4QjXn6EicHEW_xJ8SQB_xvn9lOG1FBxMZAhx8WBkcz9gJ6VHeFOZM2zhNVebBkiKPgPH7rA7XTrMfDzeGBmxpS9kjCXo76fMn_OakQ50slvPTp0X0Yim1A_6YR6kpCdm9b287SDOnBajxuYl_RhiG5K9dHln5yjWtxdtNinD4",
    heroAlt: "Dramatic fashion portrait in opulent black and gold traditional attire",
    newsletter: {
      heading: "Join the Inner Circle",
      body: "Be the first to witness our private seasonal showcases and bespoke festive launches.",
    },
  },
  embroidered: {
    title: "Embroidered",
    tagline: "The Curated Collection",
    subtitle:
      "An exploration of artisanal craftsmanship and modern silhouettes. Each piece is a testament to the archival techniques of gilded thread-work.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCovJnFG4_kmLst0_LNdemNjPW7zwnDyVtLO6vSrq1D4nboI7UGv0DMkHqnJFl9fesrDGtzm4yeTSvr9yRcCw6qw1SqLLKaZ_wuh8rdNhC4zqfcjAyJzsUdjEvZZr62UpgGQRqlzE-Ll4eQcZR2SSIodMdlyXon_JYrOSjTTK0st4lZJCBTDawV9siiAsGiavnBF1IM5XGN58O-hN1AdajiQwL0CxJtZUu24O5hXH5GN-90md2nQn1gtPEiQfWaWK4PaE54cPl8H4s",
    heroAlt: "Close-up of intricate gold embroidery on deep black silk fabric",
    archiveLabel: "AESTHETIC ARCHIVE / 001",
    catalogTitle: "Seasonal Catalog",
  },
};

/* ─────────────────────────────────────────────
   Animation Variants
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─────────────────────────────────────────────
   CollectionPage Component
   ───────────────────────────────────────────── */
function CollectionPage() {
  const { type } = useParams();
  const { products, addToCart } = useContext(AppContext);

  const [selectedFabric, setSelectedFabric] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [searchQuery, setSearchQuery] = useState("");

  const typeLower = type?.toLowerCase() || "";
  const config = COLLECTION_CONFIG[typeLower] || COLLECTION_CONFIG.solids;

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category &&
        product.category.toLowerCase() === typeLower
    );
  }, [products, typeLower]);

  // Extract unique fabrics
  const uniqueFabrics = useMemo(() => {
    const fabrics = categoryProducts.map((p) => p.fabric).filter(Boolean);
    return [...new Set(fabrics)];
  }, [categoryProducts]);

  // Apply Search, Filter and Sort
  const displayedProducts = useMemo(() => {
    let filtered = [...categoryProducts];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
    if (selectedFabric !== "All") {
      filtered = filtered.filter((p) => p.fabric === selectedFabric);
    }
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [categoryProducts, selectedFabric, sortOption, searchQuery]);

  /* ═══════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════ */
  return (
    <div className="bg-[#0c0a09] text-[#f5f5f4] min-h-screen">
      {/* ─── HERO SECTION ─── */}
      {typeLower === "festive" ? (
        <FestiveHero config={config} />
      ) : typeLower === "embroidered" ? (
        <EmbroideredHero config={config} />
      ) : (
        <SolidsHero config={config} />
      )}

      {/* ─── FILTER BAR ─── */}
      <CollectionFilterBar
        typeLower={typeLower}
        uniqueFabrics={uniqueFabrics}
        selectedFabric={selectedFabric}
        setSelectedFabric={setSelectedFabric}
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* ─── PRODUCT GRID ─── */}
      {typeLower === "embroidered" ? (
        <EmbroideredGrid
          products={displayedProducts}
          addToCart={addToCart}
          config={config}
        />
      ) : typeLower === "solids" ? (
        <SolidsGrid products={displayedProducts} addToCart={addToCart} />
      ) : (
        <FestiveGrid products={displayedProducts} addToCart={addToCart} />
      )}

      {/* ─── BOTTOM SECTION ─── */}
      {typeLower === "solids" && config.ethos && (
        <SolidsEthos ethos={config.ethos} />
      )}
      {typeLower === "festive" && config.newsletter && (
        <FestiveNewsletter newsletter={config.newsletter} />
      )}
      {typeLower === "embroidered" && <EmbroideredCTA />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SECTIONS
   ═══════════════════════════════════════════════════ */

function SolidsHero({ config }) {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center bg-[#0c0a09]">
      <div className="absolute inset-0 opacity-50">
        <img
          alt={config.heroAlt}
          className="w-full h-full object-cover"
          src={config.heroImage}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <h1
          className="text-5xl md:text-8xl tracking-[0.2em] mb-6 font-light text-[#f59e0b]"
          style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
        >
          {config.title}
        </h1>
        <p className="text-[#a8a29e] text-sm md:text-base tracking-[0.4em] uppercase font-light max-w-xl mx-auto leading-relaxed">
          {config.subtitle}
        </p>
        <div className="mt-12 h-px w-24 bg-[#f59e0b] mx-auto"></div>
      </motion.div>
    </section>
  );
}

function FestiveHero({ config }) {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt={config.heroAlt}
        src={config.heroImage}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/20 to-transparent"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24"
      >
        <div className="max-w-4xl">
          <span className="text-[#f59e0b] tracking-[0.4em] text-sm uppercase mb-4 block font-light">
            Festive Collection 2026
          </span>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            {config.titleAccent} <br />
            <span className="text-[#fbbf24] italic">
              {config.titleAccentItalic}
            </span>
          </h1>
          <p className="text-[#a8a29e] text-lg md:text-xl max-w-xl font-light leading-relaxed">
            {config.subtitle}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function EmbroideredHero({ config }) {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden mb-12">
      <img
        alt={config.heroAlt}
        className="w-full h-full object-cover opacity-60"
        src={config.heroImage}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-[#0c0a09]/40"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <span className="text-[#f59e0b] uppercase tracking-[0.4em] text-xs mb-4">
          {config.tagline}
        </span>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-[#f5f5f4] mb-6"
          style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
        >
          {config.title}
        </h1>
        <div className="w-24 h-[1px] bg-[#f59e0b] mb-6"></div>
        <p className="max-w-xl text-[#a8a29e] font-light leading-relaxed text-sm md:text-base">
          {config.subtitle}
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FILTER BAR (Archivist-style)
   ═══════════════════════════════════════════════════ */

function CollectionFilterBar({
  typeLower,
  uniqueFabrics,
  selectedFabric,
  setSelectedFabric,
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <section className="px-6 py-6 border-b border-[#292524] sticky top-16 md:top-20 bg-[#0c0a09]/80 backdrop-blur-md z-40">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Search */}
        <div className="flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-[#44403c] text-white p-3 focus:border-[#f59e0b] outline-none transition-colors tracking-widest text-sm placeholder:text-[#78716c]"
          />
        </div>

        {/* Fabric Filter Tabs */}
        <div className="flex gap-6 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setSelectedFabric("All")}
            className={`pb-1 text-sm tracking-widest uppercase shrink-0 transition-colors ${
              selectedFabric === "All"
                ? "text-[#f59e0b] border-b-2 border-[#f59e0b] font-bold"
                : "text-[#78716c] hover:text-[#fbbf24]"
            }`}
          >
            All Pieces
          </button>
          {uniqueFabrics.map((fabric) => (
            <button
              key={fabric}
              onClick={() => setSelectedFabric(fabric)}
              className={`pb-1 text-sm tracking-widest uppercase shrink-0 transition-colors ${
                selectedFabric === fabric
                  ? "text-[#f59e0b] border-b-2 border-[#f59e0b] font-bold"
                  : "text-[#78716c] hover:text-[#fbbf24]"
              }`}
            >
              {fabric}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-transparent border border-[#44403c] text-[#d6d3d1] text-xs tracking-widest uppercase px-4 py-2 hover:bg-[#1c1917] transition-colors cursor-pointer outline-none focus:border-[#f59e0b]"
          >
            <option value="Default" className="bg-[#0c0a09]">Default</option>
            <option value="Price: Low to High" className="bg-[#0c0a09]">Price: Low to High</option>
            <option value="Price: High to Low" className="bg-[#0c0a09]">Price: High to Low</option>
          </select>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PRODUCT GRIDS
   ═══════════════════════════════════════════════════ */

/* ─── SOLIDS: Asymmetric Architectural Grid ─── */
function SolidsGrid({ products, addToCart }) {
  if (products.length === 0) {
    return (
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <p className="text-[#78716c] text-center text-lg">
          No products match your criteria.
        </p>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerParent}
        className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-8"
      >
        {products.map((product, index) => {
          // Determine grid sizing based on position for architectural variety
          let colSpan, aspectClass;
          if (index === 0) {
            colSpan = "col-span-2 md:col-span-8";
            aspectClass = "aspect-[16/9]";
          } else if (index % 5 === 3 || index % 5 === 4) {
            colSpan = "col-span-2 md:col-span-6";
            aspectClass = "aspect-[4/5]";
          } else {
            colSpan = "col-span-1 md:col-span-4";
            aspectClass = "aspect-square";
          }

          const isHero = index === 0;

          return (
            <motion.div
              key={product._id || product.id}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className={`${colSpan} group cursor-pointer`}
            >
              <Link to={`/product/${product._id}`}>
                <div
                  className={`relative overflow-hidden ${aspectClass} bg-[#1c1917] border border-[#292524]`}
                >
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                    src={product.image}
                  />
                  {/* Limited badge for low stock */}
                  {product.stock < 10 && (
                    <div className="absolute top-0 right-0 p-3 md:p-6">
                      <span className="text-[#fbbf24] text-[8px] md:text-xs tracking-[0.3em] font-bold uppercase px-2 py-0.5 md:px-3 md:py-1 border border-[#fbbf24]/30 bg-[#0c0a09]/40 backdrop-blur-sm">
                        Only {product.stock} left
                      </span>
                    </div>
                  )}
                  {/* Product overlay */}
                  <div
                    className={`absolute bottom-0 left-0 ${
                      isHero ? "p-4 md:p-8 w-full bg-gradient-to-t from-[#0c0a09] to-transparent" : "p-4"
                    }`}
                  >
                    <h3
                      className={`${
                        isHero
                          ? "text-[#fbbf24] text-lg md:text-2xl"
                          : "text-white group-hover:text-[#fbbf24] transition-colors text-sm md:text-lg"
                      } tracking-widest uppercase mb-1`}
                      style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-[#78716c] text-[10px] md:text-xs tracking-widest uppercase mt-1">
                      ₹{product.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ─── FESTIVE: Elegant Card Grid ─── */
function FestiveGrid({ products, addToCart }) {
  if (products.length === 0) {
    return (
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <p className="text-[#78716c] text-center text-lg">
          No products match your criteria.
        </p>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerParent}
        className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16"
      >
        {products.map((product, index) => (
          <motion.div
            key={product._id || product.id}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="group cursor-pointer"
          >
            <Link to={`/product/${product._id}`}>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1c1917] mb-4">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={product.name}
                  src={product.image}
                />
                {/* Limited / Low Stock badge */}
                {product.stock < 10 && (
                  <div className="absolute top-2 left-2 bg-[#f59e0b] text-[#0c0a09] text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:px-3 md:py-1 uppercase tracking-widest">
                    Only {product.stock} left
                  </div>
                )}
                {/* Wishlist / Hover Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="absolute bottom-3 right-3 w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </button>
              </div>
            </Link>
            <Link to={`/product/${product._id}`}>
              <h3
                className="text-lg md:text-2xl text-[#f59e0b] mb-0.5 md:mb-1 truncate"
                style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
              >
                {product.name}
              </h3>
            </Link>
            <p className="text-[#78716c] text-[9px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] mb-2 md:mb-3 truncate">
              {product.fabric || product.category || "Festive Collection"}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm md:text-lg font-light tracking-tighter">
                ₹{product.price?.toLocaleString()}
              </span>
              <Link
                to={`/product/${product._id}`}
                className="text-[#f59e0b] text-[9px] md:text-xs font-bold uppercase tracking-widest border-b border-[#f59e0b]/0 hover:border-[#f59e0b] transition-all pb-0.5 md:pb-1"
              >
                Details
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── EMBROIDERED: Archive-Style Grid ─── */
function EmbroideredGrid({ products, addToCart, config }) {
  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-[#78716c] text-center text-lg">
          No products match your criteria.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6">
      {/* Archive header */}
      <div className="flex justify-between items-end mb-12 border-b border-[#292524] pb-4">
        <div>
          <h2 className="text-[#78716c] text-xs uppercase tracking-widest">
            {config.archiveLabel}
          </h2>
          <p
            className="text-[#f59e0b] text-2xl"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            {config.catalogTitle}
          </p>
        </div>
        <div className="text-[#78716c] text-xs tracking-tighter uppercase">
          {products.length} Items Displayed
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerParent}
        className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10"
      >
        {products.map((product, index) => (
          <motion.div
            key={product._id || product.id}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="group cursor-pointer"
          >
            <Link to={`/product/${product._id}`}>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1c1917] mb-4">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-700"
                  src={product.image}
                />
                {product.stock < 10 && (
                  <div className="absolute bottom-2 left-2 bg-[#f59e0b] text-[#0c0a09] px-2 py-0.5 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                    Only {product.stock} left
                  </div>
                )}
              </div>
            </Link>
            <Link to={`/product/${product._id}`}>
              <h3
                className="text-lg md:text-xl text-[#f5f5f4] group-hover:text-[#fbbf24] transition-colors truncate"
                style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
              >
                {product.name}
              </h3>
            </Link>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-1">
              <span className="text-[#78716c] text-[10px] md:text-xs uppercase tracking-wider">
                Archive No. {String(index + 1).padStart(3, "0")}
              </span>
              <span className="text-[#f59e0b] font-medium text-sm md:text-base">
                ₹{product.price?.toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   BOTTOM SECTIONS
   ═══════════════════════════════════════════════════ */

function SolidsEthos({ ethos }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerParent}
      className="py-32 px-6 border-t border-[#1c1917]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-[#f59e0b] text-xs tracking-[0.5em] uppercase font-bold mb-8 block"
        >
          {ethos.tagline}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-white text-3xl md:text-5xl leading-tight mb-8"
          style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
        >
          {ethos.heading}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-[#78716c] font-light leading-relaxed tracking-wide"
        >
          {ethos.body}
        </motion.p>
      </div>
    </motion.section>
  );
}

function FestiveNewsletter({ newsletter }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerParent}
      className="py-24 px-6 border-t border-[#1c1917]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-4xl text-white mb-6"
          style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
        >
          {newsletter.heading}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-[#a8a29e] mb-10 font-light"
        >
          {newsletter.body}
        </motion.p>
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            className="flex-1 bg-transparent border-b border-[#44403c] text-white p-4 focus:border-[#f59e0b] outline-none transition-colors tracking-widest text-sm"
            placeholder="YOUR EMAIL ADDRESS"
            type="email"
          />
          <button className="bg-[#f59e0b] text-[#0c0a09] px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#fbbf24] transition-colors active:scale-95">
            Subscribe
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function EmbroideredCTA() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerParent}
      className="max-w-7xl mx-auto px-6 mt-20 text-center py-12 border-t border-[#292524]"
    >
      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-[#78716c] uppercase tracking-[0.2em] text-xs mb-6"
      >
        Discover more from the studio
      </motion.p>
      <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
        <Link
          to="/new-arrivals"
          className="inline-block bg-[#f59e0b] text-[#0c0a09] px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#fbbf24] transition-all active:scale-95"
        >
          View Full Archive
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default CollectionPage;
