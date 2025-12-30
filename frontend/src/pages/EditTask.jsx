import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../component/Sidebar";
import Heading from "../atom/Heading";
import Button from "../atom/Button";
import { ClipboardEdit } from "lucide-react";
import { getAuthHeader } from "../lib/GetHeader";
import SideComponentWrapper from "../component/SideComponentWrapper";
import toast from "react-hot-toast";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
     document.title = "Edit Task | TaskManager";


    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/task/fetch-task/${id}`,
          getAuthHeader()
        );

        const task = res.data.task;

        setTitle(task.title);
        setDescription(task.description || "");
        setDueDate(task.dueDate?.split("T")[0]);
        setPriority(task.priority);
        setStatus(task.status || "pending");
      } catch (err) {
        console.error(err);
        setError("Failed to load task");
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !dueDate || !priority) {
      toast.error("Please fill all required fields");
      return setError("Please fill all required fields");
    }

    try {
      setLoading(true);

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/task/update/${id}`,
        { title, description, dueDate, priority, status },
        getAuthHeader()
      );
      toast.success("Task updated successfully ✨");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
      setError(err.response?.data?.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 md:justify-end">
      <Sidebar />

      <SideComponentWrapper>
        <div className="">
          <div className="mb-10">
            <Heading
              icon={ClipboardEdit}
              title="Edit Task"
              subtitle="Update task details and priority"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <div className="flex justify-end pt-4">
              <div className="w-48">
                <Button
                  type="submit"
                  text="Update Task"
                  loadingText="Updating..."
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </SideComponentWrapper>
    </div>
  );
};

export default EditTask;
