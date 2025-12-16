import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Calendar, DollarSign, Users, Sparkles } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const AIPredictor = () => {
  const predictions = [
    {
      project: "New Water Treatment Plant",
      estimatedCost: 2500000,
      timeline: "8-10 months",
      resources: 45,
      confidence: 92
    },
    {
      project: "Groundwater Survey Phase 2",
      estimatedCost: 850000,
      timeline: "4-5 months",
      resources: 18,
      confidence: 87
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={() => {}} currentUser={null} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/utilities-activities">Utilities & Activities</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>AI Predictor</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
            <Brain className="h-8 w-8" />
            AI-Powered Project Predictor
          </h1>
          <p className="text-muted-foreground">Data-driven predictions for costs, timelines, and resource requirements</p>
        </div>

        {/* Prediction Input */}
        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Generate New Prediction
            </CardTitle>
            <CardDescription>Select project parameters to generate AI-powered estimates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="survey">Survey & Assessment</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="monitoring">Monitoring System</SelectItem>
                  <SelectItem value="treatment">Water Treatment</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="hydrology">Hydrology</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Historical Data Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-4 w-full md:w-auto" variant="gov-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Prediction
            </Button>
          </CardContent>
        </Card>

        {/* Predictions */}
        <div className="space-y-6">
          {predictions.map((prediction, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{prediction.project}</CardTitle>
                  <Badge className="bg-success/10 text-success">
                    {prediction.confidence}% Confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm font-medium">Estimated Cost</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      ₹{prediction.estimatedCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">Timeline</span>
                    </div>
                    <p className="text-2xl font-bold text-accent">
                      {prediction.timeline}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-medium">Resources Required</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {prediction.resources} persons
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    Prediction based on analysis of 45 similar projects from 2021-2023
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">156</CardTitle>
              <CardDescription>Historical Projects Analyzed</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-accent">89%</CardTitle>
              <CardDescription>Average Prediction Accuracy</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-success">24</CardTitle>
              <CardDescription>Successful Predictions This Month</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIPredictor;
