import { useState, useEffect, useCallback } from "react";
import { CloseIcon, PlusIcon } from "./Icons";

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
  columns = [],
  defaultColumn = "",
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [columnName, setColumnName] = useState(defaultColumn);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setColumnName(defaultColumn || columns[0] || "");
    }
  }, [isOpen, defaultColumn, columns]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      columnName,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="create-task-title">
        {/* Header */}
        <div className="modal-header">
          <h2 id="create-task-title" className="modal-title">Create New Task</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-title">
                Task Title
              </label>
              <input
                id="task-title"
                type="text"
                className="form-input"
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="task-description">
                Description
              </label>
              <textarea
                id="task-description"
                className="form-input form-textarea"
                placeholder="Add a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Priority */}
            <div className="form-group">
              <span className="form-label">Priority</span>
              <div className="priority-selector">
                <button
                  type="button"
                  className={`priority-option priority--low ${priority === "low" ? "selected" : ""}`}
                  onClick={() => setPriority("low")}
                >
                  <span className="priority-dot priority-dot--low" />
                  Low
                </button>
                <button
                  type="button"
                  className={`priority-option priority--medium ${priority === "medium" ? "selected" : ""}`}
                  onClick={() => setPriority("medium")}
                >
                  <span className="priority-dot priority-dot--medium" />
                  Medium
                </button>
                <button
                  type="button"
                  className={`priority-option priority--high ${priority === "high" ? "selected" : ""}`}
                  onClick={() => setPriority("high")}
                >
                  <span className="priority-dot priority-dot--high" />
                  High
                </button>
              </div>
            </div>

            {/* Column */}
            {columns.length > 0 && (
              <div className="form-group">
                <label className="form-label" htmlFor="task-column">
                  Column
                </label>
                <select
                  id="task-column"
                  className="form-select"
                  value={columnName}
                  onChange={(e) => setColumnName(e.target.value)}
                >
                  {columns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <PlusIcon size={16} />
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
