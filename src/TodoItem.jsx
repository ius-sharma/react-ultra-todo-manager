function TodoItem({ task, index, deleteTask, toggleComplete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(index)}
      />

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>

      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  );
}

export default TodoItem;
