import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, MessageSquare, FileText, Package, Activity } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const CollaborationHub = () => {
  const projects = [
    {
      id: 1,
      name: "Water Infrastructure Project",
      team: ["JD", "AM", "SK", "RP"],
      progress: 75,
      materials: ["Cement", "Steel Rods", "Pipes"],
      expenses: 450000,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Survey Data Collection",
      team: ["MK", "PT", "NS"],
      progress: 45,
      materials: ["GPS Devices", "Survey Tools"],
      expenses: 125000,
      lastActivity: "5 hours ago"
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
              <BreadcrumbPage>Collaboration Hub</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
            <Users className="h-8 w-8" />
            Collaboration Hub
          </h1>
          <p className="text-muted-foreground">Unified workspace for project teams and real-time collaboration</p>
        </div>

        {/* Active Projects */}
        <div className="space-y-6 mb-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                    <CardDescription>
                      <Activity className="inline h-3 w-3 mr-1" />
                      Last activity: {project.lastActivity}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{project.progress}% Complete</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                {/* Team Members */}
                <div>
                  <p className="text-sm font-medium mb-2">Team Members</p>
                  <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <AvatarFallback>{member}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                {/* Materials & Expenses */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Materials Used</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.materials.map((material, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Total Expenses</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">₹{project.expenses.toLocaleString()}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="gov-primary" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Open Discussion
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">12</CardTitle>
              <CardDescription>Active Projects</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-accent">48</CardTitle>
              <CardDescription>Team Members</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-success">156</CardTitle>
              <CardDescription>Shared Resources</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">89%</CardTitle>
              <CardDescription>Avg. Completion Rate</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollaborationHub;
