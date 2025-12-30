import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../atom/Button";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import RegisterAnimation from "../assets/Animation - 1745614324047.json";
import toast from "react-hot-toast";

const Register = () => {
  useEffect(() => {
    document.title = "Create Account | TaskManager";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          name,
          email,
          password,
          confirmPassword,
        }
      );
      toast.success("Welcome aboard 🚀");
      localStorage.setItem("todotoken", res.data.todotoken);
      window.location.replace("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 gap-32">
      <div className="hidden md:flex justify-center h-min md:h-full">
        <Lottie
          animationData={RegisterAnimation}
          loop
          className="w-full h-fit"
        />
      </div>

      <div className="w-full max-w-md bg-white/70 rounded-xl shadow-lg p-8">
        {/* heading */}
        <h1 className="text-xl md:text-2xl font-semibold md:font-bold text-slate-800 text-center">
          Create Account 🚀
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1">
          Register to start managing your tasks
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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
              className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/2 translate-y-0.5 text-slate-500 hover:text-indigo-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* confirm password */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={showPassword ? "Confirm Password" : "••••••••"}
              className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/2 translate-y-0.5 text-slate-500 hover:text-indigo-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <Button
            text="Register"
            type="submit"
            loadingText="Registering..."
            loading={loading}
          />
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
