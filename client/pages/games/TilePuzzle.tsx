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
  Home,
  Shuffle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Tile {
  id: number;
  value: number | null;
  isEmpty: boolean;
}

export default function TilePuzzle() {
  const navigate = useNavigate();
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [emptyIndex, setEmptyIndex] = useState(8);

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

  // Check for completion
  useEffect(() => {
    if (gameStarted && isSolved()) {
      setGameCompleted(true);
      calculateScore();
    }
  }, [tiles, gameStarted]);

  const initializeGame = () => {
    // Create solved puzzle first
    const solvedTiles = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      value: i === 8 ? null : i + 1,
      isEmpty: i === 8
    }));

    // Shuffle the puzzle
    const shuffledTiles = shufflePuzzle([...solvedTiles]);
    
    setTiles(shuffledTiles);
    setEmptyIndex(shuffledTiles.findIndex(tile => tile.isEmpty));
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
  };

  const shufflePuzzle = (tiles: Tile[]): Tile[] => {
    const shuffled = [...tiles];
    
    // Do 100 random valid moves to ensure solvability
    let currentEmpty = 8;
    for (let i = 0; i < 100; i++) {
      const neighbors = getValidMoves(currentEmpty);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      // Swap empty tile with random neighbor
      [shuffled[currentEmpty], shuffled[randomNeighbor]] = [shuffled[randomNeighbor], shuffled[currentEmpty]];
      currentEmpty = randomNeighbor;
    }
    
    return shuffled;
  };

  const getValidMoves = (emptyPos: number): number[] => {
    const row = Math.floor(emptyPos / 3);
    const col = emptyPos % 3;
    const neighbors = [];

    // Up
    if (row > 0) neighbors.push(emptyPos - 3);
    // Down
    if (row < 2) neighbors.push(emptyPos + 3);
    // Left
    if (col > 0) neighbors.push(emptyPos - 1);
    // Right
    if (col < 2) neighbors.push(emptyPos + 1);

    return neighbors;
  };

  const handleTileClick = (index: number) => {
    if (!gameStarted) setGameStarted(true);
    
    if (gameCompleted || tiles[index].isEmpty) return;

    const validMoves = getValidMoves(emptyIndex);
    if (validMoves.includes(index)) {
      // Make the move
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      
      setTiles(newTiles);
      setEmptyIndex(index);
      setMoves(prev => prev + 1);
    }
  };

  const isSolved = (): boolean => {
    for (let i = 0; i < 8; i++) {
      if (tiles[i].value !== i + 1) return false;
    }
    return tiles[8].isEmpty;
  };

  const calculateScore = () => {
    const baseScore = 100;
    const timeBonus = Math.max(0, 600 - timeElapsed); // Bonus for speed (10 minutes max)
    const moveBonus = Math.max(0, (100 - moves) * 2); // Bonus for fewer moves
    const finalScore = Math.round(baseScore + timeBonus * 0.5 + moveBonus);
    setScore(finalScore);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreRating = () => {
    if (score >= 200) return { text: "Excellent!", color: "text-green-600", stars: 3 };
    if (score >= 150) return { text: "Good!", color: "text-yellow-600", stars: 2 };
    return { text: "Nice try!", color: "text-blue-600", stars: 1 };
  };

  const getOptimalMoves = () => {
    // Estimate optimal moves (this is a simplified calculation)
    return Math.max(20, Math.floor(moves * 0.7));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-memora-orange-light via-white to-memora-blue-light">
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
              <div className="w-10 h-10 bg-gradient-to-br from-memora-orange to-memora-blue rounded-xl flex items-center justify-center">
                <Shuffle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Tile Puzzle</h1>
                <p className="text-sm text-muted-foreground">Arrange numbers 1-8 in order</p>
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
              <Timer className="w-6 h-6 text-memora-orange mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-lg font-bold text-foreground">{formatTime(timeElapsed)}</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Shuffle className="w-6 h-6 text-memora-blue mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Moves</p>
              <p className="text-lg font-bold text-foreground">{moves}</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-memora-teal mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Best</p>
              <p className="text-lg font-bold text-foreground">{getOptimalMoves()}</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Progress</p>
              <Progress 
                value={gameCompleted ? 100 : Math.min(95, (moves > 0 ? 50 : 0) + (timeElapsed > 0 ? 25 : 0))} 
                className="h-2 mt-1" 
              />
            </CardContent>
          </Card>
        </div>

        {/* Game Completion Modal Overlay */}
        {gameCompleted && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 border-0 shadow-2xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-memora-orange to-memora-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Puzzle Solved!</CardTitle>
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
                    <p className="text-muted-foreground">Moves</p>
                    <p className="font-semibold">{moves}</p>
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
              <Shuffle className="w-5 h-5 text-memora-orange" />
              Tile Puzzle Game
            </CardTitle>
            <CardDescription>
              Click on tiles next to the empty space to move them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {tiles.map((tile, index) => (
                <Button
                  key={tile.id}
                  variant="outline"
                  className={`aspect-square text-xl h-20 transition-all duration-200 ${
                    tile.isEmpty
                      ? 'bg-gray-100 border-gray-200 cursor-default opacity-30'
                      : getValidMoves(emptyIndex).includes(index)
                        ? 'bg-memora-orange-light border-memora-orange hover:bg-memora-orange hover:text-white cursor-pointer shadow-md'
                        : 'bg-white hover:bg-memora-blue-light/20 cursor-default'
                  }`}
                  onClick={() => handleTileClick(index)}
                  disabled={tile.isEmpty || gameCompleted}
                >
                  {tile.isEmpty ? '' : tile.value}
                </Button>
              ))}
            </div>
            
            {!gameStarted && (
              <div className="text-center mt-6">
                <p className="text-muted-foreground mb-4">Click on a tile next to the empty space to start!</p>
                <Badge variant="secondary" className="bg-memora-orange-light text-memora-orange">
                  Ready to solve
                </Badge>
              </div>
            )}
            
            {gameStarted && !gameCompleted && (
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground mb-2">Goal: Arrange numbers 1-8 in order</p>
                <div className="grid grid-cols-3 gap-1 max-w-24 mx-auto text-xs">
                  {[1, 2, 3, 4, 5, 6, 7, 8, ''].map((num, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={initializeGame}
                className="hover:bg-memora-orange-light"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Puzzle
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
