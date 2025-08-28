import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Brain, Users, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    // Navigate to auth page with role parameter
    navigate(`/auth?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-memora-blue-light via-white to-memora-teal-light">
      {/* Header */}
      <header className="p-6 md:p-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-memora-blue to-memora-teal rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Memora</h1>
          </div>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-8 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-memora-orange" />
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-memora-blue to-memora-teal bg-clip-text text-transparent">
              Memora
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Compassionate care for dementia patients and their families
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect memories, ensure safety, and maintain meaningful relationships through technology designed with love and care.
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-center text-foreground mb-4">
            Choose Your Role
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Select how you'll be using Memora to get started with features tailored to your needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Patient Card */}
            <Card 
              className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group border-2 hover:border-memora-blue"
              onClick={() => handleRoleSelection('patient')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-memora-blue-light to-memora-purple opacity-20 group-hover:opacity-30 transition-opacity" />
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-memora-blue to-memora-teal rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">I'm a Patient</CardTitle>
                <CardDescription className="text-base">
                  Access your memories, play games, and stay connected
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-memora-teal rounded-full" />
                    <span>View family photos and memories</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-memora-teal rounded-full" />
                    <span>Play memory and cognitive games</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-memora-teal rounded-full" />
                    <span>Daily journaling and reflection</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-memora-teal rounded-full" />
                    <span>Face recognition assistance</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-memora-blue to-memora-teal hover:from-memora-blue hover:to-memora-teal text-white"
                  size="lg"
                >
                  Get Started as Patient
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Caregiver Card */}
            <Card 
              className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group border-2 hover:border-memora-teal"
              onClick={() => handleRoleSelection('caregiver')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-memora-teal-light to-memora-orange-light opacity-20 group-hover:opacity-30 transition-opacity" />
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-memora-teal to-memora-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">I'm a Caregiver</CardTitle>
                <CardDescription className="text-base">
                  Support your loved one and monitor their wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-memora-orange rounded-full" />
                    <span>Upload and manage family photos</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-memora-orange rounded-full" />
                    <span>Set safety zones and get alerts</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-memora-orange rounded-full" />
                    <span>Create reminders and tasks</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-memora-orange rounded-full" />
                    <span>Track progress and sentiment</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-memora-teal to-memora-orange hover:from-memora-teal hover:to-memora-orange text-white"
                  size="lg"
                >
                  Get Started as Caregiver
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Preview */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            Built with Care and Compassion
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-memora-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-memora-blue" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Connected Care</h4>
              <p className="text-sm text-muted-foreground">
                Keep families connected through shared memories and real-time updates
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-memora-teal-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-memora-teal" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Safe & Secure</h4>
              <p className="text-sm text-muted-foreground">
                Location monitoring and safety alerts to provide peace of mind
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-memora-orange-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-memora-orange" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Cognitive Support</h4>
              <p className="text-sm text-muted-foreground">
                Memory games and exercises designed to stimulate and engage
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Memora. Made with ❤️ for families affected by dementia.
          </p>
        </div>
      </footer>
    </div>
  );
}
