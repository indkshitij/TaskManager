import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  LogOut,
  CheckSquare,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Completed", path: "/tasks/completed", icon: CheckCircle2 },
    { label: "Pending", path: "/tasks/pending", icon: Clock },
    { label: "In Progress", path: "/tasks/incomplete", icon: AlertCircle },
    { label: "Create Task", path: "/create-task", icon: Plus },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-indigo-50 text-indigo-600 font-medium border-l-4 border-indigo-600"
      : "text-slate-600 hover:bg-slate-100";

  return (
    <>
      {/* mobile top */}
      <div className="cursor-default w-full md:hidden flex justify-between items-center gap-3 px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 flex shadow-inner items-center justify-center">
            <CheckSquare size={18} className="text-indigo-600" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900 cursor-default">Task Manager</h1>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 transition"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed  top-0 left-0 h-screen w-76 md:w-60 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 flex flex-col justify-between ${
          open ? "translate-x-0" : "-translate-x-full"
        }
        md:translate-x-0`}
      >
        <div className="">
          <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 md:p-2.5 rounded-xl shadow-inner bg-indigo-100 flex items-center justify-center">
                <CheckSquare size={22} className="text-indigo-600" />
              </div>
              <h1 className="text-md md:text-lg font-semibold text-slate-900">
                Task Manager
              </h1>
            </div>

            {/* close btn mobile */}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-2 py-3 space-y-2">
            {navItems.map(({ label, path, icon: Icon }) => (
              <div
                key={path}
                onClick={() => {
                  navigate(path);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm cursor-pointer transition-all ${isActive(
                  path
                )}`}
              >
                <Icon size={18} />
                {label}
              </div>
            ))}
          </nav>
        </div>

        {/* log out */}
        <div className="px-3 py-3 border-t border-slate-200">
          <div
            onClick={() => {
              localStorage.removeItem("todotoken");
              window.location.replace("/");
              setOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-100 cursor-pointer transition"
          >
            <LogOut size={18} />
            Logout
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
