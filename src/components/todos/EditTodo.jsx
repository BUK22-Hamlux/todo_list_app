import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import LeaveEdit from "../modal/ConfirmLeaveEditModal";

function EditTodo({ todoList, onUpdate,}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = todoList.find((item) => item.id === Number(id));

    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [dueDate, setDueDate] = useState(task?.dueDate || "");
    const [showLeaveModal, setShowLeaveModal] = useState(false)

    const hasUnsavedChanges = 
        title !== task?.title || 
        description !== (task?.description || "") || 
        dueDate !== (task?.dueDate || "");

    const handleBack = () => {
        if (hasUnsavedChanges) {
            setShowLeaveModal(true)
        }
        else{
            navigate(-1);
        }
        
    };

    if (!task) return <div className="p-10 text-center">Task not found!</div>;

    const handleSave = () => {
        if (!title.trim()) return alert("Title is required");

        const updatedTask = {
            ...task,
            title,
            description,
            dueDate
        };

        onUpdate(updatedTask);
        navigate(`/task/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
                <button onClick={handleBack} className="text-blue-600">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="font-bold text-lg text-gray-800">Edit Task</h2>
                <button onClick={handleSave} className="flex items-center gap-1 text-green-600 font-bold">
                    <Save size={18} /> Save
                </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm max-w-4xl mx-auto space-y-6">

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Title</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-2xl font-bold text-gray-900 border-b border-gray-100 focus:border-blue-500 outline-none pb-2"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Due Date</label>
                    <input 
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="p-2 border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-gray-700 text-base leading-relaxed border border-gray-100 rounded-xl p-4 min-h-50 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>
            {showLeaveModal && (
                <LeaveEdit 
                    onCancel={() => setShowLeaveModal(false)}
                    onConfirm={() => navigate(-1)}
                />
            )}
        </div>
    );
}

export default EditTodo;