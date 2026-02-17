import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TaskDetail from './components/todos/TaskDetail';
import EditTodo from './components/todos/EditTodo';
import { useState, useEffect } from 'react';
import initialTodos from './components/todos/todos';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [todoList, setTodoList] = useState(() => {
    const savedTasks = localStorage.getItem("task_app_data");
    return savedTasks ? JSON.parse(savedTasks) : initialTodos;
  });
  
  const [filterStatus, setFilterStatus] = useState(() => {
    return localStorage.getItem("task_filter_status") || "All";
  });

  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("task_sort_by") || "Creation Date";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // 2. Use useEffect to save the list automatically whenever it changes
  useEffect(() => {
    // We convert the array to a string because LocalStorage only stores text
    localStorage.setItem("task_app_data", JSON.stringify(todoList));
  }, [todoList]); // Only runs when todoList is updated

  useEffect(() => {
    localStorage.setItem("task_filter_status", filterStatus);
    localStorage.setItem("task_sort_by", sortBy);
  }, [filterStatus, sortBy]);

  const updateTask = (updatedTask) => {
    setTodoList(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const toggleComplete = (id) => {
    setTodoList(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard
                 todoList={todoList} 
                 setTodoList={setTodoList}
                 isDarkMode={isDarkMode}
                 toggleTheme={toggleTheme}
                 filterStatus={filterStatus}
                 setFilterStatus={setFilterStatus}
                 sortBy={sortBy}
                 setSortBy={setSortBy} />} />
          <Route path="/task/:id" element={<TaskDetail todoList={todoList} onToggleComplete={toggleComplete} />} />
          <Route path="/task/:id/edit" element={<EditTodo todoList={todoList} onUpdate={updateTask} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;