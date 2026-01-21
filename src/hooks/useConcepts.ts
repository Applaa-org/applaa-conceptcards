import { useState, useEffect } from 'react';
import { getConcepts, type Concept } from '../lib/api';

export function useConcepts() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [visitedCards, setVisitedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadConcepts();
  }, []);

  async function loadConcepts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getConcepts();
      // Shuffle concepts for randomization
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setConcepts(shuffled);
    } catch (err: any) {
      console.error('Failed to load concepts:', err);
      setError(err.message || 'Failed to load concepts');
    } finally {
      setLoading(false);
    }
  }

  function nextCard() {
    if (concepts.length === 0) return;
    
    setIsFlipped(false);
    setVisitedCards(prev => new Set(prev).add(currentIndex));
    setCurrentIndex((prev) => (prev + 1) % concepts.length);
  }

  function previousCard() {
    if (concepts.length === 0) return;
    
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + concepts.length) % concepts.length);
  }

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  function resetSession() {
    setCurrentIndex(0);
    setIsFlipped(false);
    setVisitedCards(new Set());
  }

  function shuffleCards() {
    const shuffled = [...concepts].sort(() => Math.random() - 0.5);
    setConcepts(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setVisitedCards(new Set());
  }

  const currentConcept = concepts[currentIndex];
  const progress = ((visitedCards.size + (isFlipped ? 1 : 0)) / concepts.length) * 100;

  return {
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
    refresh: loadConcepts,
  };
}