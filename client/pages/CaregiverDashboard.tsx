import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Shield,
  Brain,
  Upload,
  MapPin,
  Clock,
  Camera,
  Plus,
  LogOut,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Heart,
  BarChart3,
  Bell,
  Users,
  FileText,
  Settings,
  Wifi,
  WifiOff,
  Save
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CaregiverDashboard() {
  const navigate = useNavigate();
  const [activeAlerts] = useState(1);
  const [safeZoneRadius, setSafeZoneRadius] = useState(500); // radius in meters
  const [isOnline, setIsOnline] = useState(true);
  const [lastSeen, setLastSeen] = useState("2 minutes ago");

  const handleLogout = () => {
    navigate('/');
  };

  const handleSaveRadius = () => {
    // Here you would typically save to backend
    console.log(`Safe zone radius updated to ${safeZoneRadius} meters`);
    // Show success message
  };

  const patientStats = {
    gameScore: 82,
    completedTasks: 4,
    totalTasks: 6,
    moodTrend: "positive",
    lastJournalEntry: "2 hours ago"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-memora-teal-light via-white to-memora-orange-light">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Main Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-memora-teal to-memora-orange rounded-xl flex items-center justify-center shadow-md">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                  Caregiver Dashboard
                  <Badge variant="secondary" className="bg-memora-teal-light text-memora-teal text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Caregiver
                  </Badge>
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Caring for Sarah Johnson</span>
                  <div className="flex items-center gap-1">
                    {isOnline ? (
                      <><Wifi className="w-3 h-3 text-green-600" /> Online</>
                    ) : (
                      <><WifiOff className="w-3 h-3 text-red-600" /> Offline</>
                    )}
                  </div>
                  <span>Last seen {lastSeen}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Patient Avatar and Quick Info */}
              <div className="hidden md:flex items-center gap-3 bg-memora-blue-light/50 rounded-full px-4 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" alt="Sarah Johnson" />
                  <AvatarFallback className="bg-memora-blue text-white text-sm">SJ</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Sarah</p>
                  <p className="text-xs text-muted-foreground">Patient ID: #1024</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-muted">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              {/* Alerts */}
              {activeAlerts > 0 && (
                <Badge variant="destructive" className="animate-pulse shadow-md">
                  <Bell className="w-3 h-3 mr-1" />
                  {activeAlerts} Alert
                </Badge>
              )}

              <Button variant="outline" size="sm" onClick={handleLogout} className="shadow-sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Safety Status: </span>
              <span className="font-medium text-foreground">Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-memora-blue" />
              <span className="text-muted-foreground">Today's Score: </span>
              <span className="font-medium text-foreground">{patientStats.gameScore}%</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-memora-teal" />
              <span className="text-muted-foreground">Tasks: </span>
              <span className="font-medium text-foreground">{patientStats.completedTasks}/{patientStats.totalTasks}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-muted-foreground">Mood: </span>
              <span className="font-medium text-green-600 capitalize">{patientStats.moodTrend}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert Banner */}
        {activeAlerts > 0 && (
          <div className="mb-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800">Safety Alert</h4>
                    <p className="text-sm text-red-700">Sarah has left the designated safe zone 5 minutes ago</p>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    View Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-memora-blue-light rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-memora-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Game Score</p>
                  <p className="text-2xl font-bold text-foreground">{patientStats.gameScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-memora-teal-light rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-memora-teal" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-2xl font-bold text-foreground">{patientStats.completedTasks}/{patientStats.totalTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mood Trend</p>
                  <p className="text-2xl font-bold text-green-600 capitalize">{patientStats.moodTrend}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-memora-orange-light rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-memora-orange" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Journal</p>
                  <p className="text-2xl font-bold text-foreground">{patientStats.lastJournalEntry}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="memories">Memories</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-memora-blue" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "Completed Memory Match game", score: "92%", time: "30 min ago", icon: Brain, color: "text-green-600" },
                    { action: "Added journal entry", sentiment: "positive", time: "2 hours ago", icon: FileText, color: "text-memora-orange" },
                    { action: "Viewed family photos", duration: "15 min", time: "4 hours ago", icon: Camera, color: "text-memora-blue" },
                    { action: "Completed morning medication", status: "on time", time: "6 hours ago", icon: CheckCircle, color: "text-green-600" }
                  ].map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Icon className={`w-5 h-5 ${activity.color}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {activity.score || activity.sentiment || activity.duration || activity.status}
                        </Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Today's Progress */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-memora-teal" />
                    Today's Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Daily Tasks</span>
                      <span>{patientStats.completedTasks}/{patientStats.totalTasks}</span>
                    </div>
                    <Progress value={(patientStats.completedTasks / patientStats.totalTasks) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Memory Games</span>
                      <span>2/3 completed</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Social Interaction</span>
                      <span>Good</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Physical Activity</span>
                      <span>Moderate</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Memories Tab */}
          <TabsContent value="memories" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-memora-blue" />
                    Family Memories
                  </CardTitle>
                  <CardDescription>Upload and manage photos for Sarah to view</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-memora-blue to-memora-teal text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Photos
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-xl flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
                      <Camera className="w-6 h-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-memora-teal" />
                    Safe Zone Settings
                  </CardTitle>
                  <CardDescription>Set and manage safe zones for Sarah</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Map View */}
                  <div className="aspect-video bg-gradient-to-br from-memora-blue-light to-memora-teal-light rounded-xl flex items-center justify-center mb-4 border border-border">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-memora-teal mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">New Delhi Map View</p>
                      <p className="text-xs text-muted-foreground mt-1">Current radius: {safeZoneRadius}m</p>
                    </div>
                  </div>

                  {/* Radius Controls */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="radius-slider" className="text-sm font-medium">Safe Zone Radius</Label>
                      <div className="px-3">
                        <Slider
                          id="radius-slider"
                          min={100}
                          max={2000}
                          step={50}
                          value={[safeZoneRadius]}
                          onValueChange={(value) => setSafeZoneRadius(value[0])}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>100m</span>
                        <span className="font-medium text-foreground">{safeZoneRadius} meters</span>
                        <span>2000m</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="radius-input" className="text-xs">Exact Value (meters)</Label>
                        <Input
                          id="radius-input"
                          type="number"
                          min={100}
                          max={2000}
                          value={safeZoneRadius}
                          onChange={(e) => setSafeZoneRadius(Number(e.target.value))}
                          className="text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Quick Presets</Label>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2"
                            onClick={() => setSafeZoneRadius(200)}
                          >
                            200m
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2"
                            onClick={() => setSafeZoneRadius(500)}
                          >
                            500m
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2"
                            onClick={() => setSafeZoneRadius(1000)}
                          >
                            1km
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Zone Info */}
                    <div className="bg-memora-teal-light/30 rounded-lg p-4 space-y-2">
                      <h4 className="font-medium text-foreground text-sm">Zone Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Center: </span>
                          <span className="font-medium">28.6139° N, 77.2090° E</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Area: </span>
                          <span className="font-medium">{((safeZoneRadius * safeZoneRadius * Math.PI) / 10000).toFixed(2)} hectares</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-memora-teal to-memora-blue hover:opacity-90 text-white"
                      onClick={handleSaveRadius}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Safe Zone Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-memora-orange" />
                    Location Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Outside Safe Zone</span>
                    </div>
                    <p className="text-xs text-red-700">Sarah left the safe zone 5 minutes ago</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Returned to Safe Zone</span>
                    </div>
                    <p className="text-xs text-green-700">Earlier today at 2:30 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-memora-orange" />
                    Patient Reminders
                  </CardTitle>
                  <CardDescription>Create and manage reminders for Sarah</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-memora-teal to-memora-orange text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reminder
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Morning Medication", time: "8:00 AM", status: "completed", photo: true },
                  { title: "Lunch with Family", time: "12:30 PM", status: "pending", photo: false },
                  { title: "Evening Walk", time: "5:00 PM", status: "pending", photo: true },
                  { title: "Night Medication", time: "9:00 PM", status: "pending", photo: false }
                ].map((reminder, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-memora-blue-light rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-memora-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{reminder.title}</h4>
                      <p className="text-sm text-muted-foreground">{reminder.time}</p>
                      {reminder.photo && (
                        <Badge variant="secondary" className="mt-1">
                          <Camera className="w-3 h-3 mr-1" />
                          Has Photo
                        </Badge>
                      )}
                    </div>
                    <Badge variant={reminder.status === 'completed' ? 'default' : 'secondary'}>
                      {reminder.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-memora-blue" />
                    Cognitive Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Performance Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-memora-teal" />
                    Mood & Sentiment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Sentiment Analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
