import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { PlusIcon, MoreHorizontalIcon } from "./Icons";
import TaskCard from "./TaskCard";

const COLUMN_STYLES = {
  "Todo": "column--todo",
  "In Progress": "column--inprogress",
  "Done": "column--done",
  // fallbacks
  "todo": "column--todo",
  "inprogress": "column--inprogress",
  "done": "column--done",
};

export default function Column({
  column,
  boardId,
  onDeleteTask,
  onCreateTask,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isOver, setIsOver] = useState(false);

  const { setNodeRef, isOver: dndIsOver } = useDroppable({
    id: column.name,
  });

  const columnStyleClass = COLUMN_STYLES[column.name] || "column--todo";
  const tasks = column.tasks || [];

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    onCreateTask(boardId, column.name, newTaskTitle.trim());
    setNewTaskTitle("");
    setIsAdding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewTaskTitle("");
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`column ${columnStyleClass} ${dndIsOver ? "drag-over" : ""}`}
    >
      {/* Column Header */}
      <div className="column-header">
        <div className="column-title-group">
          <h3 className="column-title">{column.name}</h3>
          <span className="column-count">{tasks.length}</span>
        </div>
        <button className="column-menu-btn" aria-label="Column menu">
          <MoreHorizontalIcon size={16} />
        </button>
      </div>

      {/* Column Body — Tasks */}
      <div className="column-body">
        {tasks.map((task, index) => (
          <TaskCard
            key={task._id}
            task={task}
            boardId={boardId}
            columnName={column.name}
            onDelete={onDeleteTask}
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>

      {/* Column Footer — Add Task */}
      <div className="column-footer">
        {isAdding ? (
          <div className="inline-add-task">
            <input
              type="text"
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className="inline-add-task-actions">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setIsAdding(false);
                  setNewTaskTitle("");
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddTask}>
                Add
              </button>
            </div>
          </div>
        ) : (
          <button
            className="add-task-btn"
            onClick={() => setIsAdding(true)}
          >
            <PlusIcon size={16} />
            Add task
          </button>
        )}
      </div>
    </div>
  );
}
