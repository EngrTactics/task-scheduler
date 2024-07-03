import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import { closeExecutedListModal } from "@/redux/modal/modalAction";

const ExecutedTaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => {
    return state.tasks.pastTasks;
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/65 backdrop-blur"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.2 }}
        transition={{ duration: 0.3 }}
        className="max-h-[97%] max-w-[420px] overflow-scroll rounded-md bg-white p-4 md:w-[420px]"
      >
        <div className="my-1 flex items-center justify-between">
          <h1 className="text-base font-bold">Executed Tasks</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeExecutedListModal());
            }}
            className="rounded-full border-2 border-rose-700 px-5 py-1 text-rose-700 hover:border-rose-900 hover:text-rose-900"
          >
            Close
          </button>
        </div>
        <Separator className="mx-auto" />
        {tasks.length > 0 ? (
          <table className="w-full table-auto text-center text-sm">
            <thead>
              <tr>
                <th className="border">Task Title</th>
                <th className="border">Time Executed</th>
                <th className="border">Date Executed</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="border text-left">{task.title}</td>
                  <td className="border">{task.runTime}</td>
                  <td className="border">
                    {new Date(task.runDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="my-10 text-center font-bold">
            You don't have any executed tasks yet
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ExecutedTaskList;
