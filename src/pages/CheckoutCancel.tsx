import { Link } from "wouter";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutCancel() {
  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <XCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Checkout Cancelled</h1>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
          Your payment was cancelled. No charges were made to your account.
        </p>
        
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90" data-testid="btn-cancel-back">
          <Link href="/books"><ArrowLeft className="mr-2 h-5 w-5" /> Return to Books</Link>
        </Button>
      </div>
    </div>
  );
}
