import Link from "next/link";
import { CtaButton } from "@/components/CtaButton";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-sage">404</p>
      <h1 className="mt-4 text-2xl font-bold text-pine">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 text-pine/70">
        The page may have moved or never existed. Try the search, or head back
        to the homepage.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <CtaButton href="/">Back to home</CtaButton>
        <CtaButton href="/search" variant="outline">
          Search articles
        </CtaButton>
      </div>
      <p className="mt-8 text-sm text-pine/50">
        Or browse <Link href="/categories" className="text-forest underline">all categories</Link>.
      </p>
    </div>
  );
}
