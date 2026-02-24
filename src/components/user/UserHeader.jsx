import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

function UserHeader() {
  const location = useLocation();
  const { cartItems } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Hide header on admin routes
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  // Dark mode toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
<header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md">

    
    <div className="flex items-center justify-between w-full px-8 py-4">


      {/* LEFT - BRAND */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-yellow-400 tracking-wide"
      >
        SheerThreads
      </Link>

      {/* CENTER - SEARCH (Desktop only) */}
      <div className="hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-full text-white bg-gray-800 focus:outline-none"
        />
      </div>

      {/* RIGHT SIDE - DESKTOP */}
      <div className="hidden md:flex items-center gap-6">

        <div className="relative group">
  <button className="hover:text-yellow-400 transition">
    Collections
  </button>

  <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-300">
    <Link
      to="/collections/solids"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Solids
    </Link>

    <Link
      to="/collections/embroidered"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Embroidered
    </Link>

    <Link
      to="/collections/festive"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Festive
    </Link>
  </div>
</div>

        
        <Link to="/new-arrivals" className="hover:text-yellow-400 transition">
        New Arrivals
        </Link>

        

        <Link to="/orders" className="hover:text-yellow-400 transition">
          Orders
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative hover:text-yellow-400 transition">
          Cart
          {cartItems?.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* Dark Mode */}
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="px-3 py-1 border border-white rounded-lg hover:bg-white hover:text-black transition"
          >
            Profile
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg p-3 space-y-2">
              <Link to="/login" className="block hover:text-gray-600">
                Login
              </Link>
              <Link to="/orders" className="block hover:text-gray-600">
                My Orders
              </Link>
              <button className="block w-full text-left hover:text-red-500">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

    </div>

    {/* MOBILE MENU */}
    {menuOpen && (
      <div className="md:hidden bg-black px-6 py-4 space-y-4">

        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-full text-black"
        />

        <Link to="/" className="block">
          Home
        </Link>

        <Link to="/orders" className="block">
          Orders
        </Link>

        <Link to="/cart" className="block">
          Cart ({cartItems?.length || 0})
        </Link>

        <Link to="/login" className="block">
          Login
        </Link>

        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </button>
      </div>
    )}
  </header>
);
}

export default UserHeader;
