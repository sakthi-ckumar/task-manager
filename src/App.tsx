import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-3">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
