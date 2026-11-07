import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { nodeText, slugify } from "@/lib/slug";

// Headings get stable ids so legal pages and articles can be linked to by section.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2 id={slugify(nodeText(children))} className="scroll-mt-28" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
      <h3 id={slugify(nodeText(children))} className="scroll-mt-28" {...props}>
        {children}
      </h3>
    ),
    ...components,
  };
}
