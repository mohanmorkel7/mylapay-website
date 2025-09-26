import { useState, useEffect, useRef } from "react";
import ScrollScale from "@/components/ui/scroll-scale";

export default function Testimonials() {
  // Testimonials data and carousel control
  const testimonials = [
    {
      quote:
        "We want to express our sincere gratitude for our partnership. Your module has provided us with valuable and practical insights into our business, and we look forward to further strengthening our partnership.",
      name: "Chetan Nagaraju",
      position: "Senior Director Business Finance",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F2267678df3644282aa24593b357b4ca2%2F1626d4980a484a2ba75331b950dee58a?format=webp&width=800",
    },
    {
      quote:
        "Their team helped us integrate quickly and provided responsive support. Transactions are processed reliably and reporting is clear. We consider them a key partner in our growth.",
      name: "Nisha Patel",
      position: "Head of Payments",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F2267678df3644282aa24593b357b4ca2%2F4575d02a18f94f56b5766301b38ddcfa?format=webp&width=800",
    },
    {
      quote:
        "By optimizing routing and reconciliation, we reduced costs and improved success rates. Their analytics gave us actionable insights that drove measurable results.",
      name: "Rajat Singh",
      position: "VP, Operations",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F2267678df3644282aa24593b357b4ca2%2Fb148ff70afea41c9be7f8de2dbd7aee9?format=webp&width=800",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      testimonialIntervalRef.current = window.setInterval(() => {
        setCurrentTestimonial((i) => (i + 1) % testimonials.length);
      }, 6000);
    };

    start();
    return () => {
      if (testimonialIntervalRef.current)
        window.clearInterval(testimonialIntervalRef.current);
    };
  }, [testimonials.length]);

  const pauseTestimonials = () => {
    if (testimonialIntervalRef.current) {
      window.clearInterval(testimonialIntervalRef.current);
      testimonialIntervalRef.current = null;
    }
  };

  const resumeTestimonials = () => {
    if (!testimonialIntervalRef.current) {
      testimonialIntervalRef.current = window.setInterval(() => {
        setCurrentTestimonial((i) => (i + 1) % testimonials.length);
      }, 6000);
    }

  };


    return(
              <section id="testimonials" className="bg-white">
                <ScrollScale
                  as="div"
                  className="container mx-auto py-12 md:py-16"
                  fromX={160}
                  toX={0}
                  fromScale={0.7}
                  toScale={1}
                  fromOpacity={0.12}
                  toOpacity={1}
                  startViewportRatio={1}
                  endViewportRatio={0.1}
                >
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-5xl">
                      {/* decorative shadow under the carousel */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[94%] h-8 bg-white rounded-xl filter blur-2xl opacity-40"></div>
        
                      <div
                        className="relative"
                        onMouseEnter={pauseTestimonials}
                        onMouseLeave={resumeTestimonials}
                      >
                        <div className="overflow-hidden min-h-[220px]">
                          <div className="relative h-auto">
                            {testimonials.map((t, idx) => (
                              <div
                                key={idx}
                                className={`w-full transition-all duration-700 ease-[cubic-bezier(.2,.9,.3,1)] ${
                                  idx === currentTestimonial
                                    ? "opacity-100 translate-y-0 block"
                                    : "opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden"
                                }`}
                              >
                                <div className="rounded-2xl border-2 border-slate-200 bg-white p-10 md:p-12 shadow-[0_18px_30px_rgba(16,24,40,0.08)]">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    <div>
                                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                        {t.quote.split(" ").slice(0, 8).join(" ")}
                                        {t.quote.length > 0 ? "..." : ""}
                                      </h3>
                                    </div>
        
                                    <div className="flex flex-col items-start md:items-end">
                                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                        {t.quote}
                                      </p>
        
                                      <div className="mt-6 flex items-center gap-4">
                                        <img
                                          src={t.logo}
                                          alt={`${t.name} logo`}
                                          className="h-10 w-auto sm40"
                                        />
                                        <div className="text-left md:text-right">
                                          <div className="text-sm font-semibold text-slate-900">
                                            {t.name}
                                          </div>
                                          <div className="text-xs text-slate-500">
                                            {t.position}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
        
                        {/* Dots */}
                        <div className="mt-6 flex items-center justify-center gap-3">
                          {testimonials.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentTestimonial(i)}
                              className={`h-2 w-8 rounded-full transition-all ${i === currentTestimonial ? "bg-slate-800" : "bg-slate-200"}`}
                              aria-label={`Show testimonial ${i + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollScale>
              </section>
    );
}