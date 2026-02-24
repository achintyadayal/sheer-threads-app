import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import UserHeader from "./components/user/UserHeader";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserOrders from "./pages/UserOrders";
import Signup from "./pages/Signup";
import NewArrivals from "./pages/NewArrivals";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./pages/ProductDetails";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProducts";
import AdminOrders from "./pages/admin/AdminOrders";




function App() {
  return (
    <AppProvider>
      <UserHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/collections/:type" element={<CollectionPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
