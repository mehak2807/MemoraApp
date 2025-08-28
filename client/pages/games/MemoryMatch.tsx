import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  ArrowLeft, 
  Trophy, 
  Timer, 
  Star,
  RefreshCw,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardIcons = [
  "🍎", "🐱", "🌟", "🎈", "🏠", "🌸", "🚗", "⚽",
  "🍎", "🐱", "🌟", "🎈", "🏠", "🌸", "🚗", "⚽"
];

export default function MemoryMatch() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].value === cards[second].value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            index === first || index === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            index === first || index === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setAttempts(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  // Check for game completion
  useEffect(() => {
    if (matches === 8 && gameStarted) {
      setGameCompleted(true);
      calculateScore();
    }
  }, [matches, gameStarted]);

  const initializeGame = () => {
    const shuffledIcons = [...cardIcons].sort(() => Math.random() - 0.5);
    const initialCards = shuffledIcons.map((icon, index) => ({
      id: index,
      value: icon,
      isFlipped: false,
      isMatched: false
    }));
    setCards(initialCards);
    setFlippedCards([]);
    setMatches(0);
    setAttempts(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
  };

  const handleCardClick = (index: number) => {
    if (!gameStarted) setGameStarted(true);
    
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    setCards(prev => prev.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
  };

  const calculateScore = () => {
    const baseScore = 100;
    const timeBonus = Math.max(0, 300 - timeElapsed); // Bonus for speed
    const accuracyBonus = Math.max(0, (16 - attempts) * 5); // Bonus for fewer attempts
    const finalScore = Math.round(baseScore + timeBonus + accuracyBonus);
    setScore(finalScore);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreRating = () => {
    if (score >= 300) return { text: "Excellent!", color: "text-green-600", stars: 3 };
    if (score >= 200) return { text: "Good!", color: "text-yellow-600", stars: 2 };
    return { text: "Nice try!", color: "text-blue-600", stars: 1 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-memora-blue-light via-white to-memora-teal-light">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/patient/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-memora-blue to-memora-teal rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Memory Match</h1>
                <p className="text-sm text-muted-foreground">Find all matching pairs</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/patient/dashboard')}
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Game Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Timer className="w-6 h-6 text-memora-blue mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-lg font-bold text-foreground">{formatTime(timeElapsed)}</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-memora-teal mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Matches</p>
              <p className="text-lg font-bold text-foreground">{matches}/8</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Brain className="w-6 h-6 text-memora-orange mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Attempts</p>
              <p className="text-lg font-bold text-foreground">{attempts}</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Progress</p>
              <Progress value={(matches / 8) * 100} className="h-2 mt-1" />
            </CardContent>
          </Card>
        </div>

        {/* Game Completion Modal Overlay */}
        {gameCompleted && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 border-0 shadow-2xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-memora-blue to-memora-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Game Complete!</CardTitle>
                <CardDescription>
                  {getScoreRating().text}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-6 h-6 ${i < getScoreRating().stars ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{score}</p>
                  <p className="text-sm text-muted-foreground">Final Score</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-semibold">{formatTime(timeElapsed)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Accuracy</p>
                    <p className="font-semibold">{Math.round((8 / attempts) * 100)}%</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={initializeGame}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate('/patient/dashboard')}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Game Board */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Brain className="w-5 h-5 text-memora-blue" />
              Memory Match Game
            </CardTitle>
            <CardDescription>
              Click on cards to flip them and find matching pairs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {cards.map((card, index) => (
                <Button
                  key={card.id}
                  variant="outline"
                  className={`aspect-square text-2xl h-20 transition-all duration-300 ${
                    card.isFlipped || card.isMatched
                      ? card.isMatched 
                        ? 'bg-green-100 border-green-300 shadow-lg' 
                        : 'bg-memora-blue-light border-memora-blue'
                      : 'bg-white hover:bg-memora-blue-light/20'
                  }`}
                  onClick={() => handleCardClick(index)}
                  disabled={flippedCards.length === 2 || card.isMatched}
                >
                  {card.isFlipped || card.isMatched ? card.value : '?'}
                </Button>
              ))}
            </div>
            
            {!gameStarted && (
              <div className="text-center mt-6">
                <p className="text-muted-foreground mb-4">Click any card to start the game!</p>
                <Badge variant="secondary" className="bg-memora-blue-light text-memora-blue">
                  Ready to play
                </Badge>
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={initializeGame}
                className="hover:bg-memora-teal-light"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
