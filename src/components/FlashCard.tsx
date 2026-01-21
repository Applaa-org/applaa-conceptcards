import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface FlashCardProps {
  concept: any;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function FlashCard({ concept, isFlipped, onFlip, onNext, onPrevious, canGoNext, canGoPrevious }: FlashCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleStart = (e: TouchEvent | MouseEvent) => {
      isDragging = true;
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging) return;
      currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      
      const diff = currentX - startX;
      const rotation = Math.max(-10, Math.min(10, diff * 0.1));
      card.style.transform = `translateX(${diff}px) rotate(${rotation}deg)`;
    };

    const handleEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      
      const diff = currentX - startX;
      if (Math.abs(diff) > 100) {
        if (diff > 0 && canGoPrevious) {
          onPrevious();
        } else if (diff < 0 && canGoNext) {
          onNext();
        }
      }
      
      card.style.transform = '';
      currentX = 0;
    };

    // Touch events
    card.addEventListener('touchstart', handleStart as any);
    card.addEventListener('touchmove', handleMove as any);
    card.addEventListener('touchend', handleEnd);
    
    // Mouse events
    card.addEventListener('mousedown', handleStart as any);
    card.addEventListener('mousemove', handleMove as any);
    card.addEventListener('mouseup', handleEnd);
    card.addEventListener('mouseleave', handleEnd);

    return () => {
      card.removeEventListener('touchstart', handleStart as any);
      card.removeEventListener('touchmove', handleMove as any);
      card.removeEventListener('touchend', handleEnd);
      card.removeEventListener('mousedown', handleStart as any);
      card.removeEventListener('mousemove', handleMove as any);
      card.removeEventListener('mouseup', handleEnd);
      card.removeEventListener('mouseleave', handleEnd);
    };
  }, [canGoNext, canGoPrevious, onNext, onPrevious]);

  if (!concept) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 text-lg">No concepts available</p>
      </div>
    );
  }

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="relative">
      <div className="absolute -top-6 left-0 right-0 flex justify-between items-center px-4">
        <span className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          difficultyColor[concept.difficulty_level || 'beginner']
        )}>
          {concept.difficulty_level?.charAt(0).toUpperCase() + concept.difficulty_level?.slice(1) || 'Beginner'}
        </span>
        <span className="text-sm text-gray-500 bg-white/80 backdrop-blur px-3 py-1 rounded-full">
          {concept.category?.charAt(0).toUpperCase() + concept.category?.slice(1) || 'General'}
        </span>
      </div>

      <Card
        ref={cardRef}
        className="relative w-full max-w-2xl mx-auto h-96 cursor-pointer transition-all duration-300 hover:shadow-2xl"
        onClick={onFlip}
        style={{ perspective: '1000px' }}
      >
        <div
          className={cn(
            "absolute inset-0 w-full h-full transition-transform duration-700",
            isFlipped ? "rotate-y-180" : ""
          )}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of card */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                {concept.title}
              </h2>
              <p className="text-gray-600 text-lg">
                Tap to flip and learn more
              </p>
            </div>
            <div className="absolute bottom-6 right-6">
              <Eye className="text-gray-400" size={20} />
            </div>
          </div>

          {/* Back of card */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200 flex flex-col items-center justify-center p-8"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="space-y-6 w-full max-w-lg">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {concept.description}
                </p>
              </div>
              
              {concept.example_text && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Example</h3>
                  <p className="text-gray-700 italic leading-relaxed bg-white/50 p-4 rounded-md">
                    {concept.example_text}
                  </p>
                </div>
              )}

              {concept.image_url && (
                <img 
                  src={concept.image_url} 
                  alt="Example" 
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="absolute bottom-6 right-6">
              <EyeOff className="text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation controls */}
      <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto px-4">
        <Button
          variant="outline"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Previous
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onFlip();
          }}
          className="flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Flip
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          disabled={!canGoNext}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight size={20} />
        </Button>
      </div>

      {/* Swipe hint */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Swipe left/right or use buttons to navigate
      </div>
    </div>
  );
}