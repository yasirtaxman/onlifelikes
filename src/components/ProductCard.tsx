import Image from "next/image";
import type { Product } from "@/lib/types";
import { amazonLink } from "@/lib/affiliate";
import { InlineText } from "./InlineText";
import { BestForLabel } from "./boxes";
import { AmazonButton } from "./AmazonButton";

export function ProductCard({
  product,
  rank,
  bestFor,
}: {
  product: Product;
  rank?: number;
  bestFor?: string;
}) {
  const href = amazonLink(product);
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="flex flex-col gap-5 p-6 sm:flex-row">
        {product.image && (
          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-second-tint sm:w-40">
            <Image
              src={product.image}
              alt={product.imageAlt || product.name}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {rank && (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                {rank}
              </span>
            )}
            <p className="text-lg font-bold text-ink">{product.name}</p>
          </div>
          {(bestFor || product.bestFor) && (
            <div className="mt-2">
              <BestForLabel text={bestFor || product.bestFor || ""} />
            </div>
          )}
          <p className="mt-3 text-[15px] leading-relaxed text-ink/85">
            <InlineText text={product.summary} />
          </p>

          {(product.pros?.length || product.cons?.length) && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.pros && product.pros.length > 0 && (
                <ul className="space-y-1.5">
                  {product.pros.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink">
                      <span aria-hidden="true" className="font-bold text-brand">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              {product.cons && product.cons.length > 0 && (
                <ul className="space-y-1.5">
                  {product.cons.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink/70">
                      <span aria-hidden="true" className="font-bold text-ink/40">✕</span>
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <AmazonButton href={href} />
            <span className="text-xs text-ink/50">
              Prices and availability may change
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
