import { Link } from "wouter";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4" data-testid="link-footer-logo">
              <img src="/logo.jpg" alt="Captain Tok" className="w-10 h-10 rounded-full object-cover object-top" />
              <span className="font-serif text-3xl font-bold italic text-white">CaptainTok.com</span>
            </Link>
            <p className="text-secondary-foreground/80 max-w-sm text-lg font-serif">
              AI News & Investing by Yemi, aka Captain Tok.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors" data-testid="link-footer-about">About</Link></li>
              <li><Link href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors" data-testid="link-footer-services">Services</Link></li>
              <li><Link href="/blog" className="text-secondary-foreground/80 hover:text-primary transition-colors" data-testid="link-footer-blog">Blog</Link></li>
              <li><Link href="/books" className="text-secondary-foreground/80 hover:text-primary transition-colors" data-testid="link-footer-books">Books</Link></li>
              <li><Link href="/reader" className="text-secondary-foreground/80 hover:text-primary transition-colors" data-testid="link-footer-reader">Reader</Link></li>
              <li><Link href="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors" data-testid="link-footer-contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Connect</h4>
            <div className="flex gap-4">
              <a 
                href="https://tiktok.com/@itsCaptain_Tok" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                data-testid="link-footer-tiktok"
              >
                <SiTiktok className="w-5 h-5" />
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Captain Tok. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
