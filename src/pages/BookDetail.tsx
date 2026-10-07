import { useParams, Link } from "wouter";
import { useGetBook, useCreateCheckoutSession } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function BookDetail() {
  const params = useParams<{ id: string }>();
  const bookId = parseInt(params.id ?? "0", 10);
  const { data: book, isLoading } = useGetBook(bookId);
  const createCheckout = useCreateCheckoutSession();
  const { toast } = useToast();
  const [purchasing, setPurchasing] = useState(false);

  const handleBuy = () => {
    setPurchasing(true);
    createCheckout.mutate(
      { data: { bookId } },
      {
        onSuccess: (res) => {
          if (res.url) window.location.href = res.url;
        },
        onError: () => {
          setPurchasing(false);
          toast({ variant: "destructive", title: "Checkout failed", description: "Could not initiate checkout. Please try again." });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif mb-4">Book not found</h1>
        <Link href="/books" className="text-primary hover:underline">← Back to Books</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/books" className="inline-flex items-center text-primary hover:underline mb-10 text-sm font-medium" data-testid="link-back-books">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Books
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-border/50">
              {book.coverImageUrl ? (
                <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-[#7A3B2E] p-6 flex items-center justify-center">
                  <span className="font-serif text-white font-bold text-xl text-center leading-tight">{book.title}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight">{book.title}</h1>

            <div className="flex flex-col gap-1 mb-6 text-sm text-muted-foreground border border-border rounded-lg p-4 bg-card">
              <p><span className="font-medium text-foreground">Format:</span> eBook</p>
              <p><span className="font-medium text-foreground">Type:</span> ePub / PDF</p>
              <p><span className="font-medium text-foreground">Delivery:</span> via email</p>
              <p className="text-2xl font-bold text-primary mt-2">${Number(book.price).toFixed(2)}</p>
            </div>

            <div className="flex gap-3 mb-8">
              <Button size="lg" onClick={handleBuy} disabled={purchasing} data-testid="btn-buy-book">
                {purchasing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Buy Now"}
              </Button>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
