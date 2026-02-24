import ProgressBar from "./ProgressBar";
import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    const taskObject = {
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, taskObject]);
  };

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  const toggleComplete = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === indexToToggle) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo Manager</h1>

      <TodoForm addTask={addTask} />

      <ProgressBar tasks={tasks} />

      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
