import React from 'react';
import { LayersIcon, SearchIcon, FilterIcon, BellIcon, PlusIcon } from './Icons';

export default function Header({ boardTitle, taskCount, searchQuery, onSearchChange, onCreateTask }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">{boardTitle}</h1>
        <span className="header-board-badge">
          <LayersIcon size={14} />
          {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      <div className="header-right">
        <button className="btn-icon" onClick={onCreateTask} aria-label="Create new task">
          <PlusIcon size={18} />
          New Task
        </button>

        <div className="header-search">
          <SearchIcon size={16} />
          <input
            type="text"
            placeholder="Search tasks…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search tasks"
          />
        </div>

        <button className="header-icon-btn" aria-label="Filter tasks" type="button">
          <FilterIcon size={18} />
        </button>

        <button className="header-icon-btn" aria-label="Notifications" type="button">
          <BellIcon size={18} />
          <span className="notification-dot" aria-hidden="true" />
        </button>

        <div className="header-avatar" role="img" aria-label="User avatar – BT">
          BT
        </div>
      </div>
    </header>
  );
}
