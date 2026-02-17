import { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodo from "../modal/CreateTodoModal";
import DeleteModal from "../modal/DeleteModal";
import { Plus } from 'lucide-react';

function ListTodo({ todoList, onSave, selectedTasks, toggleTaskSelection, onDeleteTasks }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const selectionMode = selectedTasks.length > 0;

    const confirmSingleDelete = (id) => {
        setTaskToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirm = () => {
        if (taskToDelete) {
            onDeleteTasks([taskToDelete]);
            setTaskToDelete(null);
        } else {
            onDeleteTasks(selectedTasks);
        }
        setShowDeleteModal(false);
    };

    return (
        <div className="flex-1 overflow-hidden flex flex-col pt-16">
            <div className="overflow-y-auto inset my-4 rounded-xl p-4 flex flex-col gap-4">
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
                title="Add task"
                className="fixed bg-green-500 p-3 rounded-full bottom-24 right-8 shadow-lg"
            >
                <Plus className="text-white w-8 h-8" />
            </button>

            {isFormOpen &&
            <CreateTodo 
                onSave={(todo) => {
                    onSave(todo);
                    setIsFormOpen(false);
                }} 
                onClose={() => setIsFormOpen(false)}
            />
            }

            {showDeleteModal && (
                <DeleteModal
                    message="Are you sure you want to delete?"
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    );
}

export default ListTodo;