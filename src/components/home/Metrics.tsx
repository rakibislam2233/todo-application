"use client";

interface MetricsProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

export default function Metrics({
  totalTasks,
  completedTasks,
  pendingTasks,
  completionRate,
}: MetricsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Tasks Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
        <span className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Total Tasks</span>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-4xl font-black">{totalTasks}</span>
          <span className="text-sm text-neutral-500">recorded</span>
        </div>
      </div>

      {/* Completed Card */}
      <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/25 dark:border-emerald-500/20 rounded-xl p-6 flex flex-col justify-between text-emerald-700 dark:text-emerald-400">
        <span className="text-sm font-semibold tracking-wider uppercase text-emerald-500/80">Completed</span>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-4xl font-black">{completedTasks}</span>
          <span className="text-sm opacity-80">{completionRate}% rate</span>
        </div>
      </div>

      {/* Pending Card */}
      <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/25 dark:border-amber-500/20 rounded-xl p-6 flex flex-col justify-between text-amber-700 dark:text-amber-400">
        <span className="text-sm font-semibold tracking-wider uppercase text-amber-500/80">Pending Action</span>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-4xl font-black">{pendingTasks}</span>
          <span className="text-sm opacity-80">to be done</span>
        </div>
      </div>
    </section>
  );
}
