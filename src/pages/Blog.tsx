import { useListPosts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const POSTS_PER_PAGE = 6;

const STOP_WORDS = new Set([
  "the","a","an","and","or","but","in","on","at","to","for","of","with",
  "is","it","its","as","by","that","this","are","was","be","from","how",
  "what","who","why","when","where","which","will","can","do","has","have",
]);

const PALETTE: Array<[string, string, string]> = [
  ["#1a3a5c", "#e8f4f8", "#f0a500"],
  ["#2d6a4f", "#d8f3dc", "#f77f00"],
  ["#6b2d8b", "#f3e8ff", "#f0a500"],
  ["#7b3f00", "#fff3e0", "#2d6a4f"],
  ["#1a3a5c", "#fdf6ec", "#c0392b"],
  ["#2c3e50", "#ecf0f1", "#e74c3c"],
];

function getTwoWords(title: string): [string, string] {
  const words = title
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()));
  const first = words[0] ?? title.split(" ")[0];
  const second = words[1] ?? title.split(" ")[1] ?? first;
  return [first, second];
}

function BlogCardImage({ title, index }: { title: string; index: number }) {
  const [w1, w2] = getTwoWords(title);
  const [bg, light, accent] = PALETTE[index % PALETTE.length];

  return (
    <svg
      viewBox="0 0 400 250"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label={title}
    >
      <rect width="400" height="250" fill={bg} />
      {/* Decorative circles */}
      <circle cx="340" cy="40" r="70" fill={accent} opacity="0.18" />
      <circle cx="60" cy="210" r="55" fill={accent} opacity="0.12" />
      <circle cx="200" cy="125" r="130" fill={light} opacity="0.06" />
      {/* Accent bar */}
      <rect x="30" y="160" width="60" height="4" rx="2" fill={accent} opacity="0.85" />
      {/* Word 1 — large */}
      <text
        x="30"
        y="110"
        fontFamily="Georgia, serif"
        fontSize="52"
        fontWeight="bold"
        fill={light}
        opacity="0.95"
      >
        {w1}
      </text>
      {/* Word 2 — smaller, offset */}
      <text
        x="38"
        y="152"
        fontFamily="Georgia, serif"
        fontSize="28"
        fontWeight="normal"
        fill={accent}
        opacity="0.9"
        letterSpacing="2"
      >
        {w2.toUpperCase()}
      </text>
    </svg>
  );
}

export default function Blog() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * POSTS_PER_PAGE;

  const { data: posts, isLoading } = useListPosts({ limit: POSTS_PER_PAGE, offset });

  const hasMore = posts?.length === POSTS_PER_PAGE;

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container mx-auto px-4">
        <header className="mb-16 max-w-3xl">
          <h1 className="text-5xl lg:text-6xl font-serif mb-6 text-foreground">The Insights</h1>
          <p className="text-xl text-muted-foreground">
            Authoritative analysis on artificial intelligence, market trends, and strategies for the modern entrepreneur.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, i) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col h-full" data-testid={`link-blog-post-${post.id}`}>
                  <article className="flex-1 flex flex-col h-full">
                    <div className="aspect-[16/10] mb-6 overflow-hidden rounded-lg">
                      {post.coverImageUrl ? (
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                          <BlogCardImage title={post.title} index={i + offset} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <time className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                      </time>
                      <h2 className="text-2xl font-serif font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-3 mb-6">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-4 border-t border-border w-12 group-hover:w-full transition-all duration-300 border-primary" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-16 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                data-testid="btn-pagination-prev"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              <span className="text-sm font-medium">Page {page}</span>
              <Button
                variant="outline"
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMore}
                data-testid="btn-pagination-next"
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-24 bg-accent rounded-xl border border-border">
            <h3 className="text-2xl font-serif mb-2">No articles found</h3>
            <p className="text-muted-foreground">Check back later for new insights.</p>
          </div>
        )}
      </div>
    </div>
  );
}
