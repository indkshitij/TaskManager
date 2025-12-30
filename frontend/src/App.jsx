import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import { Navigate } from "react-router-dom";
import CompletedTask from "./pages/CompletedTask";
import Pending from "./pages/Pending";
import InProgress from "./pages/InProgress";
import { Toaster } from "react-hot-toast";

function App() {
  const token = localStorage.getItem("todotoken");

  return (
    <main>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" replace /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={!token ? <Navigate to="/login" replace /> : <Dashboard />}
        />
        <Route
          path="/create-task"
          element={!token ? <Navigate to="/login" replace /> : <CreateTask />}
        />
        <Route
          path="/tasks/completed"
          element={
            !token ? <Navigate to="/login" replace /> : <CompletedTask />
          }
        />

        <Route
          path="/tasks/pending"
          element={!token ? <Navigate to="/login" replace /> : <Pending />}
        />

        <Route
          path="/tasks/incomplete"
          element={!token ? <Navigate to="/login" replace /> : <InProgress />}
        />
        <Route
          path="/edit-task/:id"
          element={!token ? <Navigate to="/login" replace /> : <EditTask />}
        />
      </Routes>
    </main>
  );
}

export default App;
