import { Plus } from "lucide-react";
import TaskItem from "./TaskItem";
import { Separator } from "./components/ui/separator";
import { groupBy } from "lodash";
// import { tasks } from "./data/data";
import React, { Fragment, useEffect } from "react";
import { loadTasks } from "./redux/tasks/tasksAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { format } from "date-fns";
import { cn } from "./lib/utils";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => {
    return state.tasks.tasks;
  });
  const dispatch = useDispatch();

  const sortedTasks = [...tasks].sort((a, b) => {
    // Compare by runDate
    const dateComparison =
      new Date(a.runDate).getTime() - new Date(b.runDate).getTime();
    if (dateComparison !== 0) return dateComparison;

    // If runDates are equal, compare by runTime
    return (
      new Date(`1970-01-01T${a.runTime}Z`).getTime() -
      new Date(`1970-01-01T${b.runTime}Z`).getTime()
    );
  });

  const tasksByDate = groupBy(sortedTasks, (task: any) =>
    new Date(task.runDate).toDateString(),
  );

  useEffect(() => {
    dispatch(loadTasks());
    console.log(tasks);
  }, []);
  return (
    <div className="flex flex-col bg-white">
      {Object.entries(tasksByDate).map(([date, tasks], idx, arr) => (
        <React.Fragment key={date}>
          <div className="mt-2 px-2 py-2 font-bold">
            {format(new Date(date), "MMMM do")}
          </div>
          <div
            className={
              "overflow-hidden rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            }
          >
            {tasks
              .sort(
                (a, b) =>
                  new Date(`1970-01-01T${a.time}Z`).getTime() -
                  new Date(`1970-01-01T${b.time}Z`).getTime(),
              )
              .map((task, idx) => (
                <React.Fragment key={idx}>
                  <TaskItem task={task} />
                  {idx < arr.length - 1 && <hr />}
                </React.Fragment>
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TaskList;
