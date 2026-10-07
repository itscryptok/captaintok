import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/lib/web3forms";

export default function Services() {
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
      <div className="container mx-auto px-4 py-20 lg:py-28 max-w-3xl">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-10 text-foreground">Services</h1>

        <div className="prose prose-lg text-foreground max-w-none space-y-6">
          <p className="text-muted-foreground">Here are some of the Services that I and my team provides:</p>

          <ul className="space-y-5 list-none p-0">
            <li className="border-b border-border pb-5">
              <p className="text-foreground">
                Passionate about speaking at events on AI governance. Check my work at{" "}
                <a href="https://accentrop.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                  Accentrop.com
                </a>
              </p>
            </li>
            <li className="border-b border-border pb-5">
              <p className="text-foreground">
                Smart marketing solutions for your business's visibility at{" "}
                <a href="https://thinskmedia.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                  Thinskmedia.com
                </a>
              </p>
            </li>
            <li className="border-b border-border pb-5">
              <p className="text-foreground">
                Use apps developed for your everyday use at{" "}
                <a href="https://cryptok.online/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                  Cryp Tok Solutions
                </a>
              </p>
            </li>
            <li className="border-b border-border pb-5">
              <p className="text-foreground">
                Practical steps and assistance to build multiple Income Streams.{" "}
                <a href="/contact" className="text-primary hover:underline font-medium">
                  Contact me
                </a>{" "}
                for free consultation.
              </p>
            </li>
            <li className="border-b border-border pb-5">
              <p className="text-foreground">
                Need help building Creatives for Social Media? Send a DM at{" "}
                <a href="https://tiktok.com/@itsCaptain_Tok" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                  TikTok.com/@itsCaptain_Tok
                </a>
              </p>
            </li>
            <li className="border-b border-border pb-5">
              <p className="text-foreground">
                AI Governance solutions for your organization at{" "}
                <a href="https://accentrop.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                  Accentrop.com
                </a>
              </p>
            </li>
            <li className="pb-5">
              <p className="text-foreground">
                Stay up to date with the direction of business and investing through our daily AI news. Sign-up for our Newsletter to keep yourself up to date.
              </p>
            </li>
          </ul>
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
