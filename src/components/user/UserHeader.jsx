import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Menu, X, ShoppingBag, User, LogOut } from "lucide-react";

function UserHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-8 h-20 border-b border-[#474747]/10">

      {/* Mobile Menu Button (Left) */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-[#FFD700] hover:text-[#FFE16D] transition-colors duration-300 active:scale-95"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Brand Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-[#FFD700] tracking-widest uppercase z-50"
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
            className="text-[#FFD700] transition-colors duration-300"
          >
            Home
          </Link>
          {user && (
            <>
              <Link
                to="/new-arrivals"
                className="text-[#E5E2E1] hover:text-[#FFD700] transition-colors duration-300"
              >
                New Arrivals
              </Link>
              <Link
                to="/cart"
                className="text-[#E5E2E1] hover:text-[#FFD700] transition-colors duration-300"
              >
                Cart
              </Link>
              <Link
                to="/profile"
                className="text-[#E5E2E1] hover:text-[#FFD700] transition-colors duration-300"
              >
                Profile
              </Link>
            </>
          )}
        </nav>

        {/* Right side icons / actions */}
        <div className="flex items-center gap-4">
          {user && (
            <Link
              to="/cart"
              className="text-[#FFD700] hover:text-[#FFE16D] transition-colors duration-300 active:scale-95"
            >
              <ShoppingBag size={20} />
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="bg-[#FFD700] text-[#1A1A1A] px-5 py-2 text-[11px] tracking-[0.15em] uppercase font-bold hover:bg-[#FFE16D] transition-all duration-300 active:scale-95"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-1.5 text-[#E5E2E1]/60 hover:text-red-400 transition-colors duration-300 text-[11px] tracking-[0.15em] uppercase"
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
        className={`fixed inset-0 bg-[#131313]/95 backdrop-blur-xl text-white flex flex-col justify-center items-center space-y-8 text-xl font-semibold transition-transform duration-300 md:hidden z-40 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="text-[#FFD700] tracking-[0.2em] uppercase text-sm"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Home
        </Link>
        {user && (
          <>
            <Link
              to="/new-arrivals"
              onClick={closeMenu}
              className="text-[#E5E2E1] hover:text-[#FFD700] transition-colors duration-300 tracking-[0.2em] uppercase text-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              New Arrivals
            </Link>
            <Link
              to="/cart"
              onClick={closeMenu}
              className="text-[#E5E2E1] hover:text-[#FFD700] transition-colors duration-300 tracking-[0.2em] uppercase text-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Cart
            </Link>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="text-[#E5E2E1] hover:text-[#FFD700] transition-colors duration-300 tracking-[0.2em] uppercase text-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Profile
            </Link>
          </>
        )}

        {/* Divider */}
        <div className="w-16 h-px bg-[#FFD700]/30"></div>

        {!user ? (
          <Link
            to="/login"
            onClick={closeMenu}
            className="bg-[#FFD700] text-[#1A1A1A] px-10 py-3 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#FFE16D] transition-all duration-300"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 transition-colors duration-300 tracking-[0.2em] uppercase text-sm flex items-center gap-2"
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