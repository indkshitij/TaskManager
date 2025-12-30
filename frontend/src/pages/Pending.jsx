import Heading from "../atom/Heading";
import Sidebar from "../component/Sidebar";
import { Hourglass } from "lucide-react";
import { useEffect, useContext } from "react";
import TaskCard from "../atom/TaskCard";
import { AppContext } from "../context/AppContext";
import SideComponentWrapper from "../component/SideComponentWrapper";

const Pending = () => {
  const { tasks, loading, error, fetchTasks } = useContext(AppContext);

  useEffect(() => {
        document.title = "Pending Tasks | TaskManager";
      
    fetchTasks({ status: "pending" });
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 md:justify-end ">
        <Sidebar />

        <SideComponentWrapper>
          <div className="">
            <div className="mb-10">
              <Heading
                icon={Hourglass}
                title="Pending Tasks"
                subtitle="Tasks that are yet to be started"
                iconBg="bg-orange-100"
                iconColor="text-orange-600"
              />
            </div>

            {loading ? (
              <p className="text-slate-500">Loading pending tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-slate-500">No pending tasks found.</p>
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

export default Pending;
