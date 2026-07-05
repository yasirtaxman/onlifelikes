import { InlineText } from "./InlineText";

export function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption?: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-beige">
      <table className="w-full min-w-[560px] border-collapse bg-white text-sm">
        {caption && (
          <caption className="border-b border-beige bg-beige-light px-5 py-3 text-left font-semibold text-pine">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-sage-light text-left">
            {columns.map((col, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 font-semibold text-forest-dark"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 ? "bg-cream" : "bg-white"}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 align-top leading-relaxed ${
                    ci === 0 ? "font-medium text-pine" : "text-pine/80"
                  }`}
                >
                  <InlineText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
