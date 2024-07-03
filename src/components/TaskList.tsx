import TaskItem from "./TaskItem";
import { Separator } from "./ui/separator";
import { groupBy } from "lodash";

import React, { useEffect } from "react";
import {
  loadTasks,
  updatePendingAndPastTask,
} from "../redux/tasks/tasksAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { format } from "date-fns";
import noTask from "@/assets/emptyList.svg";
import { PlusCircle } from "lucide-react";
import { openAddModal } from "../redux/modal/modalAction";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => {
    return state.tasks.pendingTasks;
  });
  const dispatch = useDispatch();

  const sortedTasks = [...tasks].sort((a, b) => {
    // Compare by runDate
    const dateComparison = a.runDate.getTime() - b.runDate.getTime();
    if (dateComparison !== 0) return dateComparison;

    // If runDates are equal, compare by runTime
    return (
      new Date(`1970-01-01T${a.runTime}Z`).getTime() -
      new Date(`1970-01-01T${b.runTime}Z`).getTime()
    );
  });

  const tasksByDate = groupBy(sortedTasks, (task: any) =>
    task.runDate.toDateString(),
  );

  useEffect(() => {
    dispatch(loadTasks());
    dispatch(updatePendingAndPastTask());
    console.log(tasks);
  }, [dispatch]);
  return (
    <div className="flex flex-col bg-white">
      {/* Task list haading */}
      <div
        className={
          "my-4 flex items-center justify-between rounded-md border-l-2 px-4 py-2 font-bold shadow-custom"
        }
      >
        <div className="flex items-center gap-4">
          {/* task time */}
          <div className="">Time</div>
          <Separator orientation="vertical" className="h-5" />
          {/* message title */}
          <div>Task Title</div>
        </div>
        <div className="flex items-center gap-4">Repeat?</div>
      </div>

      {sortedTasks.length > 0 ? (
        Object.entries(tasksByDate).map(([date, tasks]) => (
          <React.Fragment key={date}>
            <div className="mt-2 px-2 py-2 font-bold">
              {format(new Date(date), "MMMM do")}
            </div>
            <div
              className={"overflow-hidden rounded-md bg-white shadow-custom"}
            >
              {tasks
                .sort(
                  (a, b) =>
                    new Date(`1970-01-01T${a.runTime}Z`).getTime() -
                    new Date(`1970-01-01T${b.runTime}Z`).getTime(),
                )
                .map((task, idx) => (
                  <React.Fragment key={idx}>
                    <TaskItem task={task} />
                    {idx < tasks.length - 1 && (
                      <Separator className="w-[95%]" />
                    )}
                  </React.Fragment>
                ))}
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <img src={noTask} className="w-32" alt="" />
          <p className="mt-5 text-center font-bold">
            You don't have any pending task,
            <br /> click "Add Task" to get started
          </p>
          <button
            onClick={() => {
              dispatch(openAddModal());
            }}
            className="mt-5 flex items-center gap-2 rounded-full bg-blue-500 py-2 pl-3 pr-5 font-bold text-white hover:bg-blue-900"
          >
            <PlusCircle /> <span>Add Task</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
