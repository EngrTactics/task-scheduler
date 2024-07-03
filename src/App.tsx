import EditTask from "./EditTask";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { AnimatePresence } from "framer-motion";
import AddTask from "./AddTask";
import { Plus, PlusCircle } from "lucide-react";
import { addTask } from "./redux/tasks/tasksAction";
import { openAddModal } from "./redux/modal/modalAction";
import TaskRunModal from "./TaskRunModal";

function App() {
  const dispatch = useDispatch();
  const isEditModalOpen = useSelector((state: RootState) => {
    return state.modal.isEditModalOpen;
  });
  const isAddModalOpen = useSelector((state: RootState) => {
    return state.modal.isAddModalOpen;
  });
  const isRunTaskOpen = useSelector((state: RootState) => {
    return state.modal.isRunTaskOpen;
  });
  const runningTask = useSelector((state: RootState) => {
    return state.tasks.runningTask;
  });

  return (
    <main className="bg-[F8FAFC] text-[#2c2e2e]">
      <section className="container mx-auto min-h-screen w-[550px] p-5">
        <h1 className="text-center text-3xl font-bold capitalize">
          Message Scheduler
        </h1>
        <div className="mt-10">
          <div className="flex justify-end">
            <button
              onClick={() => {
                dispatch(openAddModal());
              }}
              className="flex items-center gap-2 rounded-full bg-blue-500 py-2 pl-3 pr-5 font-bold text-white hover:bg-blue-900"
            >
              <PlusCircle /> <span>Add Task</span>
            </button>
          </div>
          {/* <div className="mt-2 overflow-hidden rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"> */}
          <TaskList />
          <AnimatePresence mode="wait">
            {isEditModalOpen && <EditTask />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isAddModalOpen && <AddTask />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isRunTaskOpen && runningTask && (
              <TaskRunModal task={runningTask} />
            )}
          </AnimatePresence>
        </div>
        {/* </div> */}
      </section>
    </main>
  );
}

export default App;
