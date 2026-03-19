import { useState } from "react";

function TodoForm({ addTask }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
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

    addTask(trimmedTask, priority);
    setTask("");
    setPriority("Medium");
    setError("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="input-row">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
            className="placeholder"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Add</button>
        </div>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default TodoForm;
