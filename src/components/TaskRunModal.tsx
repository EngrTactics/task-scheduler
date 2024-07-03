import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Task } from "../types";
import { useEffect, useState } from "react";
import { closeRunTaskModal } from "../redux/modal/modalAction";
import { useDispatch } from "react-redux";
import success from "@/assets/taskSuccesful.svg";
import Throbber from "./ui/throbber";
import { updatePendingAndPastTask } from "@/redux/tasks/tasksAction";

const TaskRunModal = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [executionTime, setExecutionTime] = useState<string>();

  // Generate a random number of seconds between 1 and 10 to simulate an async operation
  const randomSeconds = Math.floor(Math.random() * 10) + 1;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!task.repeat.active) {
        dispatch(updatePendingAndPastTask());
      }
    }, randomSeconds * 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const now = new Date();
    setExecutionTime(now.toLocaleTimeString());
  }, [isLoading]);
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
        className="max-h-[97%] w-[400px] overflow-scroll rounded-md bg-white p-4 text-center"
      >
        <h1 className="mb-1 font-bold">
          {isLoading ? (
            <span>Task Running ...</span>
          ) : (
            <span>Task Ran Succesfully</span>
          )}
        </h1>
        <Separator className="mx-auto" />
        <div className="mx-auto w-32 py-5">
          <img src={success} alt="" />
        </div>
        <p className="mt-4">
          {" "}
          {isLoading ? <span>Sending</span> : <span>Sent</span>}{" "}
          <span className="font-bold">{task.title}</span> to
          {task.recipients.join()} via{" "}
          <span className="capitalize">{task.platform}</span>
        </p>
        {!isLoading && (
          <div className="mt-4 flex items-center justify-between text-xs">
            <span>message sent at {executionTime}</span>
            <span>Run time : {randomSeconds}s</span>
          </div>
        )}
        <Separator className="mx-auto mb-2 mt-2" />
        <div>
          <button
            type="submit"
            onClick={() => {
              dispatch(closeRunTaskModal());
            }}
            className="mx-auto w-full rounded-full border-2 border-slate-800 bg-slate-800 px-5 py-2.5 text-white hover:bg-slate-900"
          >
            {isLoading ? <Throbber /> : "Okay"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskRunModal;
