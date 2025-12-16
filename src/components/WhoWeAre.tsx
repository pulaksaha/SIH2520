import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe2, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhoWeAre = () => {
  const stats = [
    { icon: <Users size={32} />, value: "2000+", label: "Professionals", color: "from-blue-500 to-cyan-500" },
    { icon: <Globe2 size={32} />, value: "500+", label: "Monitoring Stations", color: "from-emerald-500 to-teal-500" },
    { icon: <Award size={32} />, value: "50+", label: "Years of Excellence", color: "from-amber-500 to-orange-500" },
    { icon: <Shield size={32} />, value: "100%", label: "Data Security", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="opacity-0 animate-fade-right" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8">Who We Are</h2>
            <div className="space-y-5 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                The <strong className="text-foreground font-semibold">Central Ground Water Board (CGWB)</strong> is a multidisciplinary 
                scientific organization under the Ministry of Jal Shakti, Government of India.
              </p>
              <p className="leading-relaxed">
                Our mission is to develop, manage, and sustain the nation's groundwater resources through 
                <span className="text-primary font-medium"> data-driven decision making</span> and 
                <span className="text-primary font-medium"> cutting-edge innovation</span>.
              </p>
              <p className="leading-relaxed">
                Since our establishment, we have been at the forefront of groundwater research, monitoring, 
                and policy formulation, working tirelessly to ensure water security for present and future generations.
              </p>
            </div>
            <Button className="mt-8 group bg-gradient-to-r from-primary to-blue-600 hover:from-primary-hover hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              Learn More About Us
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="opacity-0 animate-fade-up"
                style={{ 
                  animationFillMode: 'forwards',
                  animationDelay: `${(index + 1) * 100}ms`
                }}
              >
                <Card className="text-center hover-lift bg-card/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden group cursor-pointer">
                  {/* Gradient top border */}
                  <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
                  
                  <CardContent className="p-6 relative">
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
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
