import { Target, Droplet, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const VisionSection = () => {
  const visionPoints = [
    {
      icon: <Target size={40} />,
      title: "Sustainable Management",
      desc: "Ensuring long-term groundwater sustainability through scientific approaches",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Droplet size={40} />,
      title: "Water Security",
      desc: "Providing reliable data for informed decision-making on water resources",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Innovation & Technology",
      desc: "Leveraging modern tools for data collection, analysis, and dissemination",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-purple-500/10" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[10%] w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-bounce-gentle">
            <Sparkles size={16} />
            Our Purpose
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Our Vision</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            To be the premier institution for groundwater management in India, driving excellence
            through research, innovation, and data-driven decision making for sustainable water security.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => (
            <div 
              key={index}
              className="opacity-0 animate-fade-up"
              style={{ 
                animationFillMode: 'forwards',
                animationDelay: `${(index + 1) * 150}ms`
              }}
            >
              <Card className="hover-lift h-full bg-card/70 backdrop-blur-md border-0 shadow-xl overflow-hidden group">
                {/* Gradient border top */}
                <div className={`h-1.5 bg-gradient-to-r ${point.gradient}`} />
                
                <CardContent className="p-8 text-center relative">
                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${point.gradient} opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-all duration-500 scale-150`} />
                    <div className={`relative z-10 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${point.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {point.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.desc}
                  </p>
                  
                  {/* Hover decoration */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${point.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
