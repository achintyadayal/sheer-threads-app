import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-black text-white px-8 py-4 flex justify-between items-center fixed w-full z-50">

      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-yellow-400 tracking-wide"
      >
        Sheer Threads
      </Link>

      {/* Nav */}
      <div className="space-x-6">


        {isLoggedIn && (
          <>
            <Link to="/new-arrivals" className="hover:text-gray-300">
              New Arrivals
            </Link>

            <Link to="/cart" className="hover:text-gray-300">
              Cart
            </Link>
          </>
        )}

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        )}

      </div>
    </header>
  );
}

export default UserHeader;