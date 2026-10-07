import { useGetPost, useListPosts } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { Loader2, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterSignup from "@/components/NewsletterSignup";
import CryptokPromo from "@/components/CryptokPromo";

/** Returns true if the string contains HTML tags — already formatted. */
function isHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

/**
 * Converts structured plain-text blog content into formatted HTML.
 * Handles: `---` dividers, section headings, "Label: desc" investment bullets,
 * `#hashtag` chips, newsletter CTA lines, and regular paragraphs.
 */
function formatPlainTextContent(content: string): string {
  const blocks = content.split(/\n\n+/);
  let expectHeading = false;

  return blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // Horizontal rule
    if (trimmed === "---") {
      expectHeading = true;
      return `<hr class="my-10 border-border" />`;
    }

    // Hashtag line — render as styled chips
    if (/^#\w/.test(trimmed) && trimmed.split(/\s+/).every((w) => w.startsWith("#"))) {
      const chips = trimmed
        .split(/\s+/)
        .filter((t) => t.startsWith("#"))
        .map(
          (t) =>
            `<span class="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">${t}</span>`
        )
        .join(" ");
      return `<div class="flex flex-wrap gap-2 my-6">${chips}</div>`;
    }

    // Newsletter CTA line — suppress (component is rendered below)
    if (
      /signup for our newsletter/i.test(trimmed) ||
      /sign up for our newsletter/i.test(trimmed)
    ) {
      return "";
    }

    // Section heading — short line immediately after a `---` divider
    if (expectHeading && trimmed.length < 80 && !trimmed.endsWith(".") && !/^\w+:/.test(trimmed)) {
      expectHeading = false;
      return `<h2 class="text-2xl lg:text-3xl font-serif font-bold text-foreground mt-2 mb-6 pb-3 border-b-2 border-primary/30">${trimmed}</h2>`;
    }

    expectHeading = false;

    // Investment bullet — "Label: description" where label is title-cased words before colon
    const bulletMatch = trimmed.match(/^([A-Z][^:]{2,50}):\s+(.+)/s);
    if (bulletMatch && trimmed.length > 60) {
      const [, label, desc] = bulletMatch;
      return `<div class="flex gap-4 my-4 p-5 bg-accent rounded-xl border-l-4 border-primary shadow-sm">
        <div class="leading-relaxed">
          <span class="font-bold text-foreground">${label}:</span>
          <span class="text-foreground/80"> ${desc.replace(/\n/g, " ")}</span>
        </div>
      </div>`;
    }

    // Regular paragraph
    return `<p class="text-foreground/85 leading-relaxed my-5">${trimmed.replace(/\n/g, "<br />")}</p>`;
  }).join("\n");
}

function renderContent(content: string): string {
  if (isHtml(content)) return content;
  return formatPlainTextContent(content);
}

function PostNav({
  prev,
  next,
}: {
  prev: { id: number; title: string } | null;
  next: { id: number; title: string } | null;
}) {
  if (!prev && !next) return null;
  return (
    <div className="flex items-stretch justify-between gap-4 my-8 not-prose">
      {prev ? (
        <Link
          href={`/blog/${prev.id}`}
          className="group flex-1 flex items-center gap-3 p-4 rounded-xl border border-border bg-accent/40 hover:bg-accent hover:border-primary/40 transition-all duration-200 min-w-0"
        >
          <ChevronLeft className="w-5 h-5 shrink-0 text-primary group-hover:-translate-x-0.5 transition-transform" />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Previous</p>
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/blog/${next.id}`}
          className="group flex-1 flex items-center justify-end gap-3 p-4 rounded-xl border border-border bg-accent/40 hover:bg-accent hover:border-primary/40 transition-all duration-200 text-right min-w-0"
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Next</p>
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">{next.title}</p>
          </div>
          <ChevronRight className="w-5 h-5 shrink-0 text-primary group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || "0", 10);

  const { data: post, isLoading, error } = useGetPost(postId, {
    query: { enabled: !!postId, queryKey: ["getPost", postId] }
  });

  const { data: allPosts } = useListPosts(
    { limit: 200, offset: 0 },
    { query: { queryKey: ["listPosts", "all"] } }
  );

  const sortedPosts = allPosts ?? [];
  const currentIndex = sortedPosts.findIndex((p) => p.id === postId);
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h1 className="text-4xl font-serif mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">Return to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="bg-background min-h-screen pb-24">
      {/* Hero Image — always at the very top when present */}
      {post.coverImageUrl ? (
        <div className="w-full pt-16">
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="pt-20" />
      )}

      {/* Article Header */}
      <header className="pt-10 pb-12 container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-primary hover:underline" data-testid="link-back-to-blog">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Link>
          {nextPost && (
            <Link
              href={`/blog/${nextPost.id}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <span className="hidden sm:inline max-w-[200px] truncate">{nextPost.title}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        <div className="mb-8">
          <time className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </time>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
            <img
              src="/yemi.jpg"
              alt="Yemi"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="font-bold text-foreground">Yemi</p>
            <p className="text-sm text-muted-foreground">Captain Tok</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Cryptok Promo — top of article */}
        <CryptokPromo />

        <div
          className="prose prose-lg md:prose-xl prose-headings:font-serif prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none text-foreground/90"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Post navigation — bottom */}
        <PostNav prev={prevPost} next={nextPost} />

        {/* Author Box */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="bg-accent rounded-xl p-8 text-center sm:text-left sm:flex items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-secondary overflow-hidden mx-auto sm:mx-0 mb-6 sm:mb-0 flex-shrink-0">
              <img
                src="/yemi.jpg"
                alt="Yemi"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold mb-2">Written by Yemi</h3>
              <p className="text-muted-foreground mb-4">Founder of Cryp Tok Solutions and Thinsk Media. Author of "Selling Rain to the Ocean".</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/about">More about the author</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
