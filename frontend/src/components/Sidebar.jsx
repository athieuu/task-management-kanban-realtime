import { BoardIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

const BOARD_DOT_COLORS = [
  'var(--accent-purple)',
  'var(--accent-cyan)',
  'var(--accent-amber)',
  'var(--accent-emerald)',
  'var(--accent-rose)',
];

const LogoIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--accent-purple)" />
        <stop offset="100%" stopColor="var(--accent-cyan)" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#logo-gradient)" opacity="0.15" />
    <rect x="2" y="2" width="28" height="28" rx="6" stroke="url(#logo-gradient)" strokeWidth="1.5" fill="none" />
    <rect x="7" y="8" width="4" height="12" rx="1.5" fill="url(#logo-gradient)" />
    <rect x="14" y="8" width="4" height="16" rx="1.5" fill="url(#logo-gradient)" opacity="0.7" />
    <rect x="21" y="8" width="4" height="8" rx="1.5" fill="url(#logo-gradient)" opacity="0.4" />
  </svg>
);

export default function Sidebar({
  boards = [],
  activeBoard,
  onSelectBoard,
  collapsed = false,
  onToggleCollapse,
  onCreateBoard,
}) {
  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`} role="complementary">
      {/* Header / Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <LogoIcon />
          {!collapsed && <span className="sidebar-brand">TaskFlow</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {!collapsed && (
          <h3 className="sidebar-section-title">Your Boards</h3>
        )}

        <ul className="sidebar-board-list" role="list">
          {boards.map((board, index) => {
            const dotColor = BOARD_DOT_COLORS[index % BOARD_DOT_COLORS.length];
            const isActive = board._id === activeBoard;

            return (
              <li key={board._id}>
                <button
                  className={`sidebar-item${isActive ? ' active' : ''}`}
                  onClick={() => onSelectBoard?.(board._id)}
                  title={collapsed ? board.title : undefined}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className="sidebar-item-dot"
                    style={{ backgroundColor: dotColor }}
                    aria-hidden="true"
                  />
                  {!collapsed && (
                    <span className="sidebar-item-text">{board.title}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Create Board Button */}
        <button
          className="sidebar-item sidebar-create-btn"
          onClick={() => onCreateBoard?.()}
          title={collapsed ? 'Create Board' : undefined}
        >
          <PlusIcon size={16} className="sidebar-create-icon" />
          {!collapsed && <span className="sidebar-item-text">Create Board</span>}
        </button>
      </nav>

      {/* Footer with collapse toggle */}
      <div className="sidebar-footer">
        <button
          className="sidebar-collapse-btn"
          onClick={() => onToggleCollapse?.()}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRightIcon size={18} />
          ) : (
            <>
              <ChevronLeftIcon size={18} />
              <span className="sidebar-collapse-text">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
