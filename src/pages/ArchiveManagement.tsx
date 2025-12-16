import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Archive, Search, Calendar, FolderOpen, Download } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const ArchiveManagement = () => {
  const archivedProjects = [
    { id: 1, title: "River Survey Modernization", year: 2020, department: "Hydrology", status: "Completed", date: "Dec 2020" },
    { id: 2, title: "Digital Archives Launch", year: 2021, department: "IT", status: "Completed", date: "Jun 2021" },
    { id: 3, title: "Water Quality Assessment", year: 2022, department: "Civil", status: "Completed", date: "Mar 2022" },
    { id: 4, title: "Groundwater Monitoring System", year: 2023, department: "Technical", status: "Completed", date: "Sep 2023" },
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
              <BreadcrumbPage>Archive Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
            <Archive className="h-8 w-8" />
            Archive & File Management
          </h1>
          <p className="text-muted-foreground">Timeline-based access to completed projects and historical data</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hydrology">Hydrology</SelectItem>
              <SelectItem value="civil">Civil</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="survey">Survey</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timeline View */}
        <div className="space-y-6">
          {archivedProjects.map((project, index) => (
            <div key={project.id} className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-l-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{project.date}</span>
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="mt-2">
                        Year: {project.year} • Department: {project.department}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success">
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FolderOpen className="mr-2 h-4 w-4" />
                      View Files
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">24</CardTitle>
              <CardDescription>Total Archived Projects</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-accent">4</CardTitle>
              <CardDescription>Years of Data</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-success">156 GB</CardTitle>
              <CardDescription>Total Archive Size</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArchiveManagement;
