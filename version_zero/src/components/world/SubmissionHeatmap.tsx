"use client";

import { useMemo } from "react";
import type { HeatmapDay } from "@/types/player";

type Props = {
  data: HeatmapDay[];
};

function getLastNDates(n: number) {
  const today = new Date();
  const dates: string[] = [];

  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().slice(0, 10));
  }

  return dates;
}

function getCellClass(count: number) {
  if (count === 0) return "bg-slate-950/60 hover:bg-slate-800";
  if (count <= 2) return "bg-amber-500/20 hover:bg-amber-500/30";
  if (count <= 4) return "bg-amber-400/50 hover:bg-amber-400/60";
  return "bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.4)] hover:bg-amber-200";
}

export default function SubmissionHeatmap({ data }: Props) {
  const countMap = useMemo(() => new Map(data.map((day) => [day.date, day.count])), [data]);
  
  const days = useMemo(() => {
    const rawDates = getLastNDates(365);
    const mappedDays = rawDates.map((date) => ({
      date,
      count: countMap.get(date) ?? 0,
      dummy: false,
    }));
    
    // Align so that the first column starts on Sunday (row 0)
    const firstDate = new Date(mappedDays[0].date);
    const startDayOfWeek = firstDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const paddedDays: { date: string; count: number; dummy: boolean }[] = [];
    
    // Add dummy days for padding
    for (let i = 0; i < startDayOfWeek; i++) {
      paddedDays.push({
        date: `dummy-${i}`,
        count: -1,
        dummy: true,
      });
    }
    
    return [...paddedDays, ...mappedDays];
  }, [countMap]);

  // Group the days into columns of 7 days
  const chartData = useMemo(() => {
    const columns: typeof days[] = [];
    let currentWeek: typeof days = [];

    days.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === days.length - 1) {
        columns.push(currentWeek);
        currentWeek = [];
      }
    });

    // Compute month labels based on column index
    const monthLabels: { index: number; label: string }[] = [];
    columns.forEach((week, colIndex) => {
      const nonDummyDay = week.find((day) => !day.dummy);
      if (!nonDummyDay) return;
      const dateObj = new Date(nonDummyDay.date);
      const monthName = dateObj.toLocaleString("default", { month: "short" });

      if (colIndex === 0) {
        monthLabels.push({ index: colIndex, label: monthName });
      } else {
        const prevWeek = columns[colIndex - 1];
        const prevNonDummy = prevWeek.find((day) => !day.dummy);
        if (prevNonDummy) {
          const prevDateObj = new Date(prevNonDummy.date);
          const prevMonthName = prevDateObj.toLocaleString("default", { month: "short" });
          if (monthName !== prevMonthName) {
            const lastLabel = monthLabels[monthLabels.length - 1];
            // Make sure labels aren't too close to each other (at least 4 weeks apart)
            if (colIndex - lastLabel.index >= 4) {
              monthLabels.push({ index: colIndex, label: monthName });
            }
          }
        }
      }
    });

    const totalSolved = data.reduce((acc, curr) => acc + curr.count, 0);

    return { columns, monthLabels, totalSolved };
  }, [days, data]);

  const { columns, monthLabels, totalSolved } = chartData;

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">
          Submission Heatmap
        </p>
        <h2 className="mt-1 text-xl font-bold text-white tracking-tight">
          Last 12 Months
        </h2>
      </div>

      <div className="mt-6 flex items-start">
        {/* Day of Week Labels */}
        <div className="mr-2 mt-6 flex flex-col justify-between text-[9px] text-slate-500 h-[116px] py-[2px] font-semibold select-none">
          <span className="h-3.5 leading-none flex items-center"></span>
          <span className="h-3.5 leading-none flex items-center">Mon</span>
          <span className="h-3.5 leading-none flex items-center"></span>
          <span className="h-3.5 leading-none flex items-center">Wed</span>
          <span className="h-3.5 leading-none flex items-center"></span>
          <span className="h-3.5 leading-none flex items-center">Fri</span>
          <span className="h-3.5 leading-none flex items-center"></span>
        </div>

        {/* Scrollable Heatmap Grid */}
        <div className="flex-1 overflow-x-auto pb-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800/80">
          <div className="flex flex-col select-none min-w-max">
            {/* Months Header Row */}
            <div className="relative h-5 text-[9px] text-slate-500 font-semibold mb-1">
              {monthLabels.map((ml) => (
                <span
                  key={ml.index}
                  className="absolute"
                  style={{ left: `${ml.index * 17}px` }}
                >
                  {ml.label}
                </span>
              ))}
            </div>

            {/* Grid Columns */}
            <div className="flex gap-[3px]">
              {columns.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {week.map(({ date, count, dummy }) =>
                    dummy ? (
                      <div
                        key={date}
                        className="h-[14px] w-[14px] opacity-0 pointer-events-none"
                      />
                    ) : (
                      <div
                        key={date}
                        className={`h-[14px] w-[14px] rounded-[2px] border border-white/5 transition-all duration-200 hover:scale-125 hover:z-10 cursor-pointer ${getCellClass(
                          count,
                        )}`}
                        title={`${date}: ${count} problems solved`}
                      />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info & Legend */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
        <div>
          Total Solved: <span className="font-bold text-white">{totalSolved}</span>
        </div>
        <div className="flex items-center gap-1.5 self-end sm:self-auto font-medium">
          <span>Less</span>
          <div className="h-3 w-3 rounded-[2px] bg-slate-950/60 border border-white/5" />
          <div className="h-3 w-3 rounded-[2px] bg-amber-500/20 border border-white/5" />
          <div className="h-3 w-3 rounded-[2px] bg-amber-400/50 border border-white/5" />
          <div className="h-3 w-3 rounded-[2px] bg-amber-300 border border-white/5 shadow-[0_0_4px_rgba(251,191,36,0.3)]" />
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
