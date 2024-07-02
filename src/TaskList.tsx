import { Plus } from "lucide-react";
import TaskItem from "./TaskItem";
import { Separator } from "./components/ui/separator";
// import { tasks } from "./data/data";
import React, { Fragment, useEffect } from "react";
import { loadTasks } from "./redux/tasks/tasksAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => {
    return state.tasks.tasks;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
    console.log(tasks);
  }, []);
  return (
    <div className="flex flex-col">
      {tasks.map((task, idx) => (
        <React.Fragment key={idx}>
          <TaskItem task={task} />
          {idx < tasks.length - 1 ? <Separator /> : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TaskList;
