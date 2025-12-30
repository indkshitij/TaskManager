import { Trash2 } from "lucide-react";
import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Button from "../../atom/Button";
import Heading from "../../atom/Heading";
import { getAuthHeader } from "../../lib/GetHeader";
import { AppContext } from "../../context/AppContext";

const DeleteDialog = ({ open, onClose, taskId }) => {
  const { fetchTasks, fetchTaskStats, fetchRecentTasks } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const onDelete = async () => {
    if (!taskId || loading) return;

    const toastId = toast.loading("Deleting task...");

    try {
      setLoading(true);

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/task/delete/${taskId}`,
        getAuthHeader()
      );

      toast.success("Task deleted successfully 🗑️", { id: toastId });
      fetchTasks();
      fetchTaskStats();
      fetchRecentTasks();
      onClose();
    } catch (error) {
      toast.error("Failed to delete task", { id: toastId });
      console.error("Delete failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-[90%] md:max-w-lg shadow-lg">
        <Heading
          icon={Trash2}
          title="Delete Task?"
          subtitle="This action cannot be undone."
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />

        <div className="mt-3 rounded-lg bg-red-50 border border-red-100 p-3">
          <p className="text-sm text-red-600 leading-relaxed">
            ⚠️ <span className="font-medium">Disclaimer:</span> Once deleted,
            this task will be permanently removed and cannot be recovered.
            Please make sure this is the intended action.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            text="Cancel"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          />

          <Button
            text="Delete"
            loadingText="Deleting..."
            variant="danger"
            onClick={onDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
