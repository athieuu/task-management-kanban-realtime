import { useEffect, useState, useCallback } from "react";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import API from "./api/boardApi";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import CreateTaskModal from "./components/CreateTaskModal";

function App() {
  // ── State ──
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalDefaultColumn, setCreateModalDefaultColumn] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);

  // DnD sensors — require 5px movement before starting drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // ── Derived State ──
  const activeBoard = boards.find((b) => b._id === activeBoardId) || boards[0] || null;
  const totalTasks = activeBoard
    ? activeBoard.columns.reduce((sum, col) => sum + (col.tasks?.length || 0), 0)
    : 0;

  const columnNames = activeBoard
    ? activeBoard.columns.map((col) => col.name)
    : [];

  // Find the active dragging task for DragOverlay
  const activeDragTask = (() => {
    if (!activeTaskId || !activeBoard) return null;
    for (const col of activeBoard.columns) {
      const task = (col.tasks || []).find((t) => t._id === activeTaskId);
      if (task) return task;
    }
    return null;
  })();

  // ── Effects ──
  useEffect(() => {
    fetchBoards();
  }, []);

  // ── API calls ──
  const fetchBoards = async () => {
    try {
      const res = await API.get("/boards");
      setBoards(res.data);
      if (res.data.length > 0 && !activeBoardId) {
        setActiveBoardId(res.data[0]._id);
      }
    } catch (err) {
      console.error("Failed to fetch boards:", err);
    }
  };

  const createTask = async (boardId, columnName, title) => {
    if (!title) return;
    try {
      await API.post("/tasks", {
        boardId,
        columnName,
        title,
      });
      fetchBoards();
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const createTaskFromModal = async ({ title, description, priority, columnName }) => {
    if (!title || !activeBoard) return;
    try {
      await API.post("/tasks", {
        boardId: activeBoard._id,
        columnName,
        title,
        description,
        priority,
      });
      setIsCreateModalOpen(false);
      fetchBoards();
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const deleteTask = async (boardId, columnName, taskId) => {
    try {
      await API.delete("/tasks", {
        data: { boardId, columnName, taskId },
      });
      fetchBoards();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const moveTask = async (boardId, fromColumn, toColumn, taskId) => {
    try {
      await API.put("/tasks/move", {
        boardId,
        fromColumn,
        toColumn,
        taskId,
      });
      fetchBoards();
    } catch (err) {
      console.error("Failed to move task:", err);
    }
  };

  // ── Drag Handlers ──
  const handleDragStart = (event) => {
    setActiveTaskId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTaskId(null);

    if (!over || !activeBoard) return;

    const taskId = active.id;
    const toColumn = over.id;

    for (const col of activeBoard.columns) {
      const task = (col.tasks || []).find((t) => t._id === taskId);
      if (task && col.name !== toColumn) {
        moveTask(activeBoard._id, col.name, toColumn, taskId);
        break;
      }
    }
  };

  const handleDragCancel = () => {
    setActiveTaskId(null);
  };

  // ── Render ──
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="app-layout">
        {/* Sidebar */}
        <Sidebar
          boards={boards}
          activeBoard={activeBoardId}
          onSelectBoard={setActiveBoardId}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className="app-main">
          <Header
            boardTitle={activeBoard?.title || "TaskFlow"}
            taskCount={totalTasks}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreateTask={() => {
              setCreateModalDefaultColumn(columnNames[0] || "");
              setIsCreateModalOpen(true);
            }}
          />

          <div className="app-content">
            <KanbanBoard
              board={activeBoard}
              onDeleteTask={deleteTask}
              onCreateTask={createTask}
              onOpenCreateModal={() => {
                setCreateModalDefaultColumn(columnNames[0] || "");
                setIsCreateModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeDragTask ? (
          <div className="drag-overlay-card">
            <p className="task-card-title">{activeDragTask.title}</p>
          </div>
        ) : null}
      </DragOverlay>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createTaskFromModal}
        columns={columnNames}
        defaultColumn={createModalDefaultColumn}
      />
    </DndContext>
  );
}

export default App;