import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[calc(70vh-var(--header-h))] flex-col items-center justify-center text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 text-h2">This page is not on the chart</h1>
      <p className="mt-4 text-muted">The page you were looking for has moved or never existed.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/signals" variant="secondary">
          See membership
        </Button>
      </div>
    </section>
  );
}
