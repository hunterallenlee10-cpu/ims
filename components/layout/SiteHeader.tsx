"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Full-width sticky nav: logo left, links spread across the middle, CTA right.
 * Below 900px the links move into a menu dialog.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  // "Home" on the home page scrolls back to the top instead of reloading the route.
  const onNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    dialogRef.current?.close();
    if (href !== "/" || pathname !== "/") return;
    event.preventDefault();
    document.documentElement.style.overflow = "";
    if (window.location.hash) window.history.replaceState(null, "", "/");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <div className="flex h-[calc(var(--header-h)-1px)] items-center justify-between gap-2.5 px-[var(--header-px)] nav:gap-[clamp(20px,2.5vw,48px)]">
        <Wordmark size="header" className="shrink-0" />

        <nav aria-label="Main" className="hidden min-w-0 flex-1 nav:flex">
          <ul className="flex flex-1 items-center justify-evenly">
            {site.nav.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavClick(link.href)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex min-h-11 items-center whitespace-nowrap px-1 text-[clamp(15px,calc(10.26px+0.526vw),17px)] font-medium tracking-[0.01em] transition-colors",
                      active ? "text-heading" : "text-body hover:text-heading",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-1 bottom-1.5 h-0.5 origin-left bg-accent-light transition-transform duration-300 ease-site",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Hidden only on very narrow phones (<360px); the menu repeats it. */}
          <Button href={site.joinHref} size="header" className="max-[359px]:hidden">
            {site.joinLabel}
          </Button>
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-site-sm border border-line text-heading transition-colors hover:border-accent-light nav:hidden"
          >
            <Icon name="menu" size={22} />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-body backdrop:bg-bg/80 nav:hidden"
      >
        <div className="flex h-[var(--header-h)] items-center justify-between gap-2.5 border-b border-line px-[var(--header-px)]">
          <Wordmark size="header" className="shrink-0" />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-site-sm border border-line text-heading hover:border-accent-light"
            autoFocus
          >
            <Icon name="close" size={22} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="px-[var(--header-px)] py-8">
          <ul className="divide-y divide-line border-y border-line">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  onClick={onNavClick(link.href)}
                  className="flex min-h-14 items-center justify-between font-display text-xl text-heading aria-[current=page]:text-accent-light"
                >
                  {link.label}
                  <Icon name="arrowRight" size={18} className="text-accent-light" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => dialogRef.current?.close()}
                className="flex min-h-14 items-center justify-between font-display text-xl text-heading"
              >
                Contact
                <Icon name="arrowRight" size={18} className="text-accent-light" />
              </Link>
            </li>
          </ul>
          <Button href={site.joinHref} size="lg" className="mt-8 w-full">
            {site.joinLabel}
          </Button>
          <p className="mt-6 text-center text-sm text-muted">{site.trustLine.join(" · ")}</p>
        </nav>
      </dialog>
    </header>
  );
}
