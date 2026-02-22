export interface TestimonialItem {
  _key: string;
  quote?: string | null;
  author?: string | null;
  role?: string | null;
  avatar?: Record<string, unknown>;
}

export interface TestimonialBlockProps {
  heading?: string | null;
  testimonials?: TestimonialItem[] | null;
}

export function TestimonialBlock({
  heading,
  testimonials,
}: TestimonialBlockProps) {
  return (
    <section className="py-24 bg-indigo-50 dark:bg-indigo-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {heading && (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              {heading}
            </h2>
          </div>
        )}

        {testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._key}
                className="bg-white dark:bg-zinc-950 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800"
              >
                <div className="flex text-amber-400 mb-6">
                  {/* Star rating icons */}
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={`star-${i}-${testimonial._key}`}
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex shrink-0">
                    {testimonial.avatar ? (
                      <div className="w-full h-full text-xs flex items-center justify-center text-zinc-400 text-center">
                        Sanity Img
                      </div>
                    ) : (
                      <svg
                        aria-hidden="true"
                        className="w-full h-full text-zinc-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
