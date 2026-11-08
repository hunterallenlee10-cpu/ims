"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/hooks/useScrolled";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Sticky nav: transparent over the hero, solid with blur after scrolling, menu dialog on mobile. */
export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled(12);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-accent/40 bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-3.5 text-[0.92rem] transition-colors",
                      active ? "text-heading" : "text-body hover:text-heading",
                    )}
                  >
                    {link.label}
                    {active ? (
                      <span aria-hidden="true" className="absolute inset-x-3.5 bottom-1.5 h-px bg-accent-light" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={site.joinHref} className="max-sm:hidden">
            {site.joinLabel}
          </Button>
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-site-sm border border-line text-heading transition-colors hover:border-accent-light lg:hidden"
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
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-body backdrop:bg-bg/80 lg:hidden"
      >
        <div className="container-site flex h-[var(--header-h)] items-center justify-between border-b border-line">
          <Wordmark />
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
        <nav aria-label="Mobile" className="container-site py-8">
          <ul className="divide-y divide-line border-y border-line">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  onClick={() => dialogRef.current?.close()}
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
