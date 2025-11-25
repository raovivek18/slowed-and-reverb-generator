
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AnimatedWaveLogo from './AnimatedWaveLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-white/10 sticky top-0 z-50 bg-darkBg/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <AnimatedWaveLogo animated={true} />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
            <Link to="/privacy-policy" className="text-white/80 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-darkBg border-l border-white/10">
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/" 
                  className="text-white/80 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-white/80 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/privacy-policy" 
                  className="text-white/80 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Privacy
                </Link>
                <Link 
                  to="/terms" 
                  className="text-white/80 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Terms
                </Link>
                <Link 
                  to="/contact" 
                  className="text-white/80 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
