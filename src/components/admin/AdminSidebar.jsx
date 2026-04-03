import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard"
    },
    {
      name: "Products",
      icon: Package,
      path: "/admin/products"
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      path: "/admin/orders"
    },
    {
      name: "Customers",
      icon: Users,
      path: "/admin/customers"
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/admin/settings"
    }
  ];

  return (
    <div className="w-64 bg-neutral-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl">

      {/* Logo Section */}
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-2xl font-serif tracking-wide">
          Sheer Threads
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-6 py-3 transition-all ${isActive
                ? "bg-amber-600 text-white"
                : "hover:bg-neutral-800 text-neutral-300"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-6 border-t border-neutral-800">

        {/* Role Display */}
        <p className="text-xs text-neutral-400 mb-4">
          Logged in as Admin
        </p>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}

export default AdminSidebar;