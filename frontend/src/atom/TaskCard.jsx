import {
  Flame,
  Zap,
  Leaf,
  CheckCircle2,
  Hourglass,
  Pencil,
  Calendar,
  Trash2,
  Expand,
} from "lucide-react";
import DeleteDialog from "../component/Dialog/DeleteDialog";
import CompleteViewDialog from "../component/Dialog/CompleteViewDialog";
import { useState } from "react";
import IconButton from "./IconButton";

const TaskCard = ({
  _id,
  title,
  dueDate,
  description,
  status,
  priority,
  onEdit,
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  const priorityMap = {
    high: {
      icon: <Flame size={18} />,
      accent: "border-l-red-500",
      iconBg: "bg-red-100 text-red-600",
      badge: "bg-red-50 text-red-700",
    },
    medium: {
      icon: <Zap size={18} />,
      accent: "border-l-yellow-500",
      iconBg: "bg-yellow-100 text-yellow-600",
      badge: "bg-yellow-50 text-yellow-700",
    },
    low: {
      icon: <Leaf size={18} />,
      accent: "border-l-green-500",
      iconBg: "bg-green-100 text-green-600",
      badge: "bg-green-50 text-green-700",
    },
  };

  const statusMap = {
    completed: {
      icon: <CheckCircle2 size={16} />,
      style: "bg-green-100 text-green-700",
    },
    pending: {
      icon: <Hourglass size={16} />,
      style: "bg-orange-100 text-orange-700",
    },
    "in-progress": {
      icon: <Hourglass size={16} />,
      style: "bg-blue-100 text-blue-700",
    },
  };

  const p = priorityMap[priority] || priorityMap.medium;
  const s = statusMap[status] || statusMap.pending;

  return (
    <>
      <div
        className={`group relative flex flex-col justify-between bg-white border border-slate-200/80 border-l-4 ${p.accent} rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1`}
      >
        {/* Action Btn */}
        <div className=" absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
          <IconButton
            icon={Expand}
            label="View"
            onClick={() => setOpenView(true)}
            variant="secondary"
          />

          <IconButton
            icon={Pencil}
            to={`/edit-task/${_id}`}
            label="Edit"
            onClick={onEdit}
            variant="primary"
          />

          <IconButton
            icon={Trash2}
            label="Delete"
            onClick={() => setOpenDelete(true)}
            variant="danger"
          />
        </div>
        {/* icon */}
        <div className="mt-8 md:mt-0">
          <div className="flex gap-2 mb-3 items-center">
            <div
              className={`w-10 h-10 p-2 rounded-xl flex items-center justify-center shadow-inner border ${p.iconBg}`}
            >
              {p.icon}
            </div>
            {/* title */}
            <h3 className="font-semibold text-slate-800 ">{title}</h3>
          </div>
          {/* description */}
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {description?.trim() || "No overview available for this task."}
          </p>
        </div>
        {/* list of detail */}
        <div className="flex flex-wrap items-center justify-end gap-2 mt-5">
          <div
            className={`capitalize px-3 py-1 inline-flex items-center gap-2 rounded-full text-xs font-semibold ${p.badge}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            {priority} priority
          </div>

          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            <Calendar size={14} />
            {new Date(dueDate).toLocaleDateString()}
          </div>

          <span
            className={`capitalize flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${s.style}`}
          >
            {s.icon}
            {status}
          </span>
        </div>
      </div>

      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        taskId={_id}
      />

      <CompleteViewDialog
        open={openView}
        onClose={() => setOpenView(false)}
        task={{ _id, title, description, status, priority, dueDate }}
      />
    </>
  );
};

export default TaskCard;
