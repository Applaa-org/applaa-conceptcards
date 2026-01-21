import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Sparkles, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ConceptCards</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            An innovative flashcard learning app designed to make education engaging and effective through smart study techniques.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Sparkles className="mx-auto text-purple-600 mb-4" size={40} />
              <CardTitle>Interactive Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Swipe through cards with natural gestures. Flip cards to reveal detailed explanations and examples.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Brain className="mx-auto text-blue-600 mb-4" size={40} />
              <CardTitle>Smart Randomization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Cards are automatically shuffled to prevent pattern memorization and enhance learning retention.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="mx-auto text-green-600 mb-4" size={40} />
              <CardTitle>High Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Designed with high contrast and clear typography for optimal readability across all devices.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mb-12 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Create Concepts</h3>
                <p className="text-gray-600">Add learning concepts with titles, descriptions, examples, and visual aids.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Study with Flashcards</h3>
                <p className="text-gray-600">Swipe through your cards, flip to reveal answers, and track your progress.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Master the Material</h3>
                <p className="text-gray-600">Repeat sessions as needed. Cards are randomized to reinforce learning.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-yellow-200 bg-yellow-50 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-800">Educational Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">
              ConceptCards is designed as an educational tool to facilitate learning through flashcards. The content accuracy depends on the information input by users. This application is not a substitute for professional educational resources and should be used as a supplementary learning aid.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => window.location.href = '/'}
          >
            Start Learning Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;