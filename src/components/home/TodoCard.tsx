"use client";
import { Todo } from "@/types/todo";

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  formatDate: (dateString: string) => string;
}

export default function TodoCard({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  formatDate,
}: TodoCardProps) {
  const isCompleted = todo.completed === 1;

  return (
    <div
      className={`flex items-start justify-between p-5 rounded-xl border transition-all ${
        isCompleted
          ? "bg-neutral-50/50 dark:bg-neutral-950/30 border-neutral-200 dark:border-neutral-900 border-l-4 border-l-emerald-500 opacity-75"
          : "bg-white dark:bg-neutral-900 border-neutral-250 dark:border-neutral-800/80 border-l-4 border-l-indigo-500"
      }`}
    >
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(todo)}
          className={`mt-1 w-6 h-6 flex items-center justify-center rounded-md border-2 transition-all flex-shrink-0 cursor-pointer active:scale-90 ${
            isCompleted
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-neutral-300 dark:border-neutral-700 bg-transparent"
          }`}
          aria-label={isCompleted ? "Mark task as incomplete" : "Mark task as complete"}
        >
          {isCompleted && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3
            className={`text-lg font-bold leading-tight truncate ${
              isCompleted
                ? "line-through text-neutral-400 dark:text-neutral-600"
                : "text-neutral-800 dark:text-neutral-200"
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm mt-1 whitespace-pre-wrap ${
                isCompleted
                  ? "line-through text-neutral-400/80 dark:text-neutral-600/80"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {todo.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Created {formatDate(todo.created_at || new Date().toISOString())}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 ml-4 flex-shrink-0">
        <button
          onClick={() => onEdit(todo)}
          className="p-2.5 rounded-lg cursor-pointer border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 active:bg-neutral-100 dark:active:bg-neutral-850 active:scale-[0.95] transition-all"
          aria-label="Edit task"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo)}
          className="p-2.5 rounded-lg cursor-pointer border border-neutral-200 dark:border-neutral-850 text-rose-600 active:bg-rose-500/10 active:border-rose-500/20 active:scale-[0.95] transition-all"
          aria-label="Delete task"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
