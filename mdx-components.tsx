import type { MDXComponents } from "mdx/types";

// Global MDX element overrides. Article styling is handled by the .prose class,
// so plain elements are fine here.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
