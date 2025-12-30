import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../atom/Button";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import LoginAnimation from "../assets/Animation - 1745614311534.json";
import toast from "react-hot-toast";

const Login = () => {
  useEffect(() => {
    document.title = "Login | TaskManager";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      toast.success("Login successful 🎉");
      localStorage.setItem("todotoken", res.data.todotoken);
      window.location.replace("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 gap-10">
      <div className="hidden md:flex justify-center h-min md:h-full">
        <Lottie animationData={LoginAnimation} loop className="w-full h-fit" />
      </div>

      <div className="w-full max-w-md bg-white/70 rounded-xl shadow-lg p-8">
        <h1 className="text-xl md:text-2xl font-semibold md:font-bold text-slate-800 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1">
          Login to manage your tasks
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          {/* email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* password */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={showPassword ? "Enter Password" : "••••••••"}
              className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>

            <div className="text-right text-indigo-600 hover:underline cursor-pointer text-sm mt-1">
              Forgot password?
            </div>
          </div>

      
          <Button
            text="Login"
            type="submit"
            loadingText="Logging in..."
            loading={loading}
          />
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
