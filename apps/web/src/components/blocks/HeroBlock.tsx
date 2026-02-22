"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

import { urlFor } from "@/sanity/image";

import type { PageBlocks } from "./BlockRenderer";

export type HeroBlockProps = Extract<
  NonNullable<PageBlocks>[number],
  { _type: "hero" }
>;

export function HeroBlock({
  sectionId,
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  image,
}: HeroBlockProps) {
  return (
    <section
      id={sectionId || "hero"}
      className="relative overflow-hidden bg-white dark:bg-zinc-950 pt-30 pb-16 md:pt-37.5 md:pb-30"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full px-4 lg:w-5/12">
            <div className="max-w-125 mb-12 lg:mb-0">
              {heading && (
                <h1 className="mb-6 text-4xl font-extrabold leading-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-5xl sm:leading-tight">
                  {heading}
                </h1>
              )}
              {subheading && (
                <p className="mb-10 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {subheading}
                </p>
              )}
              {ctaLabel && ctaHref && (
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={ctaHref}
                    onClick={() =>
                      trackEvent({
                        event: "cta_click",
                        cta_name: ctaLabel,
                        cta_position: "hero",
                      })
                    }
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    {ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="w-full px-4 lg:w-7/12">
            <div className="relative z-10 lg:ml-auto max-w-162.5">
              {image ? (
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={urlFor(image).url()}
                    alt={heading || "Hero Image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              ) : (
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-linear-to-tr from-indigo-100 to-amber-50 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-400 dark:text-zinc-600 text-sm font-medium">
                    Image Placeholder
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
