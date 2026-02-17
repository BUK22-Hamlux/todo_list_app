import { useState } from "react";
import CreateTodo from "../modal/CreateTodoModal";
import { UNSAFE_invariant } from "react-router-dom";

function EmptyTodo({ onSave }){

    const [isFormOpen, setIsFormOpen] = useState(false);
  
    return (
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
            <CreateTodo 
                onSave={(todo) => {
                    onSave(todo);
                    setIsFormOpen(false);
                }} 
                onClose={() => setIsFormOpen(false)} 
            />
          )}
          </div>
        </div>
    )
}

export default EmptyTodo;