import {
  ArrowRight,
  CheckCircle,
  ListTodo,
  BarChart3,
  Clock,
  CheckSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import taskAnimation from "../assets/task management.json";
import { useEffect } from "react";
import Button from "../atom/Button";
import Heading from "../atom/Heading";

const Home = () => {
   useEffect(()=>{
       document.title = "Home | TaskManager";
    },[])
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900">
      <header className="">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center gap-2 mb-3 md:mb-0">
            <div className="p-2.5 rounded-xl bg-indigo-100 flex shadow-inner items-center justify-center">
              <CheckSquare className="text-indigo-600 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h1 className="text-lg md:text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>

          {/* auth Buttons */}
          <div className="flex gap-3 h-min">
            <div className="min-w-fit">
              <Button
                text="Login"
                variant="outline"
                to="/login"
                className="hidden sm:flex w-auto px-5"
              />
            </div>
            <div className="min-w-fit">
              <Button
                text="Get Started"
                icon={ArrowRight}
                to="/register"
                className="hidden sm:flex w-auto px-5"
              />
            </div>
          </div>
        </div>
      </header>

      {/* HERO  */}
      <section className="min-h-[70vh] flex items-center px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className="space-y-4 text-center md:text-left">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-indigo-100 text-xs md:text-sm font-medium text-indigo-700"
            >
              <CheckCircle size={16} className="text-green-500" />
              Simple • Fast • Productive
            </div>

            <h1 className="text-3xl md:text-6xl font-semibold leading-tight">
              Organize Your Work. <br />
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Stay Focused & Get More Done
              </span>
            </h1>

            <p className="text-slate-600 text-sm md:text-lg max-w-xl mx-auto md:mx-0">
              A modern task management platform to plan, track, and complete
              your work efficiently — without distractions.
            </p>

            <div className="flex justify-center md:justify-start items-center md:items-start gap-4 pt-2">
              <div className="min-w-fit">
                <Button
                  text="Create Free Account"
                  icon={ArrowRight}
                  to="/register"
                  className="md:px-10 w-min min-w-fit md:py-3 text-sm md:text-lg shadow-xl shadow-indigo-500/30 hover:scale-[1.02] hover:shadow-indigo-500/40 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Animation */}
          <div className="flex justify-center h-min md:h-full">
            <Lottie
              animationData={taskAnimation}
              loop
              className="w-[800px] h-fit"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <div className="w-full flex justify-center items-center">
        <section className="max-w-7xl py-24 ">
          <div className=" mx-auto text-center">
            <Heading
              icon={ListTodo}
              title="Stay Productive"
              subtitle="Simple. Organized. Effective."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mt-8 md:mt-12 px-5 md:px-0">
              <Feature icon={<ListTodo />} title="Task Management" />
              <Feature icon={<BarChart3 />} title="Progress Tracking" />
              <Feature icon={<Clock />} title="Deadline Awareness" />
            </div>
          </div>
        </section>
      </div>

      {/* CTA*/}
      <CTA />

      <footer className="py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Task Manager. Built for productivity.
      </footer>
    </div>
  );
};

const CTA = () => {
  return (
    <section className="relative py-10 pt-0 md:py-20 px-6 overflow-hidden text-center">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-100 via-blue-50 to-sky-100" />

      <div
        className="absolute -z-10 top-1/3 left-1/2 -translate-x-1/2
        w-[700px] h-[700px] bg-indigo-400/25 rounded-full blur-[200px]"
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <p className="uppercase tracking-widest text-indigo-600 text-sm font-semibold mb-4">
          Get started today
        </p>

        <h2 className="text-2xl md:text-5xl font-semibold md:font-bold leading-tight mb-3">
          Build better focus.{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Get more done.
          </span>
        </h2>

        <p className="text-slate-600 text-sm md:text-lg mb-5">
          Organize tasks, track progress, and stay in control — without clutter
          or complexity.
        </p>

        <Button
          text="Create Your Free Account"
          icon={ArrowRight}
          to="/register"
          className="md:px-10 w-min min-w-fit md:py-3 text-sm md:text-lg shadow-xl shadow-indigo-500/30 hover:scale-[1.02] hover:shadow-indigo-500/40 transition-all duration-300"
        />
      </div>
    </section>
  );
};

const Feature = ({ icon, title }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-left">
    <div
      className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600
      flex items-center justify-center mb-4"
    >
      {icon}
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-slate-600 text-sm">
      Simple, intuitive, and designed for real productivity.
    </p>
  </div>
);

export default Home;
