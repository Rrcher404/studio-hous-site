import type { ReactNode } from "react";

/**
 * Render helpers for Panel-editable content.
 *
 * Headlines are stored as plain strings where "\n" is a line break and one
 * *starred* phrase marks the gold <em> — e.g. "Built like editorials,\nnot
 * *templates.*" — so editors control the gold word without touching JSX.
 */
export function renderHeadline(value: string): ReactNode {
  const lines = value.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/\*([^*]+)\*/g);
    return (
      <span key={i}>
        {i > 0 && <br />}
        {parts.map((part, j) => (j % 2 === 1 ? <em key={j}>{part}</em> : part))}
      </span>
    );
  });
}

/** Hard clamp mirroring the Panel's char limits — the render-side seatbelt. */
export function clamp(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}
