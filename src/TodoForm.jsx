import { useState } from "react";

function TodoForm({ addTask }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTask = task.trim();

    if (trimmedTask === "") {
      setError("Task cannot be empty");
      return;
    }

    if (trimmedTask.length < 3) {
      setError("Task must be at least 3 characters");
      return;
    }

    addTask(trimmedTask);
    setTask("");
    setError("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="input-row">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          className="placeholder"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default TodoForm;
