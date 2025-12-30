import Sidebar from "../component/Sidebar";
import StatCard from "../atom/StatCard";
import TaskCard from "../atom/TaskCard";
import { List, CheckCircle, Clock, Activity, BarChart3 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getAuthHeader } from "../lib/GetHeader";
import Heading from "../atom/Heading";
import SideComponentWrapper from "../component/SideComponentWrapper";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const {fetchRecentTasks,recentTasks,setRecentTasks,loading,fetchTaskStats,stats} = useContext(AppContext)
  
  useEffect(() => {
     document.title = "Dashboard | TaskManager";

    fetchTaskStats();
    fetchRecentTasks();
  }, []);
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 md:justify-end ">
      {/* sidebar */}

      <Sidebar />
      <SideComponentWrapper>
        <main className="space-y-6 ">
          <div className="mb-10">
            <Heading
              icon={BarChart3}
              title="Task Completion Trends"
              subtitle="Progress and performance overview"
              iconBg="bg-indigo-100"
              iconColor="text-indigo-700"
            />
          </div>
          {/* stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Tasks"
              value={stats.total}
              subtitle="All tasks"
              icon={<List size={28} />}
              color="indigo"
            />

            <StatCard
              title="In Progress"
              value={stats["in-progress"]}
              subtitle="Ongoing"
              icon={<Activity size={28} />}
              color="yellow"
            />

            <StatCard
              title="Pending Tasks"
              value={stats.pending}
              subtitle="Not started"
              icon={<Clock size={28} />}
              color="red"
            />

            <StatCard
              title="Completed Tasks"
              value={stats.completed}
              subtitle="Done"
              icon={<CheckCircle size={28} />}
              color="green"
            />
          </div>
          <div className="mt-14">
            <div className="mb-10">
              <Heading
                icon={Clock}
                title="Recent Tasks"
                subtitle="Your latest active tasks"
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />
            </div>
            {loading ? (
              <p className="text-slate-500">Loading tasks...</p>
            ) : recentTasks.length === 0 ? (
              <p className="text-slate-500">No recent tasks found</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
                {recentTasks.map((task) => (
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
        </main>
      </SideComponentWrapper>
    </div>
  );
};

export default Dashboard;
