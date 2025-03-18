import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteTask, toggleComplete } from "../redux/taskSlice";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, completed, title }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="card shadow-sm mb-2">
      <div className="card-body d-flex align-items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleComplete(id))}
          className="form-check-input me-2"
        />
        <span
          className={`flex-grow-1 ${
            completed ? "text-decoration-line-through text-muted" : ""
          }`}
        >
          {title}
        </span>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => dispatch(deleteTask(id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
