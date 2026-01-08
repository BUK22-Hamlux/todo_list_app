import { useState } from "react";
import { Plus } from 'lucide-react';
import initialTodos from "../components/todos/todos";
import TodoItem from "../components/todos/TodoItem";
import CreateTodo from "../components/todos/CreateTodo";
import DeleteModal from "../components/todos/DeleteModal";



function Dashboard() {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [todoList, setTodoList] = useState(initialTodos);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const confirmSingleDelete = (id) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteSelectedTasks = () => {
    setTodoList((prev) =>
      prev.filter((todo) => !selectedTasks.includes(todo.id))
    );
    setSelectedTasks([]);
    setShowDeleteModal(false);
  };


  const deleteSingleTask = () => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== taskToDelete));
    setSelectedTasks((prev) => prev.filter((id) => id !== taskToDelete));
    setTaskToDelete(null);
    setShowDeleteModal(false);
  };  


  const addTask = (newTodo) => {
    setTodoList([newTodo, ...todoList]);
    setIsFormOpen(false);
  };
  // callback for TodoItem
  const toggleTaskSelection = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  // if nothing selected, exit selection mode
  const selectionMode = selectedTasks.length > 0;

  const listIsEmpty = todoList.length === 0;

  return (
    <section className="relative h-screen pt-20 p-4 flex flex-col">
      {listIsEmpty ? (

        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-2">No tasks added yet!</h2>
            <p className="text-gray-500 mb-8">
              Get productive! Tap the button below to add your first task to the
              list.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto shadow-lg active:scale-95 transition-transform"
            >
              + Create New Task
            </button>
            {isFormOpen && (
            <CreateTodo onSave={addTask} onClose={() => setIsFormOpen(false)} />
          )}
          </div>
        </div>

      ) : (

        <div className="h-screen w-full overflow-y-auto">
          <div className="flex-1 overflow-y-auto my-4 rounded-xl p-4 flex flex-col gap-4">
            {todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                isSelectionMode={selectionMode}
                isSelected={selectedTasks.includes(todo.id)}
                onToggleSelection={() => toggleTaskSelection(todo.id)}
                onDelete={() => confirmSingleDelete(todo.id)}
              />
            ))}
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="fixed bg-green-500 p-3 rounded-full bottom-30 right-15"
          >
            <Plus className="text-white w-8 h-8" />
          </button>

          {isFormOpen && (
            <CreateTodo onSave={addTask} onClose={() => setIsFormOpen(false)} />
          )}

          {showDeleteModal && (
            <DeleteModal
              message={
                selectedTasks.length > 1
                  ? `Delete ${selectedTasks.length} selected tasks?`
                  : "Are you sure you want to delete this task?"
              }
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={
                selectedTasks.length > 1
                  ? deleteSelectedTasks
                  : deleteSingleTask
              }
            />
          )}
        </div>

      )}
      
      <footer className="sticky bottom-0 flex justify-between p-4 bg-white border-t border-gray-200">
        <p>
          <span>{selectedTasks.length}</span> tasks selected
        </p>
        <button
          className="text-blue-500"
          onClick={() => {
            setSelectedTasks([]);
          }}
        >
          clear selection
        </button>

        {selectionMode && (
          <button
            className="text-red-500"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete selected
          </button>
        )}

      </footer>
    </section>
  );
}

export default Dashboard;
