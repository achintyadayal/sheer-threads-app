import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./pages/ProductDetails";
import NewArrivals from "./pages/NewArrivals";

import UserHeader from "./components/user/UserHeader";
import UserProtectedRoute from "./components/user/UserProtectedRoute";

function App() {
  return (
    <AppProvider>
      <UserHeader />

      <Routes>

        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

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

      </Routes>
    </AppProvider>
  );
}

export default App;