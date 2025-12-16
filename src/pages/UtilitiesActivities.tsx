import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Archive, 
  Users, 
  Brain, 
  MessageSquare, 
  ClipboardList,
  ArrowRight,
  TrendingUp,
  FolderOpen,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UtilityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  tooltip: string;
  badge?: string;
}

const UtilityCard = ({ title, description, icon, link, tooltip, badge }: UtilityCardProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {icon}
                </div>
                {badge && (
                  <span className="px-2 py-1 text-xs rounded-full bg-accent text-accent-foreground">
                    {badge}
                  </span>
                )}
              </div>
              <CardTitle className="mt-4">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={link}>
                <Button variant="gov-primary" className="w-full group-hover:bg-primary-hover">
                  Open <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const UtilitiesActivities = () => {
  const utilities = [
    {
      title: "Expense Management",
      description: "Track expenses, payments, advances, and financial records with comprehensive reporting.",
      icon: <FileText className="h-6 w-6" />,
      link: "/utilities/expense-management",
      tooltip: "Manage all financial transactions including payment rescheduling, advance payments, and part payments with detailed analytics.",
      badge: "Enhanced"
    },
    {
      title: "Archive & File Management",
      description: "Timeline-based system for completed projects with advanced search and filters.",
      icon: <Archive className="h-6 w-6" />,
      link: "/utilities/archive",
      tooltip: "Access historical project data organized by year, department, and project type with quick search capabilities.",
      badge: "New"
    },
    {
      title: "Collaboration Hub",
      description: "Unified workspace for teams to track progress, share resources, and manage materials.",
      icon: <Users className="h-6 w-6" />,
      link: "/utilities/collaboration",
      tooltip: "Real-time collaboration space for project teams with activity tracking and resource sharing."
    },
    {
      title: "AI Predictor",
      description: "Data-driven predictions for project costs, timelines, and resource requirements.",
      icon: <Brain className="h-6 w-6" />,
      link: "/utilities/ai-predictor",
      tooltip: "Machine learning powered estimations based on historical project data with confidence scoring.",
      badge: "New"
    },
    {
      title: "Query Management",
      description: "Centralized system for handling queries, tracking responses, and resolution status.",
      icon: <MessageSquare className="h-6 w-6" />,
      link: "/utilities/query-management",
      tooltip: "Streamlined query handling with status tracking, priority management, and automated notifications."
    }
  ];

  const activities = [
    {
      title: "APAAR Management",
      description: "Generate and manage Annual Performance Appraisal Reports with analytics and insights.",
      icon: <ClipboardList className="h-6 w-6" />,
      link: "/activities/apaar",
      tooltip: "Comprehensive APAAR generation system with year-wise performance analytics and automated report generation.",
      badge: "New"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={() => {}} currentUser={null} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Utilities & Activities</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-3 flex items-center gap-3">
            <Sparkles className="h-8 w-8" />
            Utilities & Activities Hub
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive tools and features to streamline your workflow and enhance productivity.
          </p>
        </div>

        {/* Utilities Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FolderOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Utilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((utility, index) => (
              <div key={utility.title} style={{ animationDelay: `${index * 100}ms` }}>
                <UtilityCard {...utility} />
              </div>
            ))}
          </div>
        </section>

        {/* Activities Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Activities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div key={activity.title} style={{ animationDelay: `${index * 100}ms` }}>
                <UtilityCard {...activity} />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">6</CardTitle>
              <CardDescription>Total Tools Available</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-accent">3</CardTitle>
              <CardDescription>New Features Added</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-success">100%</CardTitle>
              <CardDescription>Integration Ready</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UtilitiesActivities;
