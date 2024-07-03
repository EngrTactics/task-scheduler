import { ChevronDown, Repeat } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { cn } from "../lib/utils";
import { Task } from "../types";
import { useDispatch } from "react-redux";
import { openEditModal, openRunTaskModal } from "../redux/modal/modalAction";
import { format } from "date-fns";
import {
  deleteTask,
  updatePendingAndPastTask,
  updateTaskToEdit,
} from "../redux/tasks/tasksAction";
import { setRunningTask } from "../redux/tasks/tasksSlice";
import { useEffect, useState } from "react";

const container = {
  hidden: { height: 0 },
  show: {
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const platformColor = {
  whatsapp: "border-l-green-500",
  telegram: "border-l-blue-500",
  slack: "border-l-red-500",
  email: "border-l-yellow-500",
};
type TaskProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskProps) => {
  const [intervalId, setIntervalId] = useState<number | undefined>();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const dispatch = useDispatch();

  const now = new Date();
  const runTime = new Date(task.runDate.toDateString() + " " + task.runTime);
  const determineMs = (task: Task) => {
    switch (task.repeat.value.value) {
      case "daily":
        return 24 * 60 * 60 * 1000;

      case "weekly":
        return 7 * 24 * 60 * 60 * 1000;

      case "monthly":
        return 30 * 24 * 60 * 60 * 1000;

      case "custom":
        return (task.repeat.value.customValue ?? 1) * 60 * 1000;
    }
  };

  // Calculate the time difference in milliseconds
  const delay = runTime.getTime() - now.getTime();
  useEffect(() => {
    // Schedule the task
    if (delay > 0) {
      let intervalId: number | undefined;

      if (task.repeat.active) {
        // If the task should repeat, use setTimeout to schedule the first run
        setTimeout(() => {
          // Run the task
          dispatch(setRunningTask(task));
          dispatch(openRunTaskModal());
          console.log(`Running task ${task.id}`, determineMs(task));

          // Then use setInterval to schedule the repeating runs
          intervalId = window.setInterval(() => {
            dispatch(setRunningTask(task));
            dispatch(openRunTaskModal());
            console.log(`Running task ${task.id}`, determineMs(task));
          }, determineMs(task));

          setIntervalId(intervalId);
        }, delay);
      }

      setIntervalId(intervalId);
      return () => {
        if (intervalId) {
          window.clearInterval(intervalId);
        }
      };
    }
  }, [task]);
  return (
    <div
      onClick={() => {
        toggleOpen();
      }}
      className="relative z-20 cursor-pointer bg-white"
    >
      <div
        className={cn(
          "flex items-center justify-between border-l-2 p-4",
          platformColor[task.platform],
        )}
      >
        <div className="flex items-center gap-4">
          {/* task time */}
          <div className="font-bold">{task.runTime}</div>
          <Separator orientation="vertical" className="h-5" />
          {/* message title */}
          <div>{task.title}</div>
        </div>
        <div className="flex items-center gap-4">
          {task.repeat.active ? (
            <Repeat size={18} />
          ) : (
            <div className="text-slate-00 flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-800 text-[10px] font-bold">
              1
            </div>
          )}

          <Separator orientation="vertical" className="h-5" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
            className={cn(
              "text-slate-800 transition duration-300 ease-in-out",
              { "rotate-180": isOpen },
            )}
          >
            <ChevronDown />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <Separator className="mx-auto w-[95%]" />
            <div className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="font-bold">Title:</div>
                  <p>{task.title}</p>
                </div>
                <div>
                  <div className="font-bold">Message:</div>
                  <div className="mt-2 rounded-md border p-4">
                    {task.message}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-bold">Platform:</div>
                    <p className="capitalize text-green-900">{task.platform}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-bold">Recipient:</div>
                    <div className="flex max-w-40">
                      <p className="w-full overflow-hidden text-ellipsis text-nowrap">
                        {task && task.recipients && task.recipients.length > 0
                          ? task.recipients.join(", ")
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="mx-auto w-[95%]" />
            <div className="p-4">
              <div className="flex flex-wrap items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="font-bold">Runtime:</div>
                  <p>{format(new Date(runTime), "MMMM do")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold">Repeat:</div>
                  <p className="capitalize">
                    {task.repeat.active ? task.repeat.value.value : "None"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold">Final Date:</div>
                  <p>
                    {task.finalDate ? format(task.finalDate, "MMMM do") : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <Separator className="mx-auto w-[95%]" />
            <div className="flex items-center justify-end gap-5 p-4">
              <button
                onClick={() => {
                  dispatch(updateTaskToEdit(task));
                  dispatch(openEditModal());
                }}
                className="rounded-full bg-slate-800 px-5 py-1.5 text-white hover:bg-slate-900"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  dispatch(deleteTask(task.id));
                  dispatch(updatePendingAndPastTask());
                }}
                className="rounded-full bg-rose-700 px-5 py-1.5 text-white hover:bg-rose-800"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskItem;
