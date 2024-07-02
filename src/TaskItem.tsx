import { ChevronDown, Repeat } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { cn } from "./lib/utils";
import { Task } from "./types";
import { useDispatch } from "react-redux";
import { openEditModal } from "./redux/edit-modal/modalAction";

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
const item = {
  hidden: { height: 0 },
  show: { height: 1 },
};
const platformColor = {
  Whatsapp: "border-l-green-500",
  Telegram: "border-l-blue-500",
  Slack: "border-l-red-500",
  Email: "border-l-yellow-500",
};
type TaskProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const dispatch = useDispatch();

  return (
    <div className="bg-white">
      <div
        className={cn(
          "flex items-center justify-between border-l-2 p-4",
          platformColor[task.platform],
        )}
      >
        <div className="flex items-center gap-4">
          {/* task time */}
          <div className="font-bold">{task.time}</div>
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
            onClick={() => toggleOpen()}
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
                    <p className="text-green-900">{task.platform}</p>
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
                  <div className="font-bold">Run time:</div>
                  <p>May 2, 02:50</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold">Repeat:</div>
                  <p>Every 30 mins</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold">Final Date:</div>
                  <p>30, Jul</p>
                </div>
              </div>
            </div>
            <Separator className="mx-auto w-[95%]" />
            <div className="flex items-center justify-end gap-5 p-4">
              <button
                onClick={() => {
                  dispatch(openEditModal());
                }}
                className="rounded-full bg-slate-800 px-5 py-1.5 text-white hover:bg-slate-900"
              >
                Edit
              </button>
              <button className="rounded-full bg-rose-700 px-5 py-1.5 text-white hover:bg-rose-800">
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
