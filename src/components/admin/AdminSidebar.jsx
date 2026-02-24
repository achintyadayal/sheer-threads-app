import React from "react";
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut
} from "lucide-react";

function AdminSidebar({ activeTab, onTabChange, onLogout }) {

  const menuItems = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "products", icon: Package, label: "Products" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "customers", icon: Users, label: "Customers" },
    { id: "settings", icon: Settings, label: "Settings" }
  ];

  return (
    <div className="w-64 bg-neutral-950 text-white h-screen fixed left-0 top-0 flex flex-col border-r border-neutral-800">

      {/* Logo / Title */}
      <div className="p-8 border-b border-neutral-800">
        <h1 className="text-2xl font-extrabold text-yellow-500 tracking-wide">
          Sheer Threads
        </h1>
        <p className="text-xs text-neutral-400 mt-1 tracking-widest uppercase">
          Admin Portal
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-8 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-4 px-8 py-3 transition-all duration-300 ${
              activeTab === item.id
                ? "bg-neutral-800 border-l-4 border-yellow-500 text-yellow-500"
                : "hover:bg-neutral-800 text-neutral-300 hover:text-yellow-500"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center space-x-4 px-8 py-4 border-t border-neutral-800 hover:bg-neutral-800 transition-all duration-300 text-neutral-300 hover:text-red-400"
      >
        <LogOut className="w-5 h-5" />
        <span className="tracking-wide">Logout</span>
      </button>

    </div>
  );
}

export default AdminSidebar;
