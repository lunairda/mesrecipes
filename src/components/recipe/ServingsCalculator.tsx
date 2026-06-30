"use client";

import { useState } from "react";

interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}

interface Props {
  baseServings: number;
  ingredients: Ingredient[];
  t: { servings: string; reset: string };
}

function formatAmount(value: number): string {
  // Clean up floating point display
  const rounded = Math.round(value * 100) / 100;
  // Show as fraction if close to common fractions
  const fractions: [number, string][] = [
    [0.25, "¼"], [0.33, "⅓"], [0.5, "½"], [0.67, "⅔"], [0.75, "¾"],
  ];
  const whole = Math.floor(rounded);
  const decimal = rounded - whole;
  for (const [val, symbol] of fractions) {
    if (Math.abs(decimal - val) < 0.04) {
      return whole > 0 ? `${whole} ${symbol}` : symbol;
    }
  }
  // Show whole number or up to 1 decimal
  return rounded % 1 === 0 ? `${rounded}` : `${rounded.toFixed(1)}`;
}

export function ServingsCalculator({ baseServings, ingredients, t }: Props) {
  const [servings, setServings] = useState(baseServings);
  const ratio = servings / baseServings;

  return (
    <div>
      {/* Servings control */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl" style={{ backgroundColor: "#EDE9E1" }}>
        <span className="text-sm" style={{ fontFamily: "var(--font-body)", color: "#2C3A2C" }}>
          {t.servings}:
        </span>
        <button
          onClick={() => setServings((s) => Math.max(1, s - 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#7A9E7E" }}
          aria-label="Decrease servings"
        >
          −
        </button>
        <span
          className="text-xl font-bold w-8 text-center"
          style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}
        >
          {servings}
        </span>
        <button
          onClick={() => setServings((s) => Math.min(20, s + 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#7A9E7E" }}
          aria-label="Increase servings"
        >
          +
        </button>
        {servings !== baseServings && (
          <button
            onClick={() => setServings(baseServings)}
            className="ml-2 text-xs underline underline-offset-2 transition-opacity hover:opacity-60"
            style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}
          >
            {t.reset}
          </button>
        )}
      </div>

      {/* Ingredient list */}
      <ul className="flex flex-col gap-3">
        {ingredients.map((ing, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "#2C3A2C" }}
          >
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#C9A84C" }}
            />
            <span>
              <span className="font-semibold">
                {formatAmount(ing.amount * ratio)}
                {ing.unit ? ` ${ing.unit}` : ""}
              </span>{" "}
              {ing.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
