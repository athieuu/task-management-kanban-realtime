import { useDraggable } from "@dnd-kit/core";
import { GripIcon, TrashIcon, CalendarIcon } from "./Icons";

function getRelativeTime(dateString) {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function getPriority(id) {
  if (!id) return "medium";
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const priorities = ["low", "medium", "high"];
  return priorities[hash % 3];
}

export default function TaskCard({ task, boardId, columnName, onDelete, style }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
  });

  const dragStyle = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        ...style,
      }
    : style;

  const priority = getPriority(task._id);

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      className={`task-card ${isDragging ? "dragging" : ""}`}
    >
      {/* Priority indicator */}
      <div className={`task-card-priority task-card-priority--${priority}`} />

      {/* Header */}
      <div className="task-card-header">
        <p className="task-card-title">{task.title}</p>
        <div
          className="task-card-grip"
          {...listeners}
          {...attributes}
          aria-label="Drag handle"
        >
          <GripIcon size={14} />
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}

      {/* Footer */}
      <div className="task-card-footer">
        <span className="task-card-date">
          <CalendarIcon size={12} />
          {getRelativeTime(task.createdAt)}
        </span>

        <div className="task-card-actions">
          <button
            className="task-card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(boardId, columnName, task._id);
            }}
            aria-label="Delete task"
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
