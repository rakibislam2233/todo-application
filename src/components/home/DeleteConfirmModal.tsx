"use client";

import React from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  todoTitle: string;
  submitting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  todoTitle,
  submitting,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-250/60 dark:border-neutral-900 text-rose-600">
          <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold tracking-tight">Delete Task</h2>
        </div>

        <div className="p-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Are you sure you want to permanently delete the task <strong className="text-neutral-800 dark:text-neutral-200">"{todoTitle}"</strong>?
            This action is destructive and cannot be undone.
          </p>
        </div>

        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-250/60 dark:border-neutral-900 flex justify-end gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="px-4 py-2.5 cursor-pointer rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm font-semibold active:bg-neutral-100 dark:active:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="px-5 py-2.5 cursor-pointer rounded-lg bg-rose-600 border border-rose-600 text-white text-sm font-semibold active:bg-rose-750 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
