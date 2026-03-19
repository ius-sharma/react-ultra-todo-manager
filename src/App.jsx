import ProgressBar from "./ProgressBar";
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("todos");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [tasks]);

  const addTask = (newTask, priority = "Medium") => {
    const taskObject = {
      id: Date.now(),
      text: newTask,
      priority: priority,
      completed: false,
    };

    setTasks([...tasks, taskObject]);
  };

  const deleteTask = (idToDelete) => {
    const updatedTasks = tasks.filter((task) => task.id !== idToDelete);
    setTasks(updatedTasks);
  };

  const toggleComplete = (idToToggle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === idToToggle) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const editTask = (idToEdit, newText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === idToEdit && newText.trim()) {
        return {
          ...task,
          text: newText.trim(),
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Filter and search logic (doesn't modify original array)
  const getFilteredTodos = () => {
    let filtered = tasks;

    // Apply status filter
    if (filterStatus === "Completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (filterStatus === "Pending") {
      filtered = filtered.filter((task) => !task.completed);
    }

    // Apply search filter (case insensitive)
    if (searchTerm.trim()) {
      filtered = filtered.filter((task) =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1 className="app-title">Todo Manager</h1>
        <p className="app-subtitle">Organize your tasks efficiently</p>
      </header>

      {/* Form Section */}
      <section className="form-section">
        <TodoForm addTask={addTask} />
      </section>

      {/* Progress Section */}
      <section className="progress-section">
        <ProgressBar tasks={tasks} />
      </section>

      {/* Search and Filter Section */}
      <section className="search-filter-section">
        <div className="search-wrapper">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search todos..."
            className="search-input"
          />
        </div>

        <div className="filter-wrapper">
          <span className="filter-label">Filter by status:</span>
          <div className="filter-buttons">
            {["All", "Completed", "Pending"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`filter-btn ${filterStatus === status ? "active" : ""}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            {searchTerm || filterStatus !== "All" ? (
              <>
                <div className="empty-state-icon">🔍</div>
                <h2 className="empty-state-title">No matches found</h2>
                <p className="empty-state-subtitle">
                  Try adjusting your search or filter criteria
                </p>
              </>
            ) : (
              <>
                <div className="empty-state-icon">🚀</div>
                <h2 className="empty-state-title">No tasks yet</h2>
                <p className="empty-state-subtitle">
                  Start by adding your first task above to begin your journey!
                </p>
              </>
            )}
          </div>
        ) : (
          <TodoList
            tasks={filteredTodos}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            editTask={editTask}
          />
        )}
      </section>
    </div>
  );
}

export default App;
