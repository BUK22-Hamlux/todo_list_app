import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CalendarCheck, AlignLeft } from "lucide-react";

function TaskDetail({ todoList, onToggleComplete }) {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // Find the specific task using the ID from the URL
    const task = todoList.find((item) => item.id === Number(id));

  if (!task) return <div className="p-10 text-center">Task not found!</div>;

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-8 mx-auto max-w-4xl">
            <button 
                onClick={() => navigate("/")} 
                className=" text-blue-600"
            >
                <ArrowLeft size={20} />
            </button>

            <h2 className="font-bold text-lg">Task Detail</h2>

            <button
                onClick={() => navigate(`/task/${id}/edit`)}
                className="text-blue-600 font-semibold">Edit</button>
        </div>
      

        <div className="bg-white rounded-3xl p-8 shadow-sm max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
            
          </div>
          
          <div className="flex flex-col text-xs">
              <div className="flex items-center gap-2">
                  <Calendar className="text-gray-600" size={12} />
                  <div>
                  <p className=" text-gray-500 tracking-wider">Created {new Date(task.id).toLocaleDateString()}</p>
                  
                  </div>
              </div>
              <div className="flex items-center text-blue-500 gap-2 mb-6">
                  <CalendarCheck size={12} />
                  <div>
                  <p className=" tracking-wider"> {task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString()}`: "No due date set"}</p>
                  
                  </div>
              </div>
          </div>
              
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 ">
              <AlignLeft className="text-gray-400" size={12} />
              <div className="">
                <h3 className="text-sm underline font-semibold text-gray-600 tracking-wider mb-2">Description</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {task.description || "No description provided."}
                </p>
              </div>
            </div>  
          </div>
          
        </div>
        <button
            onClick={() => onToggleComplete(task.id)}
            className={`px-4 py-4 absolute bottom-5 left-6 right-6 max-w-4xl mx-auto rounded-xl text-xs font-bold transition-all ${
              task.completed 
                ? "bg-green-100 text-green-600 border border-green-200" 
                : "bg-blue-600 text-white shadow-md hover:bg-blue-700"
            }`}
          >
            {task.completed ? "✓ Completed" : "Mark as Done"}
          </button>
    </div>
  );
}

export default TaskDetail;