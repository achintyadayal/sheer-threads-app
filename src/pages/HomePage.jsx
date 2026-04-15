import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
  const {
    cart,
    showCart,
    setShowCart,
    filteredProducts,
    addToCart,
    updateCartQuantity,
    removeFromCart
  } = useContext(AppContext);

  // Take first 8 products for carousel
  const carouselProducts = filteredProducts.slice(0, 8);

  return (
    <div className="bg-[#1A1A1A] text-[#E5E2E1] min-h-screen pt-20">

      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full h-[90vh] overflow-hidden bg-black flex items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 opacity-60">
          <video
            src="/Sheer_Threads_products.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(40%)" }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <h1
            className="text-[clamp(2.5rem,8vw,5rem)] leading-none text-white tracking-tighter mb-8 max-w-4xl mx-auto"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            A SYMPHONY OF{" "}
            <span className="italic text-[#FFD700]">SHADOW</span> & SILK
          </h1>

          <Link
            to="/new-arrivals"
            className="inline-block bg-[#FFD700] text-[#1A1A1A] px-12 py-4 text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-[#FFE16D] transition-all duration-400 active:scale-95"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            SHOP NOW
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#FFD700]/50 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* LATEST ARRIVALS - CONTINUOUS CAROUSEL */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#161616] py-24 md:py-32 overflow-hidden">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="px-6 md:px-8 mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-baseline"
        >
          <h2
            className="text-4xl md:text-5xl tracking-tight text-[#FFD700]"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            Latest Arrivals
          </h2>
          <Link
            to="/new-arrivals"
            className="text-[11px] tracking-[0.2em] text-[#E5E2E1]/60 mt-4 md:mt-0 uppercase hover:text-[#FFD700] transition-colors duration-300"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            VIEW ALL →
          </Link>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div className="animate-carousel">
            {/* Set 1 */}
            <div className="flex gap-4 px-2">
              {carouselProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={`set1-${product._id}`}
                  className="w-[260px] md:w-[300px] bg-[#131313] flex-shrink-0 group cursor-pointer border border-[#474747]/10 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(70%)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter = "grayscale(0%)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter = "grayscale(70%)")
                      }
                    />
                    {/* Gold Hover Overlay */}
                    <div className="absolute inset-0 bg-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                    {/* Low Stock Badge */}
                    {product.stock < 10 && (
                      <div className="absolute top-3 left-3 bg-[#FFD700] text-[#1A1A1A] px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
                        Only {product.stock} left
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 md:p-6">
                    <p
                      className="text-[10px] tracking-widest text-[#E5E2E1]/50 mb-2 uppercase"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {product.category || "Exclusive Piece"}
                    </p>
                    <div className="flex justify-between items-center">
                      <h3
                        className="text-base md:text-lg text-[#FFD700] truncate mr-2"
                        style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                      >
                        {product.name}
                      </h3>
                      <span
                        className="text-sm text-[#E5E2E1] whitespace-nowrap"
                        style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                      >
                        ₹ {product.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Set 2 - Duplicate for seamless loop */}
            <div className="flex gap-4 px-2">
              {carouselProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={`set2-${product._id}`}
                  className="w-[260px] md:w-[300px] bg-[#131313] flex-shrink-0 group cursor-pointer border border-[#474747]/10 transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(70%)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter = "grayscale(0%)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter = "grayscale(70%)")
                      }
                    />
                    <div className="absolute inset-0 bg-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    {product.stock < 10 && (
                      <div className="absolute top-3 left-3 bg-[#FFD700] text-[#1A1A1A] px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
                        Only {product.stock} left
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6">
                    <p
                      className="text-[10px] tracking-widest text-[#E5E2E1]/50 mb-2 uppercase"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {product.category || "Exclusive Piece"}
                    </p>
                    <div className="flex justify-between items-center">
                      <h3
                        className="text-base md:text-lg text-[#FFD700] truncate mr-2"
                        style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                      >
                        {product.name}
                      </h3>
                      <span
                        className="text-sm text-[#E5E2E1] whitespace-nowrap"
                        style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                      >
                        ₹ {product.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FEATURED COLLECTIONS - ASYMMETRIC GRID */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#1A1A1A] border-y border-[#474747]/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 md:px-8 mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-5xl tracking-tight text-[#FFD700]"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            Featured Collections
          </h2>
        </motion.div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch"
          >
            {/* EMBROIDERED - Large Left */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7"
            >
              <Link
                to="/collections/embroidered"
                className="relative group cursor-pointer block"
              >
                <div className="h-[400px] md:h-[600px] overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD39l66LWlopYu-MwfRXKBt03DYuFwJWjtI-YfkCkVJR-dfPBY0lvCqLzFe5spClH2vy0msp7hh6x0x-9RQVhm9oLKyjzQa7c9oGVqQlXYUAGVWZY5Qmsn6rq41kgdOhbT5Y3vpoyKgIaz9sUjAny0GQ7OE3ehQZSaY2L4RuBQfqWkysK7OgC-kRMar7yP-vP9iLW5ZMp8hM4LwdzCT0SQJO3WlMzs68uHyasc_zvD4pkMCgYsIvE2aIPLbvCwwVJRBjDSr_cBx2vk"
                    alt="Embroidered Collection"
                    className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
                    style={{ filter: "grayscale(80%) brightness(0.5)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter =
                        "grayscale(30%) brightness(0.6)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter =
                        "grayscale(80%) brightness(0.5)")
                    }
                  />
                </div>
                <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12">
                  <h3
                    className="text-white tracking-tighter text-2xl md:text-3xl"
                    style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                  >
                    EMBROIDERED
                  </h3>
                </div>
              </Link>
            </motion.div>

            {/* Right Column */}
            <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
              {/* SOLIDS */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <Link
                  to="/collections/solids"
                  className="relative group cursor-pointer block h-full"
                >
                  <div className="h-[250px] md:h-full min-h-[280px] overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRAv8j_jA8v1NTepsGosqzwyo7SrNdvwkKrdAKsfmncFbJikv9S6X4xyNb67rlPlUGnrKHXnprPz82OvBlICWsDVuBdFsYVDHAB7XWtIt_LSVWapCJeOoxsM60McW65WZSlvlNvb4c5zJG2vCxw8DIM_Yf3Rid7-keo_b0-3DbV73J41ZNKwgYuRjCPB5SSzrttOLONiAnIDybAZqche-tz9FAkBJdrbfdy9hlTyy0XJE_4bIbrLRPiHhdDqLGdYtptbIlW7spPI0"
                      alt="Solids Collection"
                      className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
                      style={{ filter: "grayscale(80%) brightness(0.5)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter =
                          "grayscale(30%) brightness(0.6)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter =
                          "grayscale(80%) brightness(0.5)")
                      }
                    />
                  </div>
                  <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                    <h4
                      className="text-white tracking-tighter text-xl md:text-2xl"
                      style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                    >
                      SOLIDS
                    </h4>
                  </div>
                </Link>
              </motion.div>

              {/* FESTIVE */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <Link
                  to="/collections/festive"
                  className="relative group cursor-pointer block h-full"
                >
                  <div className="h-[250px] md:h-full min-h-[280px] overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGV3Nx7q6n62SSS4E0vzip6ImLLnnp8-49wCI8vY_P8Z_TI01c4lIxI33w_xoekQyEt2LAdch4nrbHh13cFjT6dqZkJf6HBtHd393gs_w3DNb4YTaVegd-nO81lgxFxL9bL3IPll0AGQ6A1hC2WbhwHGDPRCPRCtfEDeCSI7WpfX6SVOveDqm1XgUjqK0wvwEld4Z-5ONY19Y_eSe9hQVxnb0QN6xnggk18N6bNPX2ftk5VMHoA5U6rafLGT5Jnj3wUDJ48Iuxs10"
                      alt="Festive Collection"
                      className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
                      style={{ filter: "grayscale(80%) brightness(0.5)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter =
                          "grayscale(30%) brightness(0.6)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter =
                          "grayscale(80%) brightness(0.5)")
                      }
                    />
                  </div>
                  <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                    <h4
                      className="text-white tracking-tighter text-xl md:text-2xl"
                      style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
                    >
                      FESTIVE
                    </h4>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FOUNDER'S STORY */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#131313] text-white py-28 md:py-40 px-6 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-16 text-[#FFD700] tracking-widest"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            The Story Behind Sheer Threads
          </motion.h2>

          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.6 }}
            className="w-24 h-0.5 bg-[#FFD700] mx-auto mb-12"
          ></motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl leading-loose text-[#E5E2E1]/70 tracking-wide text-center"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            I, Shrinja Saxena, founder of Sheer Threads, thank you for taking the time to reach here and for your attention to my journey. I would love to share the story behind this brand, a story that began with a simple yet powerful idea of uniqueness and craftsmanship, and with a gap I constantly felt in the Indian market.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl leading-loose text-[#E5E2E1]/70 tracking-wide text-center mt-6"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            Like many others, I found myself wearing outfits that looked repetitive, the same fabrics, the same silhouettes, the same patterns, lacking charm and individuality. There was always a feeling that something was missing, something more personal, more meaningful.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl leading-loose text-[#E5E2E1]/70 tracking-wide text-center mt-6"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            That absence became the seed of Sheer Threads. I envisioned creating clothing that was not just worn, but felt, pieces that carried intent, artistry, and identity. I immersed myself in researching the right fabrics, the right quality, and the right price point so that every creation could cater to those who seek more than just a garment, those who seek a piece of art that reflects their personality.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl leading-loose text-[#E5E2E1]/70 tracking-wide text-center mt-6"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            At Sheer Threads, every piece we design is one of one, no repeats, no mass production, not even in multiple sizes. Each garment is tailored, embroidered, and handcrafted with meticulous precision, ensuring that what you wear remains exclusively yours.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl leading-loose text-[#E5E2E1]/70 tracking-wide text-center mt-6"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            The pricing is thoughtfully set to honor the effort, skill, and hours poured into every stitch, while still remaining accessible and not heavy on the pocket.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl leading-loose text-[#E5E2E1]/70 tracking-wide text-center mt-6"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            Sheer Threads stands for slow fashion, intention, and individuality, where clothing is not merely fabric stitched together, but a story woven with patience, passion, and purpose.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl leading-loose text-[#E5E2E1]/70 tracking-wide text-center mt-6"
            style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
          >
            Thank you for hearing me out and for being a part of this journey that celebrates art, authenticity, and the beauty of owning something truly unique.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-[#FFD700] font-semibold tracking-widest"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            — Shrinja Saxena
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PREMIUM FOOTER */}
      {/* ═══════════════════════════════════════════ */}
      <footer className="bg-[#131313] text-white py-16 md:py-20 px-6 md:px-8 border-t border-[#474747]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          {/* BRAND */}
          <div>
            <h3
              className="text-2xl font-bold text-[#FFD700] mb-4 tracking-wide"
              style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
            >
              Sheer Threads
            </h3>
            <p
              className="text-[#E5E2E1]/50 leading-relaxed text-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Slow fashion rooted in craftsmanship. Designed for individuality.
              Made for those who value art over repetition.
            </p>
          </div>

          {/* COLLECTIONS */}
          <div>
            <h4
              className="font-semibold mb-6 text-white text-sm tracking-wider uppercase"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Collections
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/collections/solids"
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Solids
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/embroidered"
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Embroidered
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/festive"
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Festive
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4
              className="font-semibold mb-6 text-white text-sm tracking-wider uppercase"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Customer Care
            </h4>
            <ul className="space-y-3">
              <li>
                <span
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Contact Us
                </span>
              </li>
              <li>
                <span
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Shipping Policy
                </span>
              </li>
              <li>
                <span
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Returns & Exchanges
                </span>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4
              className="font-semibold mb-6 text-white text-sm tracking-wider uppercase"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <span
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Instagram
                </span>
              </li>
              <li>
                <span
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Pinterest
                </span>
              </li>
              <li>
                <span
                  className="text-[#E5E2E1]/50 hover:text-[#FFD700] transition-colors duration-300 cursor-pointer text-sm"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Email
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom with extra links from Stitch design */}
        <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-[#474747]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <span
                className="text-xs uppercase tracking-widest text-[#E5E2E1]/30 hover:text-[#FFD700] transition-colors duration-500 cursor-pointer"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Privacy
              </span>
              <span
                className="text-xs uppercase tracking-widest text-[#E5E2E1]/30 hover:text-[#FFD700] transition-colors duration-500 cursor-pointer"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Terms
              </span>
              <span
                className="text-xs uppercase tracking-widest text-[#E5E2E1]/30 hover:text-[#FFD700] transition-colors duration-500 cursor-pointer"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Careers
              </span>
              <span
                className="text-xs uppercase tracking-widest text-[#E5E2E1]/30 hover:text-[#FFD700] transition-colors duration-500 cursor-pointer"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Contact
              </span>
            </div>
            <p
              className="text-xs uppercase tracking-widest text-[#E5E2E1]/30"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              © 2026 Sheer Threads. Permanence in Form.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
