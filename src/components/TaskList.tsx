import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchTasks, setFilter } from "../redux/taskSlice";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error, filter, loading, tasks } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  return (
    <div className="container">
      <div className="d-flex justify-content-center gap-2 my-3">
        <button
          className="btn btn-secondary"
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </button>
        <button
          className="btn btn-warning"
          onClick={() => dispatch(setFilter("pending"))}
        >
          Pending
        </button>
        <button
          className="btn btn-success"
          onClick={() => dispatch(setFilter("completed"))}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <img
            alt="Loading..."
            src="https://acegif.com/wp-content/uploads/loading-1.gif"
          />
        </div>
      ) : (
        <>
          {error && <p className="text-center text-danger">Error: {error}</p>}
          <div className="mx-auto" style={{ maxWidth: "500px" }}>
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} {...task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
