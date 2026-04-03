import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/user/ProductCard";
import { getProductById, getProducts } from "../api/productService";

function ProductDetails() {
  const { id } = useParams();
  const { cart, addToCart, updateCartQuantity, removeFromCart } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.image);

        const allProducts = await getProducts();
        const relatedProducts = allProducts
          .filter((item) => item.id !== data.id)
          .slice(0, 3);

        setRelated(relatedProducts);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="pt-24 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="pt-24 text-center">Product not found</div>;
  }

  const productId = product._id || product.id;
  const cartItem = cart.find((item) => (item._id || item.id) === productId);

  return (
    <div className="pt-24 px-6">

      <Link
        to="/"
        className="text-yellow-500 hover:underline mb-8 inline-block"
      >
        ← Back to Collection
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* IMAGE GALLERY */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-xl mb-6"
          />

          {product.images && (
            <div className="flex gap-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onClick={() => setSelectedImage(img)}
                  className="w-24 h-24 object-cover rounded cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="font-serif">

          <span className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold mb-4">
            One of One
          </span>

          <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
            {product.name}
          </h1>

          <p className="text-2xl text-neutral-700 mb-6">
            ₹ {product.price}
          </p>

          <p className="text-neutral-600 leading-loose mb-8">
            {product.description}
          </p>

          {/* SIZE SELECTION */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Select Size</h3>
            <div className="flex gap-4">
              {(product.sizes || []).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-full transition-colors ${selectedSize === size
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "border-neutral-400 hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
              {(!product.sizes || product.sizes.length === 0) && (
                <span className="text-gray-500 italic">One size fits all</span>
              )}
            </div>
          </div>

          {/* FABRIC & CARE */}
          <div className="mb-8">
            <p><span className="font-semibold">Fabric:</span> {product.fabric}</p>
            <p><span className="font-semibold">Care:</span> {product.care}</p>
          </div>

          {/* ADD TO CART / QUANTITY CONTROLS */}
          {cartItem ? (
            <div className="flex items-center gap-6 mb-8 mt-4">
              <div className="flex items-center border-2 border-neutral-800 rounded-full px-4 py-2 bg-neutral-100">
                <button
                  onClick={() => updateCartQuantity(cartItem._id || cartItem.id, cartItem.quantity - 1)}
                  className="text-2xl px-3 hover:text-yellow-600 font-bold transition"
                >
                  -
                </button>
                <span className="mx-4 font-black text-xl">{cartItem.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(cartItem._id || cartItem.id, cartItem.quantity + 1)}
                  className="text-2xl px-3 hover:text-yellow-600 font-bold transition"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(cartItem._id || cartItem.id)}
                className="text-red-500 hover:text-red-700 font-semibold underline text-lg tracking-wide transition"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-500 text-black px-10 py-4 mb-8 rounded-full font-bold tracking-widest hover:scale-105 hover:bg-yellow-400 transition duration-300 shadow-lg uppercase"
            >
              Add to Cart
            </button>
          )}

          {/* FOUNDER NOTE */}
          <div className="mt-16 p-6 bg-neutral-100 rounded-lg">
            <h4 className="font-bold mb-4 text-lg">
              A Note from the Founder
            </h4>
            <p className="text-neutral-700 italic leading-relaxed">
              {product.founderNote}
            </p>
          </div>

        </div>
      </div>

      {/* RELATED */}
      <div className="max-w-7xl mx-auto mt-32">
        <h2 className="text-3xl font-bold mb-12 text-center">
          You May Also Love
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProductDetails;
