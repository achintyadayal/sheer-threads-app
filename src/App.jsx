import { Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./pages/ProductDetails";
import NewArrivals from "./pages/NewArrivals";
import ProfilePage from "./pages/ProfilePage";
import UserHeader from "./components/user/UserHeader";
import Signup from "./pages/Signup";
import VerifiedPage from "./pages/VerifiedPage";
import UserProtectedRoute from "./components/user/UserProtectedRoute";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSidebar from "./components/admin/AdminSidebar";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <AppProvider>
      {/* Show UserHeader only on non-admin routes */}
      {!isAdminRoute && <UserHeader />}

      {/* Show AdminSidebar on admin routes */}
      {isAdminRoute && <AdminSidebar />}

      <Routes>

        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verified" element={<VerifiedPage />} />

        {/* Protected Routes */}
        <Route
          path="/collections/:type"
          element={
            <UserProtectedRoute>
              <CollectionPage />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/new-arrivals"
          element={
            <UserProtectedRoute>
              <NewArrivals />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <UserProtectedRoute>
              <ProductDetails />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <UserProtectedRoute>
              <CartPage />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <CheckoutPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <ProfilePage />
            </UserProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminProtectedRoute>
              <AdminAddProduct />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminProtectedRoute>
              <AdminEditProduct />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />

      </Routes>
    </AppProvider>
  );
}

export default App;