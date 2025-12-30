import Sidebar from "../component/Sidebar";
import Heading from "../atom/Heading";
import { Activity } from "lucide-react";
import { useEffect, useContext } from "react";
import TaskCard from "../atom/TaskCard";
import { AppContext } from "../context/AppContext";
import SideComponentWrapper from "../component/SideComponentWrapper";

const InProgress = () => {
  const { tasks, loading, error, fetchTasks } = useContext(AppContext);
  useEffect(() => {
     document.title = "In-Progress Tasks | TaskManager";

    fetchTasks({ status: "in-progress" });
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 md:justify-end ">
        <Sidebar />

        <SideComponentWrapper>
          <div className="">
            <div className="mb-10">
              <Heading
                icon={Activity}
                title="In Progress"
                subtitle="Tasks currently being worked on"
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />
            </div>

            {loading ? (
              <p className="text-slate-500">Loading in-progress tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-slate-500">No in-progress tasks found.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 mt-6">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    _id={task._id}
                    dueDate={task?.dueDate}
                    description={task.description}
                    title={task.title}
                    status={task.status}
                    priority={task.priority}
                  />
                ))}
              </div>
            )}
          </div>
        </SideComponentWrapper>
      </div>
    </>
  );
};
export default InProgress;
