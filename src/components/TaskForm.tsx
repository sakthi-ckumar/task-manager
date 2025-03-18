import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addTask, fetchTasks } from "../redux/taskSlice";
import { useState } from "react";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-cente mb-3">
      <input
        type="text"
        placeholder="Add a task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control w-50 me-2"
      />
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
