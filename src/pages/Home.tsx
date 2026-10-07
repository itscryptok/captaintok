import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetRecentPosts } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useState } from "react";
import { submitContactForm } from "@/lib/web3forms";

export default function Home() {
  const { data: recentPosts, isLoading } = useGetRecentPosts();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "", websiteUrl: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm(contactForm);
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      setContactForm({ name: "", email: "", message: "", websiteUrl: "" });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to send. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Testimonial / Hero Banner */}
      <section className="bg-secondary text-secondary-foreground py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg lg:text-xl italic text-white/90 leading-relaxed">
                "This is a really good e-book for any business looking to grow and succeed. Use it to sharpen your perspective &amp; drive."
              </p>
              <p className="mt-4 text-sm text-white/60 font-semibold tracking-widest uppercase">— Cletus O.</p>
              <div className="mt-6">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="btn-hero-read-books">
                  <Link href="/books">Read Books</Link>
                </Button>
              </div>
            </div>
            <Link href="/books" className="flex-shrink-0">
              <div className="w-28 sm:w-32 aspect-[3/4] rounded-lg overflow-hidden shadow-xl border border-white/20">
                <img
                  src="https://d1an6hb2j63rg7.cloudfront.net/book_front_ea25ae8aa3.webp"
                  alt="Selling Rain to the Ocean"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-serif text-foreground">
              <Link href="/blog" className="hover:text-primary transition-colors" data-testid="link-blog-heading">AI News &amp; Investing Blog</Link>
            </h2>
            <Button asChild variant="link" className="text-primary text-base hidden md:flex" data-testid="link-all-posts">
              <Link href="/blog">View All Blog Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-6 py-8 border-b border-border">
                  <div className="h-5 bg-muted w-32 rounded" />
                  <div className="h-5 bg-muted w-3/4 rounded" />
                </div>
              ))}
            </div>
          ) : recentPosts && recentPosts.length > 0 ? (
            <div className="space-y-0">
              {recentPosts.map((post) => (
                <div key={post.id} className="py-7 border-b border-border last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
                    <time className="text-sm font-medium text-primary/80 whitespace-nowrap flex-shrink-0 pt-1 min-w-[100px]">
                      {format(new Date(post.publishedAt), "MMM d, yyyy")}
                    </time>
                    <div className="flex-1">
                      <Link href={`/blog/${post.id}`} className="group" data-testid={`link-post-${post.id}`}>
                        <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors mb-3 leading-snug">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-foreground/70 text-base leading-relaxed line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="text-primary text-sm font-semibold group-hover:underline">Read More →</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">No recent articles found.</div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" size="lg" className="w-full" data-testid="link-all-posts-mobile">
              <Link href="/blog">View All Blog Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 bg-secondary text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-2">Stay Ahead of the AI Curve</h2>
          <p className="text-white/70 text-base mb-8">Get the latest AI news and investing insights delivered to your inbox. No spam — ever.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-13 px-5 py-3.5 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder:text-white/50 text-base focus:outline-none focus:border-primary focus:bg-white/15 transition-all"
              required
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-lg font-semibold text-base shrink-0"
              data-testid="btn-newsletter-submit"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Book */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-64 flex-shrink-0">
              <Link href="/books">
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-border/50">
                  <img
                    src="https://d1an6hb2j63rg7.cloudfront.net/book_front_ea25ae8aa3.webp"
                    alt="Selling Rain to the Ocean"
                    className="w-full h-full object-cover"
                    data-placeholder="BOOK_COVER_IMAGE"
                  />
                </div>
              </Link>
            </div>
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl lg:text-6xl font-serif leading-tight text-foreground">
                Selling Rain to the Ocean
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Are you looking to grow your business? Obviously there is no harm in marketing your inventions or products to your immediate community or network. They should in fact be your first line of encouragement and mass sales when launching out. But one thing to note when selling to them, make sure that you are doing it from a place of strength.
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="btn-hero-buy-book">
                <Link href="/books">Buy Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-accent border-t border-border">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl font-serif font-bold mb-2 text-center">Contact Me</h2>
          <p className="text-muted-foreground text-center mb-8">Want to talk about any of the books, services, or your event?</p>
          <form onSubmit={handleContact} className="space-y-4" data-testid="form-home-contact">
            <input
              type="text"
              placeholder="Name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="input-home-contact-name"
            />
            <input
              type="email"
              placeholder="Email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="input-home-contact-email"
            />
            <textarea
              placeholder="Message"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
              data-testid="input-home-contact-message"
            />
            <input
              type="url"
              placeholder="Website URL (optional)"
              value={contactForm.websiteUrl}
              onChange={(e) => setContactForm({ ...contactForm, websiteUrl: e.target.value })}
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="input-home-contact-website"
            />
            <Button type="submit" size="lg" className="w-full" disabled={submitting} data-testid="btn-home-contact-submit">
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
