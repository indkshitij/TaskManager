import { useState } from "react";
import axios from "axios";
import Button from "../atom/Button";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../lib/GetHeader";
import { ClipboardList } from "lucide-react";
import Heading from "../atom/Heading";
import toast from "react-hot-toast";

const TaskForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !dueDate || !priority) {
      toast.error("Please fill all required fields");
      return setError("Please fill all required fields");
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task/create`,
        { title, description, dueDate, priority, status },
        getAuthHeader()
      );

      toast.success("Task created successfully ");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <Heading
          icon={ClipboardList}
          title="Create New Task"
          subtitle="Add task details and manage priorities"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* desc */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional task description"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* due date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* status */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* priority */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        {/* error */}
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <div className="flex justify-end pt-4">
          <div className="w-48">
            <Button
              type="submit"
              text="Create Task"
              loadingText="Creating..."
              loading={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
