import { useState, useRef } from "react";
import { Trash2 } from "lucide-react";


function TodoItem({ id, title, description, isSelectionMode, isSelected, onToggleSelection, onDelete }) {
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
      console.log(`Open task ${id}`);
      // navigate(`/tasks/${id}`)
    }
  };

  const showActions = isSelectionMode || hover;
  const showCheckbox = isSelectionMode || hover;

  return (
    <div
      className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={openTask}
    >
      {/* ALWAYS render the checkbox, just change its opacity/translate */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelection}
        onClick={(e) => e.stopPropagation()}
        className={`
          mt-1
          transition-all duration-200 ease-in-out transform
          ${showCheckbox ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
        `}
      />

      <dl className="flex flex-col">
        <dt className="font-medium text-gray-800">{title}</dt>
        <dd className="text-sm text-gray-500">{description}</dd>
      </dl>

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
