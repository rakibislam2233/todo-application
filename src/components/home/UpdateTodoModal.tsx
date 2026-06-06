"use client";

import React from "react";

interface UpdateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  completed: boolean;
  setCompleted: (val: boolean) => void;
  submitting: boolean;
}

export default function UpdateTodoModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  setTitle,
  description,
  setDescription,
  completed,
  setCompleted,
  submitting,
}: UpdateTodoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-250/60 dark:border-neutral-900">
          <h2 className="text-xl font-bold tracking-tight">Edit Task Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 cursor-pointer text-neutral-400 active:bg-neutral-100 dark:active:bg-neutral-900 rounded-md"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col flex-1">
          <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="update-title" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Task Title *
              </label>
              <input
                id="update-title"
                type="text"
                required
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="update-desc" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Description
              </label>
              <textarea
                id="update-desc"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            {/* Status Switcher */}
            <div className="flex items-center gap-3 mt-2 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800/80">
              <input
                id="update-completed"
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="w-5 h-5 rounded border-neutral-350 dark:border-neutral-700 bg-transparent text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="update-completed" className="text-sm font-semibold select-none cursor-pointer">
                Mark task as completed
              </label>
            </div>
          </div>

          <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-250/60 dark:border-neutral-900 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 cursor-pointer rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm font-semibold active:bg-neutral-100 dark:active:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 cursor-pointer rounded-lg bg-violet-600 border border-violet-600 text-white text-sm font-semibold active:bg-violet-750 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
