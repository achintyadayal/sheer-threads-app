import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const registerRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.message);
        setLoading(false);
        return;
      }

      // Show verification message
      setRegistered(true);

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  // After successful registration, show the verify email message
  if (registered) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-100">
        <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold">
            Check Your Email
          </h1>

          <p className="text-gray-600">
            We've sent a verification link to{" "}
            <span className="font-semibold text-black">
              {form.email}
            </span>
          </p>

          <p className="text-sm text-gray-500">
            Click the link in the email to verify your account.
            Once verified, you'll be redirected to the login page.
          </p>

          <Link
            to="/login"
            className="inline-block text-amber-600 font-semibold hover:underline mt-4"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-100 animate-fadeIn">

      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-xl shadow-xl w-96 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center mb-4">
          Create Account
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Confirm Password */}
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded hover:bg-amber-700 transition"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;