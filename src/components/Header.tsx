import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { BookOpen, Brain, Shuffle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ConceptCards
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-2">
              <Brain size={18} />
              Learn
            </Link>
            <Link to="/manage" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-2">
              <Settings size={18} />
              Manage Cards
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md font-medium">
              Learn
            </Link>
            <Link to="/manage" className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md font-medium">
              Manage Cards
            </Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md font-medium">
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}