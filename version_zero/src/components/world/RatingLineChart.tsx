"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import type { RatingPoint } from "@/types/player";

type Props = {
  data: RatingPoint[];
};

export default function RatingLineChart({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const height = 240;
  const paddingX = 50;
  const paddingY = 20;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width || 600);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const chartData = useMemo(() => {
    if (data.length === 0) return { points: [], yMin: 0, yMax: 0, gridLines: [] };

    const ratings = data.map((point) => point.rating);
    const minRating = Math.min(...ratings);
    const maxRating = Math.max(...ratings);
    
    // Add margin to top and bottom of chart
    const ratingDiff = maxRating - minRating;
    const pad = ratingDiff === 0 ? 100 : ratingDiff * 0.15;
    const yMin = Math.max(0, minRating - pad);
    const yMax = maxRating + pad;

    const xStep = data.length > 1 ? (width - paddingX * 2) / (data.length - 1) : 0;

    const points = data.map((point, index) => {
      const x = paddingX + index * xStep;
      const y =
        paddingY +
        ((yMax - point.rating) / Math.max(yMax - yMin, 1)) *
          (height - paddingY * 2);

      return { ...point, x, y };
    });

    // Compute grid lines
    const levels = 4;
    const gridLines = Array.from({ length: levels }).map((_, i) => {
      const ratingVal = yMin + (i / (levels - 1)) * (yMax - yMin);
      const y =
        paddingY +
        ((yMax - ratingVal) / Math.max(yMax - yMin, 1)) *
          (height - paddingY * 2);
      return { y, rating: Math.round(ratingVal) };
    });

    return { points, yMin, yMax, gridLines };
  }, [data, width]);

  if (data.length === 0) {
    return (
      <section className="rounded-3xl border border-white/5 bg-slate-950/40 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">
          Rating History
        </p>
        <p className="mt-4 text-sm text-slate-400">No rating history available.</p>
      </section>
    );
  }

  const { points, gridLines } = chartData;

  const pathD = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(" ");

  // Create path for the gradient area under the line
  const fillD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : "";

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (points.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    let closestIndex = 0;
    let minDiff = Infinity;
    points.forEach((point, index) => {
      const diff = Math.abs(point.x - mouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    setHoveredIndex(closestIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : null;
  const change = hoveredIndex !== null && hoveredIndex > 0
    ? points[hoveredIndex].rating - points[hoveredIndex - 1].rating
    : null;

  // Decide if we should render circles on the path (only if there are few points, to avoid clutter)
  const showCircles = points.length < 50;

  // Formatting X-axis dates: draw 3 labels (start, middle, end)
  const dateLabels = useMemo(() => {
    if (points.length === 0) return [];
    const labels: Array<{ x: number; label: string; anchor: "start" | "middle" | "end" }> = [
      { x: points[0].x, label: points[0].date, anchor: "start" }
    ];
    if (points.length > 2) {
      const midIdx = Math.floor(points.length / 2);
      labels.push({ x: points[midIdx].x, label: points[midIdx].date, anchor: "middle" });
    }
    if (points.length > 1) {
      labels.push({ x: points[points.length - 1].x, label: points[points.length - 1].date, anchor: "end" });
    }
    return labels;
  }, [points]);

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">
            Rating History
          </p>
          <h2 className="mt-1 text-xl font-bold text-white tracking-tight">
            Progress Over Time
          </h2>
        </div>
        {activePoint && (
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Hovered Contest</span>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="font-bold text-white">{activePoint.rating}</span>
              {change !== null && (
                <span className={`text-xs font-semibold ${change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {change >= 0 ? `+${change}` : change}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div ref={containerRef} className="relative mt-6 w-full select-none">
        <svg
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="overflow-visible cursor-crosshair"
        >
          <defs>
            <linearGradient id="ratingLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="ratingFillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridLines.map((line, idx) => (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={line.y}
                x2={width - paddingX}
                y2={line.y}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="4 4"
              />
              <text
                x={paddingX - 10}
                y={line.y + 3}
                textAnchor="end"
                className="text-[10px] fill-slate-500 font-semibold font-mono"
              >
                {line.rating}
              </text>
            </g>
          ))}

          {/* Fill area under curve */}
          {fillD && (
            <path
              d={fillD}
              fill="url(#ratingFillGrad)"
            />
          )}

          {/* Line curve */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="url(#ratingLineGrad)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* Interactive vertical line on hover */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={paddingY}
              x2={activePoint.x}
              y2={height - paddingY}
              stroke="rgba(251, 191, 36, 0.3)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          )}

          {/* Small static circles on points if few points */}
          {showCircles &&
            points.map((point) => (
              <circle
                key={point.date}
                cx={point.x}
                cy={point.y}
                r="3"
                className="fill-slate-950 stroke-amber-400 stroke-[1.5]"
              />
            ))}

          {/* Highlighted circle on hover */}
          {activePoint && (
            <g>
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="7"
                className="fill-amber-400/20 animate-ping"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="4.5"
                className="fill-amber-400 stroke-slate-950 stroke-[1.5]"
              />
            </g>
          )}

          {/* X Axis Date Labels */}
          {dateLabels.map((dl, idx) => (
            <text
              key={idx}
              x={dl.x}
              y={height - paddingY + 16}
              textAnchor={dl.anchor}
              className="text-[9px] fill-slate-500 font-semibold"
            >
              {dl.label}
            </text>
          ))}
        </svg>

        {/* Dynamic Tooltip */}
        {activePoint && (
          <div
            className="absolute z-10 pointer-events-none rounded-xl border border-white/10 bg-slate-950/95 p-3 text-xs shadow-2xl backdrop-blur-md transition-all duration-75"
            style={{
              left: `${activePoint.x}px`,
              top: `${activePoint.y < 85 ? activePoint.y + 15 : activePoint.y - 15}px`,
              transform: `translate(-50%, ${activePoint.y < 85 ? "0%" : "-100%"})`,
            }}
          >
            <div className="font-semibold text-slate-400 whitespace-nowrap">{activePoint.date}</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-bold text-white text-sm">{activePoint.rating}</span>
              {change !== null && (
                <span className={`text-xs font-bold ${change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {change >= 0 ? `+${change}` : change}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
