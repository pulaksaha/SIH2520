import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";

const milestones = [
  { year: 2020, title: "River Survey Modernization", icon: "🌊", desc: "Advanced equipment deployment", color: "from-blue-500 to-cyan-500" },
  { year: 2021, title: "CGWB Digital Archives", icon: "📚", desc: "Complete data digitization", color: "from-purple-500 to-pink-500" },
  { year: 2022, title: "Project Productivity Tool", icon: "📊", desc: "KPI tracking system launched", color: "from-orange-500 to-red-500" },
  { year: 2023, title: "Water Data Open Portal", icon: "🌐", desc: "Public data access enabled", color: "from-green-500 to-emerald-500" },
  { year: 2024, title: "AI-Powered Analytics", icon: "🤖", desc: "Predictive models deployed", color: "from-indigo-500 to-violet-500" },
];

export const MilestonesTimeline = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-float animation-delay-500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles size={16} />
            Our Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Milestones Achieved
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of our transformative journey in groundwater management
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20 -translate-y-1/2 hidden md:block rounded-full" />
          
          {/* Animated glow on timeline */}
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 hidden md:block overflow-hidden rounded-full">
            <div className="h-full w-20 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year} 
                className="opacity-0 animate-fade-up"
                style={{ 
                  animationFillMode: 'forwards',
                  animationDelay: `${index * 150}ms`
                }}
              >
                <Card className="hover-lift cursor-pointer group bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl overflow-hidden">
                  {/* Gradient top border */}
                  <div className={`h-1 bg-gradient-to-r ${milestone.color}`} />
                  
                  <CardContent className="p-6 text-center relative">
                    {/* Icon with animated background */}
                    <div className="relative mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                      <div className="text-5xl relative z-10 animate-bounce-gentle" style={{ animationDelay: `${index * 100}ms` }}>
                        {milestone.icon}
                      </div>
                    </div>
                    
                    {/* Year badge */}
                    <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${milestone.color} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {milestone.year.toString().slice(2)}
                    </div>
                    
                    <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {milestone.desc}
                    </p>
                    
                    <div className="mt-4 flex justify-center">
                      <CheckCircle2 className="text-success group-hover:scale-125 transition-transform duration-300" size={22} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
