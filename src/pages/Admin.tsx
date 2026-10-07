import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { Lock, Users, Mail, BookOpen, FileText, Calendar, LogOut, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const TOKEN_KEY = "addy_token";

interface AdminData {
  subscribers: { id: number; email: string; createdAt: string }[];
  contacts: { id: number; name: string; email: string; message: string; createdAt: string }[];
  posts: { id: number; title: string; publishedAt: string }[];
  books: { id: number; title: string; price: string }[];
  digests: { id: number; title: string; digestDate: string }[];
}

function StatCard({ icon, label, count, color }: { icon: React.ReactNode; label: string; count: number; color: string }) {
  return (
    <div className={`rounded-xl p-5 border ${color} flex items-center gap-4`}>
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-3xl font-bold">{count}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 bg-accent text-left font-semibold text-foreground hover:bg-accent/80 transition-colors"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async (t: string) => {
    setDataLoading(true);
    try {
      const res = await fetch("/api/admin/data", { headers: { Authorization: `Bearer ${t}` } });
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        return;
      }
      setData(await res.json());
    } catch {
      toast({ title: "Failed to load data", variant: "destructive" });
    } finally {
      setDataLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (token) fetchData(token);
  }, [token, fetchData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        toast({ title: "Wrong password", variant: "destructive" });
        return;
      }
      const { token: t } = await res.json() as { token: string };
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      setPassword("");
    } catch {
      toast({ title: "Login failed", variant: "destructive" });
    } finally {
      setLoginLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setData(null);
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-serif font-bold">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-1">CaptainTok.com</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading ? "Checking…" : "Enter"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-background z-10">
        <div>
          <h1 className="text-xl font-serif font-bold">Admin Dashboard</h1>
          <p className="text-xs text-muted-foreground">CaptainTok.com</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => token && fetchData(token)} disabled={dataLoading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${dataLoading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {dataLoading && !data && (
          <div className="flex justify-center py-20 text-muted-foreground">Loading…</div>
        )}

        {data && (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard icon={<Users className="w-6 h-6 text-blue-500" />} label="Subscribers" count={data.subscribers.length} color="border-blue-200 bg-blue-50/50" />
              <StatCard icon={<Mail className="w-6 h-6 text-orange-500" />} label="Contacts" count={data.contacts.length} color="border-orange-200 bg-orange-50/50" />
              <StatCard icon={<FileText className="w-6 h-6 text-green-500" />} label="Blog Posts" count={data.posts.length} color="border-green-200 bg-green-50/50" />
              <StatCard icon={<BookOpen className="w-6 h-6 text-purple-500" />} label="Books" count={data.books.length} color="border-purple-200 bg-purple-50/50" />
              <StatCard icon={<Calendar className="w-6 h-6 text-rose-500" />} label="Reader Entries" count={data.digests.length} color="border-rose-200 bg-rose-50/50" />
            </div>

            {/* Newsletter Subscribers */}
            <Section title={`Newsletter Subscribers (${data.subscribers.length})`}>
              {data.subscribers.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No subscribers yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-2 pr-4 font-medium">#</th>
                        <th className="pb-2 pr-4 font-medium">Email</th>
                        <th className="pb-2 font-medium">Signed Up</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.subscribers.map((s, i) => (
                        <tr key={s.id} className="border-b border-border/50 last:border-0">
                          <td className="py-2 pr-4 text-muted-foreground">{i + 1}</td>
                          <td className="py-2 pr-4 font-medium">{s.email}</td>
                          <td className="py-2 text-muted-foreground">{format(new Date(s.createdAt), "MMM d, yyyy h:mm a")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>

            {/* Contact Form Submissions */}
            <Section title={`Contact Form Submissions (${data.contacts.length})`} defaultOpen={false}>
              {data.contacts.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No contact submissions yet.</p>
              ) : (
                <div className="space-y-4">
                  {data.contacts.map((c) => (
                    <div key={c.id} className="border border-border rounded-lg p-4 bg-accent/30">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="font-semibold">{c.name}</span>
                          <span className="text-muted-foreground text-sm ml-2">({c.email})</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{format(new Date(c.createdAt), "MMM d, yyyy h:mm a")}</span>
                      </div>
                      <p className="text-sm text-foreground/80 whitespace-pre-wrap">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* Blog Posts */}
            <Section title={`Blog Posts (${data.posts.length})`} defaultOpen={false}>
              <div className="space-y-2">
                {data.posts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm font-medium">{p.title}</span>
                    <span className="text-xs text-muted-foreground ml-4 shrink-0">{format(new Date(p.publishedAt), "MMM d, yyyy")}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Reader Digests */}
            <Section title={`Reader Digests (${data.digests.length})`} defaultOpen={false}>
              <div className="space-y-2">
                {data.digests.map((d) => (
                  <div key={d.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm font-medium">{d.title}</span>
                    <span className="text-xs text-muted-foreground ml-4 shrink-0">{format(new Date(d.digestDate), "MMM d, yyyy")}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Books */}
            <Section title={`Books (${data.books.length})`} defaultOpen={false}>
              <div className="space-y-2">
                {data.books.map((b) => (
                  <div key={b.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm font-medium">{b.title}</span>
                    <span className="text-xs text-muted-foreground">${Number(b.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}
      </main>
    </div>
  );
}
