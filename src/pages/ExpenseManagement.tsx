import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, TrendingUp, ArrowUpRight, CreditCard, Clock } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const ExpenseManagement = () => {
  const expenseData = [
    { id: 1, title: "Project Alpha Materials", amount: 125000, status: "paid", date: "2024-01-15", type: "Full Payment" },
    { id: 2, title: "Contractor Advance", amount: 50000, status: "pending", date: "2024-01-18", type: "Advance" },
    { id: 3, title: "Equipment Rental", amount: 75000, status: "scheduled", date: "2024-01-22", type: "Part Payment" },
    { id: 4, title: "Survey Team Expenses", amount: 35000, status: "paid", date: "2024-01-20", type: "Full Payment" },
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
              <BreadcrumbPage>Expense Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Expense Management Portal</h1>
          <p className="text-muted-foreground">Track and manage all financial transactions comprehensively</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,85,000</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹50,000</div>
              <p className="text-xs text-muted-foreground">2 pending approvals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Advances</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,25,000</div>
              <p className="text-xs text-muted-foreground">5 active advances</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹75,000</div>
              <p className="text-xs text-muted-foreground">Next: Jan 22</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different expense types */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Expenses</TabsTrigger>
            <TabsTrigger value="advances">Advances</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Payments</TabsTrigger>
            <TabsTrigger value="part">Part Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {expenseData.map((expense) => (
              <Card key={expense.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{expense.title}</CardTitle>
                      <CardDescription>{expense.date}</CardDescription>
                    </div>
                    <Badge variant={expense.status === "paid" ? "default" : expense.status === "pending" ? "secondary" : "outline"}>
                      {expense.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">₹{expense.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{expense.type}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="advances">
            <Card>
              <CardHeader>
                <CardTitle>Advance Payments</CardTitle>
                <CardDescription>Track all advance payments and their utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Advance payment records will appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Payment Schedule</CardTitle>
                <CardDescription>View and manage upcoming scheduled payments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Scheduled payments will appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="part">
            <Card>
              <CardHeader>
                <CardTitle>Part Payments</CardTitle>
                <CardDescription>Manage milestone-based part payments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Part payment records will appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ExpenseManagement;
