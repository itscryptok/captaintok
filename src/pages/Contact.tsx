import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { submitContactForm } from "@/lib/web3forms";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "", websiteUrl: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm(form);
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      setForm({ name: "", email: "", message: "", websiteUrl: "" });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to send message. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-20 lg:py-28 max-w-xl">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 text-foreground">Contact Me</h1>
        <p className="text-xl text-muted-foreground mb-10">
          Want to talk about any of the books, services, or your event?
        </p>

        <form onSubmit={onSubmit} className="space-y-4" data-testid="form-contact">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="input-contact-name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="input-contact-email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
              data-testid="input-contact-message"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="contact-website">Website URL (optional)</label>
            <input
              id="contact-website"
              type="url"
              placeholder="Website URL (optional)"
              value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="input-contact-website"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitting}
            data-testid="btn-contact-submit"
          >
            {submitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
