import React from 'react';
import { BoardIcon, PlusIcon } from './Icons';

export default function EmptyState({ onCreateTask }) {
  return (
    <section className="empty-state" aria-label="No tasks">
      <div className="empty-state-icon">
        <BoardIcon size={48} />
      </div>

      <h2 className="empty-state-title">No tasks yet</h2>

      <p className="empty-state-desc">
        Create your first task to get started with your project
      </p>

      <button
        className="btn btn-primary"
        onClick={onCreateTask}
        type="button"
      >
        <PlusIcon size={18} />
        Create Task
      </button>
    </section>
  );
}
