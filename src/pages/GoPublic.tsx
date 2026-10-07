import { Link } from "wouter";
import { MessageCircle, Mail, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const whyReasons = [
  {
    text: "First is, I am passionate about seeing my community become builders.",
  },
  {
    text: "I am currently building my own AI company in public — ",
    link: { label: "Cryptok.online", href: "https://cryptok.online" },
  },
  {
    text: "Have written books on AI business development and other areas.",
  },
  {
    text: "Have gone through the lows of building and can share practical experiences.",
  },
  {
    text: "Have done multiple public speaking in the past, not just once. At Forex Trading Seminar Nigeria 2006, TEDx at AOL Baltimore 2014, Career & Business Development Seminar 2024.",
  },
  {
    text: "To help those who wouldn't read self-help books. The information I share helps anyone gain practical insight.",
  },
];

const contactOptions = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "Calendly",
    value: "Contact me and I'll send you my Calendly link",
    href: "/contact",
    external: false,
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "TikTok",
    value: "DM on TikTok.com (Search for Captain Tok)",
    href: "https://tiktok.com/@itsCaptain_Tok",
    external: true,
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "X (Twitter)",
    value: "x.com/itsCryp_tok",
    href: "https://x.com/itsCryp_tok",
    external: true,
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "Instagram",
    value: "instagram.com/itsCryp_tok",
    href: "https://instagram.com/itsCryp_tok",
    external: true,
  },
  {
    icon: <ExternalLink className="w-5 h-5" />,
    label: "Contact Form",
    value: "Use contact form at CaptainTok.com",
    href: "/contact",
    external: false,
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "itsCryptok@gmail.com",
    href: "mailto:itsCryptok@gmail.com",
    external: true,
  },
];

const websites = [
  { label: "Cryptok.online", href: "https://cryptok.online" },
  { label: "CaptainTok.com", href: "https://captaintok.com" },
  { label: "Thinskmedia.com", href: "https://thinskmedia.com" },
];

export default function GoPublic() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-secondary text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-4">
            Yemi / Captain Tok
          </p>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6">
            Community Giveaway
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Silver or gold have I not, but can volunteer some of my time to support community building.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 px-4 bg-accent/40">
        <div className="max-w-3xl mx-auto space-y-5 text-foreground/80 text-lg leading-relaxed">
          <p>
            If interested, proceed to book my time to come speak at any of your events on{" "}
            <span className="font-semibold text-foreground">"AI business developments"</span>.
          </p>
          <p>
            Or to speak on other focus areas in one of my other books at{" "}
            <a
              href="https://captaintok.com/books"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              CaptainTok.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Why doing this? */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
            Why doing this?
          </h2>
          <ul className="space-y-5">
            {whyReasons.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-foreground/80 text-base leading-relaxed">
                  {item.text}
                  {item.link && (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:underline"
                    >
                      {item.link.label}
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-secondary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-3">Get in Touch</h2>
          <p className="text-white/70 mb-10">
            Ready to book? Reach out through any of the options below.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactOptions.map((opt) => (
              <div
                key={opt.label}
                className="bg-white/10 rounded-xl p-5 flex flex-col items-center gap-3 border border-white/20"
              >
                <div className="text-white/70">{opt.icon}</div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                  {opt.label}
                </p>
                {opt.external ? (
                  <a
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold text-sm text-center hover:text-primary transition-colors break-all"
                  >
                    {opt.value}
                  </a>
                ) : (
                  <Link
                    href={opt.href}
                    className="text-white font-semibold text-sm text-center hover:text-primary transition-colors"
                  >
                    {opt.value}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Websites */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Globe className="w-4 h-4 text-white/60" />
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">My Websites</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {websites.map((site) => (
                <a
                  key={site.label}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:text-primary transition-colors text-sm"
                >
                  {site.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/contact">Send a Message</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
