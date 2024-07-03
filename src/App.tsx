import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { AnimatePresence } from "framer-motion";
import AddTask from "./components/AddTask";
import { PlusCircle } from "lucide-react";
import { openAddModal, openExecutedListModal } from "./redux/modal/modalAction";
import TaskRunModal from "./components/TaskRunModal";
import ExecutedTaskList from "./components/ExecutedTaskList";

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
  const isExecutedListOpen = useSelector((state: RootState) => {
    return state.modal.isExecutedListOpen;
  });
  const runningTask = useSelector((state: RootState) => {
    return state.tasks.runningTask;
  });
  const taskToEdit = useSelector((state: RootState) => {
    return state.tasks.taskToEdit;
  });

  return (
    <main className="bg-[F8FAFC] text-[#2c2e2e]">
      <section className="container mx-auto min-h-screen p-5 md:w-[550px]">
        <h1 className="text-center text-3xl font-bold capitalize">
          Message Scheduler
        </h1>
        <div className="mt-10">
          <div className="flex items-baseline justify-between">
            <button
              onClick={() => {
                dispatch(openExecutedListModal());
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              View Executed Tasks List
            </button>
            <button
              onClick={() => {
                dispatch(openAddModal());
              }}
              className="flex items-center gap-2 rounded-full bg-blue-500 py-2 pl-3 pr-5 font-bold text-white hover:bg-blue-900"
            >
              <PlusCircle /> <span>Add Task</span>
            </button>
          </div>

          <TaskList />
          <AnimatePresence mode="wait">
            {isEditModalOpen && taskToEdit && <EditTask task={taskToEdit} />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isAddModalOpen && <AddTask />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isRunTaskOpen && runningTask && (
              <TaskRunModal task={runningTask} />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isExecutedListOpen && <ExecutedTaskList />}
          </AnimatePresence>
        </div>
        {/* </div> */}
      </section>
    </main>
  );
}

export default App;
