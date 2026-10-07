import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { submitContactForm } from "@/lib/web3forms";

export default function About() {
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
    <div className="bg-background min-h-screen">
      {/* About Section */}
      <div className="container mx-auto px-4 py-20 lg:py-28 max-w-5xl">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-10 text-foreground">About AI News &amp; Investing</h1>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="prose prose-lg text-muted-foreground prose-p:leading-relaxed space-y-5">
            <p>
              AI News &amp; Investing blog is put together by Yemi. His creative artist &amp; playtime name on Social Media is Captain Tok. Yemi is the founder of{" "}
              <a href="https://cryptok.online/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                Cryp Tok Solutions
              </a>
              , building multiple AI/tech apps for everyday use. He also writes self-help books that helps to open readers' minds to opportunities in their various areas of expertise. You can download his ebook focused on marketing, titled —{" "}
              <Link href="/books" className="text-primary hover:underline font-medium">
                Selling Rain to the Ocean
              </Link>
              .
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-secondary rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/yemi.jpg"
                alt="Yemi - Captain Tok"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <section className="py-16 bg-accent border-t border-border">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="text-2xl font-serif font-bold mb-2">Sign up for my Newsletter</h2>
          <p className="text-muted-foreground mb-6">Signup for news and special offers!</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
            <Button type="submit" size="lg" className="h-12 px-6">Sign Up</Button>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl font-serif font-bold mb-2 text-center">Contact Me</h2>
          <p className="text-muted-foreground text-center mb-8">Want to talk about any of the books, services, or your event?</p>
          <form onSubmit={handleContact} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <input
              type="email"
              placeholder="Email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <textarea
              placeholder="Message"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
            />
            <input
              type="url"
              placeholder="Website URL (optional)"
              value={contactForm.websiteUrl}
              onChange={(e) => setContactForm({ ...contactForm, websiteUrl: e.target.value })}
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
