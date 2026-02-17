import { useState } from 'react';
import EmptyTodo from '../components/todos/EmptyTodo';
import ListTodo from "../components/todos/ListTodo";
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import SortFilterModal from '../components/modal/SortFilterModal';

function Dashboard({todoList, setTodoList, filterStatus, setFilterStatus, sortBy, setSortBy, isDarkMode, toggleTheme}) {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addTask = (newTodo) => setTodoList([newTodo, ...todoList]);

  const deleteTasks = (idsToDelete) => {
    setTodoList(prev => prev.filter(todo => !idsToDelete.includes(todo.id)));
    setSelectedTasks(prev => prev.filter(id => !idsToDelete.includes(id)));
  };

  const toggleTaskSelection = (id) => {
    setSelectedTasks(prev =>
      prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
    );
  };

  const displayedTasks = [...todoList]
    .filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (filterStatus === "Active") matchesStatus = !task.completed;
      if (filterStatus === "Completed") matchesStatus = task.completed;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "Alphabetical") return a.title.localeCompare(b.title);
      if (sortBy === "Creation Date") return b.id - a.id;
      if (sortBy === "Due Date") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  return (
    <section className="relative h-screen flex flex-col">
      <Header 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenFilter={() => setShowSortModal(true)} 
      />
      
      {todoList.length === 0 ? (
        <EmptyTodo onSave={addTask} />
      ) : (
        <ListTodo 
          todoList={displayedTasks}
          onSave={addTask} 
          selectedTasks={selectedTasks}
          toggleTaskSelection={toggleTaskSelection}
          onDeleteTasks={deleteTasks}
        />
      )}
      
      <Footer 
        selectedCount={selectedTasks.length} 
        onClear={() => setSelectedTasks([])}
        onDelete={() => deleteTasks(selectedTasks)}
      />

      {showSortModal && (
        <SortFilterModal 
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onClose={() => setShowSortModal(false)}
        />
      )}
    </section>
  );
}

export default Dashboard;