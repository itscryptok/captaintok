import { useListDigests } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Loader2, ArrowUp } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import NewsletterSignup from "@/components/NewsletterSignup";
import ThinkMediaPromo from "@/components/ThinkMediaPromo";
import { useEffect, useState } from "react";

export default function Reader() {
  const { data: digests, isLoading } = useListDigests();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container mx-auto px-4">
        <header className="mb-16 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-serif mb-6 text-foreground">Daily Reader</h1>
          <p className="text-xl text-muted-foreground">
            Bite-sized stories and insights for the next generation. Quick reads delivered daily.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : digests && digests.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-12">
            {digests.map((digest) => (
              <article key={digest.id} className="bg-card border border-border rounded-xl p-8 lg:p-12 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />

                <header className="mb-6 border-b border-border pb-6">
                  <time className="text-sm font-bold text-primary mb-3 uppercase tracking-wider block">
                    {format(new Date(digest.digestDate), "EEEE, MMMM d, yyyy")}
                  </time>
                  <h2 className="text-3xl font-serif font-bold text-foreground leading-tight">
                    {digest.title}
                  </h2>
                </header>

                <div
                  className="prose prose-lg max-w-none text-muted-foreground prose-p:leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: digest.content }}
                />

                {/* Thinsk Media Promo */}
                <ThinkMediaPromo />

                {/* Newsletter Signup */}
                <NewsletterSignup />

                {/* Author Box */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="bg-accent rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                      <img
                        src="/yemi.jpg"
                        alt="Yemi"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="font-serif text-xl font-bold mb-1">Written by Yemi</h3>
                      <p className="text-muted-foreground text-sm mb-3">Captain Tok — AI News, Investing & Children's Daily Reader</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/about">More about the author</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-accent rounded-xl border border-border max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif mb-2">No daily digests yet</h3>
            <p className="text-muted-foreground">The first story is coming soon.</p>
          </div>
        )}
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/90 hover:scale-110 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
