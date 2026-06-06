"use client";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import Metrics from "./Metrics";
import TodoCard from "./TodoCard";
import CreateTodoModal from "./CreateTodoModal";
import UpdateTodoModal from "./UpdateTodoModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createSubmitting, setCreateSubmitting] = useState(false);

  // Update Modal State
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateCompleted, setUpdateCompleted] = useState(false);
  const [updateSubmitting, setUpdateSubmitting] = useState(false);

  // Delete Confirmation Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = (await response.json()) as Todo[];
      setTodos(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong while loading tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle quick complete status
  const handleToggleComplete = async (todo: Todo) => {
    const nextCompletedState = todo.completed === 1 ? 0 : 1;

    // Optimistic UI update
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: nextCompletedState } : t,
      ),
    );
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      const updated = (await response.json()) as Todo;
      // Sync with server response
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      // Revert optimistic update on error
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: todo.completed } : t,
        ),
      );
      alert("Error updating task status. Please try again.");
    }
  };

  // Handle Create Todo
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle.trim()) return;

    setCreateSubmitting(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: createTitle,
          description: createDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo = (await response.json()) as Todo;
      setTodos((prev) => [newTodo, ...prev]);
      // Reset & close
      setCreateTitle("");
      setCreateDescription("");
      setIsCreateOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to create task");
    } finally {
      setCreateSubmitting(false);
    }
  };

  // Open Update Modal
  const openUpdateModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setUpdateTitle(todo.title);
    setUpdateDescription(todo.description || "");
    setUpdateCompleted(todo.completed === 1);
    setIsUpdateOpen(true);
  };

  // Handle Update Todo
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTodo || !updateTitle.trim()) return;

    setUpdateSubmitting(true);
    try {
      const response = await fetch(`/api/todos/${selectedTodo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updateTitle,
          description: updateDescription,
          completed: updateCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updated = (await response.json()) as Todo;
      setTodos((prev) =>
        prev.map((t) => (t.id === selectedTodo.id ? updated : t)),
      );
      setIsUpdateOpen(false);
      setSelectedTodo(null);
    } catch (err: any) {
      alert(err.message || "Failed to update task");
    } finally {
      setUpdateSubmitting(false);
    }
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (todo: Todo) => {
    setTodoToDelete(todo);
    setIsDeleteOpen(true);
  };

  // Handle Delete Todo
  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;
    setDeleteSubmitting(true);
    try {
      const response = await fetch(`/api/todos/${todoToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prev) => prev?.filter((t) => t.id !== todoToDelete.id));
      setIsDeleteOpen(false);
      setTodoToDelete(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete task");
    } finally {
      setDeleteSubmitting(false);
    }
  };

  // Filtering Logic
  const filteredTodos = todos?.filter((todo) => {
    const matchesSearch =
      todo?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      (todo.description &&
        todo?.description?.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filter === "completed") {
      return matchesSearch && todo.completed === 1;
    }
    if (filter === "pending") {
      return matchesSearch && todo.completed === 0;
    }
    return matchesSearch;
  });

  // Calculate Metrics
  const totalTasks = todos?.length;
  const completedTasks = todos?.filter((t) => t.completed === 1).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format Date Helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "Unknown Date";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans pb-24">
      {/* Main Container (Max Width 1200px) */}
      <main className="max-w-[1200px] mx-auto px-4 pt-10 flex flex-col gap-10">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-neutral-200 dark:border-neutral-900 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Todo Dashboard
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-base">
              A streamlined tool to orchestrate, complete, and track your daily
              operations.
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="w-full md:w-auto bg-violet-600 active:bg-violet-700 text-white rounded-xl px-5 py-3 font-semibold border border-violet-600 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add New Task
            </button>
          </div>
        </section>

        {/* Dashboard Metrics Grid */}
        <Metrics
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          completionRate={completionRate}
        />

        {/* Search, Filter & Actions Bar */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-lg text-sm placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter("all")}
              className={`px-4  cursor-pointer py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors active:scale-[0.97] ${
                filter === "all"
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                  : "bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 cursor-pointer py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors active:scale-[0.97] ${
                filter === "pending"
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                  : "bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-800"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 cursor-pointer py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors active:scale-[0.97] ${
                filter === "completed"
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                  : "bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-800"
              }`}
            >
              Completed
            </button>
          </div>
        </section>

        {/* Task List Section */}
        <section className="flex flex-col gap-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
              <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-neutral-500 mt-4">
                Loading Task Database...
              </span>
            </div>
          ) : error ? (
            <div className="p-6 text-center border border-red-200 dark:border-red-950/30 bg-red-500/5 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl">
              <p className="font-semibold">Error Loading Tasks</p>
              <p className="text-sm mt-1 opacity-90">{error}</p>
              <button
                onClick={fetchTodos}
                className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-red-600 text-white rounded-lg border border-red-600 active:bg-red-700"
              >
                Retry Request
              </button>
            </div>
          ) : filteredTodos?.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl bg-white/40 dark:bg-neutral-900/10 px-4">
              <svg
                className="w-12 h-12 text-neutral-300 dark:text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <h3 className="text-lg font-bold mt-4">
                No tasks match your criteria
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 max-w-md">
                {searchQuery || filter !== "all"
                  ? "Try resetting your search query or filter settings to view your list."
                  : "All clear! You don't have any outstanding tasks. Use the button above to add a new task."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredTodos?.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={handleToggleComplete}
                  onEdit={openUpdateModal}
                  onDelete={openDeleteModal}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* CREATE MODAL */}
      <CreateTodoModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        title={createTitle}
        setTitle={setCreateTitle}
        description={createDescription}
        setDescription={setCreateDescription}
        submitting={createSubmitting}
      />

      {/* UPDATE MODAL */}
      <UpdateTodoModal
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedTodo(null);
        }}
        onSubmit={handleUpdateSubmit}
        title={updateTitle}
        setTitle={setUpdateTitle}
        description={updateDescription}
        setDescription={setUpdateDescription}
        completed={updateCompleted}
        setCompleted={setUpdateCompleted}
        submitting={updateSubmitting}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setTodoToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        todoTitle={todoToDelete?.title || ""}
        submitting={deleteSubmitting}
      />
    </div>
  );
};

export default Todos;
