import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useContext } from "react";
import { Menu, X, ShoppingBag, Heart, LogOut } from "lucide-react";
import { AppContext } from "../../context/AppContext";

function UserHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { wishlist } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-8 h-20 border-b border-[#d1c5b5]/20 transition-colors duration-300 ${isMobileMenuOpen ? "bg-[#FAF9F6]" : "bg-[#ffffff]/80 backdrop-blur-xl"}`}>

      {/* Mobile Menu Button (Left) */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-[#c8a66d] hover:text-[#e5c186] transition-colors duration-300 active:scale-95 relative z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Brand Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-[#c8a66d] tracking-widest z-50"
        style={{ fontFamily: "'Noto Serif', 'Georgia', serif" }}
        onClick={closeMenu}
      >
        Sheer Threads
      </Link>

      {/* Desktop Navigation + Icons */}
      <div className="flex items-center gap-8">
        <nav
          className="hidden md:flex gap-8 text-[11px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <Link
            to="/"
            className="text-[#c8a66d] transition-colors duration-300"
          >
            Home
          </Link>
          {user && (
            <>
              <Link
                to="/new-arrivals"
                className="text-[#1b1c1c] hover:text-[#c8a66d] transition-colors duration-300"
              >
                New Arrivals
              </Link>
              <Link
                to="/profile"
                className="text-[#1b1c1c] hover:text-[#c8a66d] transition-colors duration-300"
              >
                Profile
              </Link>
            </>
          )}
        </nav>

        {/* Right side icons / actions */}
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Link
                to="/wishlist"
                className="relative text-[#c8a66d] hover:text-[#e5c186] transition-colors duration-300 active:scale-95"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#c8a66d] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="text-[#c8a66d] hover:text-[#e5c186] transition-colors duration-300 active:scale-95"
              >
                <ShoppingBag size={20} />
              </Link>
            </>
          )}

          {!user ? (
            <Link
              to="/login"
              className="bg-[#c8a66d] text-[#ffffff] px-5 py-2 text-[11px] tracking-[0.15em] uppercase font-bold hover:bg-[#e5c186] transition-all duration-300 active:scale-95"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-1.5 text-[#1b1c1c]/60 hover:text-red-500 transition-colors duration-300 text-[11px] tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-[#FAF9F6] text-[#1b1c1c] flex flex-col justify-center items-center space-y-8 text-xl font-semibold transition-all duration-300 md:hidden z-[55] ${isMobileMenuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
          }`}
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="text-[#c8a66d] tracking-[0.2em] uppercase text-sm"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Home
        </Link>
        {user && (
          <>
            <Link
              to="/new-arrivals"
              onClick={closeMenu}
              className="text-[#1b1c1c] hover:text-[#c8a66d] transition-colors duration-300 tracking-[0.2em] uppercase text-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              New Arrivals
            </Link>
            <Link
              to="/cart"
              onClick={closeMenu}
              className="text-[#1b1c1c] hover:text-[#c8a66d] transition-colors duration-300 tracking-[0.2em] uppercase text-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Cart
            </Link>
            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="text-[#1b1c1c] hover:text-[#c8a66d] transition-colors duration-300 tracking-[0.2em] uppercase text-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Wishlist
            </Link>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="text-[#1b1c1c] hover:text-[#c8a66d] transition-colors duration-300 tracking-[0.2em] uppercase text-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Profile
            </Link>
          </>
        )}

        {/* Divider */}
        <div className="w-16 h-px bg-[#c8a66d]/30"></div>

        {!user ? (
          <Link
            to="/login"
            onClick={closeMenu}
            className="bg-[#c8a66d] text-[#ffffff] px-10 py-3 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#e5c186] transition-all duration-300"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-400 transition-colors duration-300 tracking-[0.2em] uppercase text-sm flex items-center gap-2"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>

    </header>
  );
}

export default UserHeader;