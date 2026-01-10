import { useState } from 'react';
import initialTodos from '../components/todos/todos';
import EmptyTodo from '../components/todos/EmptyTodo';
import ListTodo from "../components/todos/ListTodo";
import Footer from '../components/layout/Footer';

function Dashboard() {
  const [todoList, setTodoList] = useState(initialTodos);
  const [selectedTasks, setSelectedTasks] = useState([]);

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

  return (
    <section className="relative h-screen pt-20 p-4 flex flex-col">
      {todoList.length === 0 ? (
        <EmptyTodo onSave={addTask} />
      ) : (
        <ListTodo 
          todoList={todoList} 
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
    </section>
  );
}

export default Dashboard;