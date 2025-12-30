import { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import SideComponentWrapper from "../component/SideComponentWrapper";
import TaskForm from "../component/TaskForm";

const CreateTask = () => {
  useEffect(() => {
    document.title = "Create Task | TaskManager";
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 md:justify-end ">
        <Sidebar />

        <SideComponentWrapper>
          <TaskForm />
        </SideComponentWrapper>
      </div>
    </>
  );
};

export default CreateTask;
