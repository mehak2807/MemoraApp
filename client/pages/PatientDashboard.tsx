import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Heart, 
  Camera, 
  GamepadIcon, 
  BookOpen, 
  Users, 
  LogOut,
  Clock,
  Star,
  Play,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [completedTasks] = useState(3);
  const [totalTasks] = useState(5);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-memora-blue-light via-white to-memora-teal-light">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-memora-blue to-memora-teal rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Welcome back, Sarah!</h1>
              <p className="text-sm text-muted-foreground">Patient Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-memora-blue-light text-memora-blue">
              <Heart className="w-3 h-3 mr-1" />
              Patient
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Good morning! ☀️</h2>
          <p className="text-lg text-muted-foreground">Here's what's planned for your day</p>
        </div>

        {/* Today's Tasks */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-memora-blue to-memora-teal text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Today's Activities
              </CardTitle>
              <CardDescription className="text-blue-100">
                {completedTasks} of {totalTasks} tasks completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(completedTasks / totalTasks) * 100} 
                className="h-3 bg-white/20"
              />
              <p className="text-sm mt-2 text-blue-100">
                Great progress! Keep going to maintain your routine.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Memory Games Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GamepadIcon className="w-5 h-5 text-memora-teal" />
                  Memory Games
                </CardTitle>
                <CardDescription>
                  Exercise your mind with fun and engaging activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-memora-teal-light rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-memora-teal rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Memory Match</h4>
                        <p className="text-sm text-muted-foreground">Last score: 85%</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => navigate('/patient/games/memory-match')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Now
                    </Button>
                  </div>

                  <div className="p-4 bg-memora-orange-light rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-memora-orange rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Tile Puzzle</h4>
                        <p className="text-sm text-muted-foreground">Last score: 78%</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      variant="secondary"
                      onClick={() => navigate('/patient/games/tile-puzzle')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Memories Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-memora-blue" />
                  Family Memories
                </CardTitle>
                <CardDescription>
                  Browse photos and remember special moments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-memora-blue-light rounded-xl flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
                      <Camera className="w-8 h-8 text-memora-blue" />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View All Memories
                </Button>
              </CardContent>
            </Card>

            {/* Journal Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-memora-purple" />
                  Daily Journal
                </CardTitle>
                <CardDescription>
                  Share your thoughts and feelings today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-memora-purple rounded-xl p-6 text-center">
                  <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Write Today's Entry</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tell us how you're feeling and what you've been thinking about
                  </p>
                  <Button>Start Writing</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Today's Reminders */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-memora-orange" />
                  Today's Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Take morning medication</p>
                    <p className="text-xs text-muted-foreground">Completed at 8:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-memora-orange-light rounded-lg">
                  <Clock className="w-5 h-5 text-memora-orange" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Lunch with family</p>
                    <p className="text-xs text-muted-foreground">12:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-memora-blue-light rounded-lg">
                  <Clock className="w-5 h-5 text-memora-blue" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Evening walk</p>
                    <p className="text-xs text-muted-foreground">5:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Face Recognition */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-memora-teal" />
                  Face Recognition
                </CardTitle>
                <CardDescription>
                  Identify family members and friends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-memora-teal-light rounded-xl p-6 text-center">
                  <Camera className="w-12 h-12 text-memora-teal mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Recognize Faces</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use your camera to identify people around you
                  </p>
                  <Button variant="outline" className="w-full">
                    Open Camera
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-0 shadow-lg border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Call Caregiver
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
