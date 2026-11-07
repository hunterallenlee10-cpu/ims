// Browser-safe research types and helpers (no filesystem access).

export type PostMeta = {
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  tags: string[];
};

export type Post = PostMeta & { slug: string; readingMinutes: number };

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
