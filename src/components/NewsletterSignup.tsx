import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        toast({ title: "Already subscribed!", description: "This email is already on our list." });
        setEmail("");
        return;
      }
      if (!res.ok) throw new Error("Submission failed");

      toast({ title: "You're in!", description: "Thanks for subscribing to AI news updates." });
      setEmail("");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-secondary/10 border border-border rounded-xl p-8 my-10">
      <h3 className="font-serif text-xl font-bold mb-1 text-foreground">Stay Informed on AI News</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Get newsletter reminders so you never miss early investment opportunities.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading} className="shrink-0">
          {loading ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
