import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/user/ProductCard";
import CartSidebar from "../components/user/CartSidebar";
import { Link } from "react-router-dom";


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

  return (
  <div className="pt-20">

    {/* HERO SECTION */}
    <div className="relative w-full h-[90vh] overflow-hidden">

      <video
        src="/Sheer_Threads_products.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <h1 className="text-5xl font-extrabold mb-6">
          Elevate Your Style
        </h1>

        <Link
          to="/new-arrivals"
          className="bg-yellow-500 text-black px-10 py-4 rounded-full text-xl font-bold tracking-widest hover:scale-110 hover:bg-yellow-400 transition duration-300 shadow-2xl uppercase"
        >
          Shop Now
        </Link>
      </div>

    </div>

    {/* NEW ARRIVALS SECTION */}
    <div className="max-w-7xl mx-auto px-6 py-20">

      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-bold text-neutral-900">
          New Arrivals
        </h2>

        <Link
          to="/new-arrivals"
          className="text-yellow-500 font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {filteredProducts.slice(0, 4).map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={addToCart}
          />
        ))}
      </div>

    </div>
    {/* FEATURED COLLECTIONS */}
<div className="px-6 py-24 bg-neutral-100">

  <h2 className="text-4xl font-bold text-center mb-16">
    Featured Collections
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

    {/* SOLIDS */}
    <Link
      to="/collections/solids"
      className="relative overflow-hidden group"
    >
      <img
        src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800"
        alt="Solids"
        className="w-full h-96 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-3xl font-bold tracking-widest">
          SOLIDS
        </h3>
      </div>
    </Link>

    {/* EMBROIDERED */}
    <Link
      to="/collections/embroidered"
      className="relative overflow-hidden group"
    >
      <img
        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
        alt="Embroidered"
        className="w-full h-96 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-3xl font-bold tracking-widest">
          EMBROIDERED
        </h3>
      </div>
    </Link>

    {/* FESTIVE */}
    <Link
      to="/collections/festive"
      className="relative overflow-hidden group"
    >
      <img
        src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800"
        alt="Festive"
        className="w-full h-96 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-3xl font-bold tracking-widest">
          FESTIVE
        </h3>
      </div>
    </Link>

  </div>
  {/* GRADIENT TRANSITION */}
<div className="h-24 bg-linear-to-b from-white to-neutral-900"></div>

{/* FOUNDER STORY */}
<section className="bg-neutral-900 text-white py-40 px-6 mt-24 transition-all duration-1000">

  <div className="max-w-5xl mx-auto text-center">

    <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-yellow-500 tracking-widest">
      The Story Behind Sheer Threads
    </h2>
    <div className="w-24 h-0.5 bg-yellow-500 mx-auto mb-12"></div>


    <p className="text-lg md:text-xl leading-loose text-neutral-300 whitespace-pre-line font-serif tracking-wide"
>
      
      I, Shrinja Saxena, founder of Sheer Threads, thank you for taking the time to reach here and for your attention to my journey. 
      I would love to share the story behind this brand — a story that began with a simple yet powerful idea of uniqueness and craftsmanship, 
      and with a gap I constantly felt in the Indian market.

      Like many others, I found myself wearing outfits that looked repetitive — the same fabrics, the same silhouettes, 
      the same patterns, lacking charm and individuality. There was always a feeling that something was missing, 
      something more personal, more meaningful.

      That absence became the seed of Sheer Threads. I envisioned creating clothing that was not just worn, but felt — 
      pieces that carried intent, artistry, and identity. I immersed myself in researching the right fabrics, the right quality, 
      and the right price point so that every creation could cater to those who seek more than just a garment — 
      those who seek a piece of art that reflects their personality.

      At Sheer Threads, every piece we design is one of one — no repeats, no mass production, not even in multiple sizes. 
      Each garment is tailored, embroidered, and handcrafted with meticulous precision, ensuring that what you wear remains exclusively yours.

      The pricing is thoughtfully set to honor the effort, skill, and hours poured into every stitch, 
      while still remaining accessible and not heavy on the pocket.

      Sheer Threads stands for slow fashion, intention, and individuality — where clothing is not merely fabric stitched together, 
      but a story woven with patience, passion, and purpose.

      Thank you for hearing me out and for being a part of this journey that celebrates art, authenticity, 
      and the beauty of owning something truly unique.
    </p><p className="mt-16 text-yellow-500 font-semibold tracking-widest">
  — Shrinja Saxena
</p>

</div>
</section>
<div className="h-px bg-neutral-300 max-w-6xl mx-auto my-20"></div>

{/* PREMIUM FOOTER */}
<footer className="bg-neutral-950 text-white py-20 px-6 border-t border-neutral-800 mt-24">

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

    {/* BRAND */}
    <div>
      <h3 className="text-2xl font-extrabold text-yellow-500 mb-4 tracking-wide">
        Sheer Threads
      </h3>
      <p className="text-neutral-400 leading-relaxed">
        Slow fashion rooted in craftsmanship. 
        Designed for individuality. 
        Made for those who value art over repetition.
      </p>
    </div>

    {/* COLLECTIONS */}
    <div>
      <h4 className="font-semibold mb-6 text-white">Collections</h4>
      <ul className="space-y-3 text-neutral-400">
        <li className="hover:text-yellow-500 cursor-pointer transition">Solids</li>
        <li className="hover:text-yellow-500 cursor-pointer transition">Embroidered</li>
        <li className="hover:text-yellow-500 cursor-pointer transition">Festive</li>
      </ul>
    </div>

    {/* SUPPORT */}
    <div>
      <h4 className="font-semibold mb-6 text-white">Customer Care</h4>
      <ul className="space-y-3 text-neutral-400">
        <li className="hover:text-yellow-500 cursor-pointer transition">Contact Us</li>
        <li className="hover:text-yellow-500 cursor-pointer transition">Shipping Policy</li>
        <li className="hover:text-yellow-500 cursor-pointer transition">Returns & Exchanges</li>
      </ul>
    </div>

    {/* SOCIAL */}
    <div>
      <h4 className="font-semibold mb-6 text-white">Connect</h4>
      <ul className="space-y-3 text-neutral-400">
        <li className="hover:text-yellow-500 cursor-pointer transition">Instagram</li>
        <li className="hover:text-yellow-500 cursor-pointer transition">Pinterest</li>
        <li className="hover:text-yellow-500 cursor-pointer transition">Email</li>
      </ul>
    </div>

  </div>

  <div className="text-center text-neutral-500 mt-16 text-sm">
    © 2026 Sheer Threads. All Rights Reserved.
  </div>

</footer>

</div>


  </div>
);


}

export default HomePage;
