import { useState } from "react";

function TodoItem({ task, deleteTask, toggleComplete, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSaveEdit = () => {
    editTask(task.id, editedText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case "High":
        return "priority-high";
      case "Low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  return (
    <li className={getPriorityClass()}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />

      <div className="task-content">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="edit-input"
          />
        ) : (
          <>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <span className={`priority-badge ${getPriorityClass()}`}>
              {task.priority}
            </span>
          </>
        )}
      </div>

      {isEditing ? (
        <>
          <button onClick={handleSaveEdit} className="save-btn">
            Save
          </button>
          <button onClick={handleCancelEdit} className="cancel-btn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
