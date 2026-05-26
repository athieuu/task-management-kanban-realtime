import Column from "./Column";
import EmptyState from "./EmptyState";
import { PlusIcon } from "./Icons";

export default function KanbanBoard({
  board,
  onDeleteTask,
  onCreateTask,
  onOpenCreateModal,
}) {
  if (!board) {
    return (
      <EmptyState
        title="No board selected"
        description="Select a board from the sidebar or create a new one to get started."
        onAction={null}
      />
    );
  }

  const columns = board.columns || [];
  const hasNoTasks = columns.every((col) => (col.tasks || []).length === 0);

  if (columns.length === 0) {
    return (
      <EmptyState
        onCreateTask={onOpenCreateModal}
      />
    );
  }

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <Column
          key={column.name}
          column={column}
          boardId={board._id}
          onDeleteTask={onDeleteTask}
          onCreateTask={onCreateTask}
        />
      ))}

      {/* Add Column placeholder */}
      <button className="add-column-btn" aria-label="Add column">
        <PlusIcon size={20} />
        Add Column
      </button>
    </div>
  );
}
