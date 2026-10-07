import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { CheckCircle2, ArrowRight, Download, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadInfo {
  token: string;
  expiresAt: string;
  bookTitle: string;
}

export default function CheckoutSuccess() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");

  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);
  const [fetchState, setFetchState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    setFetchState("loading");
    fetch(`/api/checkout/download?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => {
        if (!r.ok) throw new Error("not ok");
        return r.json() as Promise<DownloadInfo>;
      })
      .then((data) => {
        setDownloadInfo(data);
        setFetchState("done");
        const ms = new Date(data.expiresAt).getTime() - Date.now();
        setTimeLeft(Math.max(0, Math.floor(ms / 1000)));
      })
      .catch(() => setFetchState("error"));
  }, [sessionId]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => (t !== null ? Math.max(0, t - 1) : null)), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  const downloadUrl = downloadInfo
    ? `/api/checkout/file?token=${encodeURIComponent(downloadInfo.token)}`
    : null;

  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Payment Successful!</h1>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
          Thank you for your purchase. Your download link is ready below.
        </p>

        {/* Download section */}
        {sessionId && (
          <div className="mb-10 bg-accent rounded-xl p-6 text-left">
            {fetchState === "loading" && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Preparing your download…</span>
              </div>
            )}

            {fetchState === "done" && downloadInfo && (
              <div>
                <p className="font-semibold text-foreground mb-1">{downloadInfo.bookTitle}</p>
                {timeLeft !== null && timeLeft > 0 ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4" />
                      <span>Link expires in <span className="font-mono font-bold text-foreground">{formatTime(timeLeft)}</span></span>
                    </div>
                    <Button asChild size="lg" className="w-full gap-2">
                      <a href={downloadUrl!} download>
                        <Download className="w-5 h-5" /> Download Your Book (PDF)
                      </a>
                    </Button>
                  </>
                ) : (
                  <p className="text-destructive text-sm">Your download link has expired. Please contact support if you need help.</p>
                )}
              </div>
            )}

            {fetchState === "error" && (
              <p className="text-sm text-muted-foreground">
                Couldn't generate a download link. Please{" "}
                <Link href="/contact" className="text-primary underline">contact us</Link>{" "}
                with your order details and we'll send it to you.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90" data-testid="btn-success-home">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" data-testid="btn-success-books">
            <Link href="/books">Browse More Books <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
