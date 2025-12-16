import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, TrendingUp, FileText, Plus, Calendar, Award } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const APAARManagement = () => {
  const apaars = [
    { id: 1, employee: "Rajesh Kumar", year: 2023, status: "completed", score: 85, department: "Civil" },
    { id: 2, employee: "Priya Sharma", year: 2023, status: "reviewed", score: 92, department: "Hydrology" },
    { id: 3, employee: "Amit Verma", year: 2023, status: "pending", score: 0, department: "Technical" },
    { id: 4, employee: "Sneha Patel", year: 2023, status: "completed", score: 78, department: "Admin" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "reviewed": return "secondary";
      case "pending": return "outline";
      default: return "outline";
    }
  };

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
              <BreadcrumbPage>APAAR Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
                <ClipboardList className="h-8 w-8" />
                APAAR Management Portal
              </h1>
              <p className="text-muted-foreground">Annual Performance Appraisal Report generation and tracking</p>
            </div>
            <Button variant="gov-primary" size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Generate New APAAR
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total APAARs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Year 2023</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">112</div>
              <p className="text-xs text-muted-foreground">72% completion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">28</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">82.5</div>
              <p className="text-xs text-muted-foreground">+3.2 from last year</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All APAARs</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="reviewed">Under Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {apaars.map((apaar, index) => (
              <Card key={apaar.id} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{apaar.employee}</CardTitle>
                      <CardDescription>
                        {apaar.department} • Year: {apaar.year}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(apaar.status)}>
                      {apaar.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      {apaar.score > 0 ? (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Performance Score</p>
                          <p className="text-2xl font-bold text-primary">{apaar.score}/100</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Score not available</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                      {apaar.status === "pending" && (
                        <Button variant="gov-primary" size="sm">
                          Start Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending APAARs</CardTitle>
                <CardDescription>Reports awaiting initiation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">16 APAARs pending review...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviewed">
            <Card>
              <CardHeader>
                <CardTitle>Under Review</CardTitle>
                <CardDescription>Reports currently being reviewed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">28 APAARs under review...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed APAARs</CardTitle>
                <CardDescription>Successfully completed performance appraisals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">112 completed APAARs...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Year-wise trends and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Performance trend charts will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default APAARManagement;
