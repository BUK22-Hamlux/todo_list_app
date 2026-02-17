import { useState, useRef } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


function TodoItem({ id, title, description, isSelectionMode, completed, isSelected, onToggleSelection, onDelete }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const longPressTimer = useRef(null);

  // Desktop hover
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  // Mobile long press
  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      onToggleSelection(); // start selection mode
    }, 500);
  };
  const handleTouchEnd = () => clearTimeout(longPressTimer.current);

  // Open task page only if not in selection mode
  const openTask = () => {
    if (!isSelectionMode) {
      navigate(`/task/${id}`);
    }
  };

  const showActions = isSelectionMode || hover;
  const showCheckbox = isSelectionMode || hover;

  return (
    <div
      className="flex justify-between items-start gap-3 p-4 bg-white rounded-lg shadow-sm cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={openTask}
    >
      <div className="flex items-center gap-4 min-w-0">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelection}
          onClick={(e) => e.stopPropagation()}
          className={`
            mt-1 transition-all duration-200 ease-in-out transform size-4
            ${showCheckbox ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
          `}
        />

        <dl className="flex flex-col min-w-0">
          <dt className={`font-medium line-clamp-2 text-gray-800 transition-all ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>{title}</dt>
          <dd className="text-sm text-gray-500 truncate">{description}</dd>
        </dl>
      </div>

      {showActions && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>


  );
}

export default TodoItem;
