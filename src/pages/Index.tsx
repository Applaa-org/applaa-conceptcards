import { useConcepts } from '@/hooks/useConcepts';
import { FlashCard } from '@/components/FlashCard';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, RotateCcw, Plus } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Index = () => {
  const {
    concepts,
    currentConcept,
    currentIndex,
    loading,
    error,
    isFlipped,
    visitedCards,
    progress,
    nextCard,
    previousCard,
    flipCard,
    resetSession,
    shuffleCards,
    refresh,
  } = useConcepts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600">Loading concepts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <Card className="max-w-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={refresh}>Try Again</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (concepts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <Card className="max-w-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Concepts Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start by adding some learning concepts to practice with.
                </p>
                <Button onClick={() => window.location.href='/manage'}>
                  <Plus size={20} className="mr-2" />
                  Add Concepts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Learning Progress
            </span>
            <span className="text-sm text-gray-600">
              {visitedCards.size + (isFlipped ? 1 : 0)} / {concepts.length} cards
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current card indicator */}
        <div className="text-center mb-6">
          <span className="text-gray-600">
            Card {currentIndex + 1} of {concepts.length}
          </span>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center items-center min-h-[500px] mb-8">
          <FlashCard
            concept={currentConcept}
            isFlipped={isFlipped}
            onFlip={flipCard}
            onNext={nextCard}
            onPrevious={previousCard}
            canGoNext={true}
            canGoPrevious={true}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            variant="outline"
            onClick={shuffleCards}
            className="flex items-center gap-2"
          >
            <Shuffle size={20} />
            Shuffle Cards
          </Button>
          
          <Button
            variant="outline"
            onClick={resetSession}
            className="flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Reset Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;