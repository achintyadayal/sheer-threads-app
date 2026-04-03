import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    login(data.token);
    // Navigation is handled by the useEffect above after user state updates
  };

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-100">

      <form className="bg-white p-10 rounded-xl shadow-lg w-96" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded hover:bg-amber-700 transition"
        >
          Login
        </button>

        {/* 🔗 Signup Link */}
        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </form>
    </div>
  );
}

export default LoginPage;