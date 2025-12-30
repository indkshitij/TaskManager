import {
  Flame,
  Zap,
  Leaf,
  CheckCircle2,
  Hourglass,
  Calendar,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Heading from "../../atom/Heading";
import Button from "../../atom/Button";
import DeleteDialog from "../Dialog/DeleteDialog";
import IconButton from "../../atom/IconButton";

const CompleteViewDialog = ({
  open,
  onClose,
  task,
  onDelete,
  deleting = false,
}) => {
  const [openDelete, setOpenDelete] = useState(false);

  if (!open || !task) return null;

  const priorityMap = {
    high: {
      icon: Flame,
      badge: "bg-red-50 text-red-700",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    medium: {
      icon: Zap,
      badge: "bg-yellow-50 text-yellow-700",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    low: {
      icon: Leaf,
      badge: "bg-green-50 text-green-700",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  };

  const statusMap = {
    completed: {
      icon: CheckCircle2,
      badge: "bg-green-50 text-green-700",
    },
    pending: {
      icon: Hourglass,
      badge: "bg-orange-50 text-orange-700",
    },
    "in-progress": {
      icon: Hourglass,
      badge: "bg-blue-50 text-blue-700",
    },
  };

  const p = priorityMap[task?.priority] || priorityMap.medium;
  const s = statusMap[task?.status] || statusMap.pending;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="relative  w-full max-w-[95%] md:max-w-2xl rounded-2xl bg-white shadow-xl  ">
          <div className="border-b border-gray-200 px-6 pt-6">
            <div className="cursor-pointer absolute top-4 right-4">
              <IconButton
                icon={X}
                label="Close"
                onClick={onClose}
                variant="secondary"
              />
            </div>

            {/* Heading */}
            <Heading
              icon={p.icon}
              title="Task Details"
              subtitle="Complete overview of your task"
              iconBg={p.iconBg}
              iconColor={p.iconColor}
            />
          </div>
          {/* Title */}
          <div className="p-3 md:p-6 cursor-default">
            <h3 className="text-lg md:text-xl font-medium text-slate-800 mb-4">
              {task.title}
            </h3>

            {/* Description */}
            <div className="mb-2 md:mb-6 rounded-xl bg-slate-50 p-2 md:p-4 max-h-60 md:max-h-80 overflow-y-auto border border-slate-200 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              <p className="text-sm text-slate-600 leading-relaxed">
                {task.description?.trim() ||
                  "No description provided for this task."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-4 mb-0 md:mb-6">
              <div
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs capitalize font-medium ${p.badge}`}
              >
                <p.icon size={16} />
                {task.priority} Priority
              </div>

              <div
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs capitalize font-medium ${s.badge}`}
              >
                <s.icon size={16} />
                {task.status}
              </div>

              <div className="flex items-center gap-2 rounded-full px-4 py-2 bg-slate-100 text-slate-700 text-xs capitalize">
                <Calendar size={16} />
                Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t  border-gray-200">
            <div className="w-40">
              <Button
                text="Edit"
                variant="secondary"
                to={`/edit-task/${task._id}`}
                className="w-auto"
              />
            </div>

            <div className="w-40">
              <Button
                text="Delete"
                variant="danger"
                onClick={() => setOpenDelete(true)}
                className="w-auto"
                // icon={Trash2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => onDelete(task._id)}
        loading={deleting}
      />
    </>
  );
};

export default CompleteViewDialog;
