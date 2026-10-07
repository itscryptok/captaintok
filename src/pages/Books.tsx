import { useListBooks, useCreateCheckoutSession } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "wouter";

export default function Books() {
  const { data: books, isLoading } = useListBooks();
  const createCheckout = useCreateCheckoutSession();
  const { toast } = useToast();
  const [purchasingId, setPurchasingId] = useState<number | null>(null);

  const handleBuy = (bookId: number) => {
    setPurchasingId(bookId);
    createCheckout.mutate(
      { data: { bookId } },
      {
        onSuccess: (res) => {
          if (res.url) {
            window.location.href = res.url;
          }
        },
        onError: () => {
          setPurchasingId(null);
          toast({
            variant: "destructive",
            title: "Checkout failed",
            description: "Could not initiate checkout. Please try again.",
          });
        }
      }
    );
  };

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 text-foreground">Self-help books</h1>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : books && books.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-10">
            {books.map((book) => (
              <div key={book.id} className="flex flex-col" data-testid={`book-${book.id}`}>
                <Link href={`/books/${book.id}`}>
                  <div className="aspect-[3/4] bg-secondary rounded-lg overflow-hidden shadow-lg border border-border/50 mb-4 hover:opacity-95 transition-opacity">
                    {book.coverImageUrl ? (
                      <img
                        src={book.coverImageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-[#7A3B2E] p-6 flex flex-col items-center justify-center text-center">
                        <span className="font-serif text-white font-bold text-lg leading-tight">{book.title}</span>
                      </div>
                    )}
                  </div>
                </Link>

                <Link href={`/books/${book.id}`} className="hover:text-primary transition-colors">
                  <h2 className="font-serif font-bold text-lg mb-2 leading-snug">{book.title}</h2>
                </Link>

                <div className="flex gap-3 mb-3">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleBuy(book.id)}
                    disabled={purchasingId === book.id}
                    data-testid={`btn-buy-book-${book.id}`}
                  >
                    {purchasingId === book.id ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                      "Buy Now"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    data-testid={`btn-learn-more-${book.id}`}
                  >
                    <Link href={`/books/${book.id}`}>Learn More</Link>
                  </Button>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-accent rounded-xl border border-border">
            <h3 className="text-2xl font-serif mb-2">No books available</h3>
            <p className="text-muted-foreground">Check back later for new releases.</p>
          </div>
        )}
      </div>
    </div>
  );
}
