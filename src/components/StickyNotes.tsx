import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const activities = [
  { id: 1, title: "Field Survey Drive 2024", desc: "Comprehensive groundwater assessment across 12 states", gradient: "from-amber-400 to-orange-500" },
  { id: 2, title: "Water Quality Testing", desc: "Monthly testing of 500+ sampling points", gradient: "from-blue-400 to-cyan-500" },
  { id: 3, title: "Community Awareness Program", desc: "Groundwater conservation workshops in rural areas", gradient: "from-green-400 to-emerald-500" },
  { id: 4, title: "Digital Archive Migration", desc: "Converting legacy survey data to digital format", gradient: "from-pink-400 to-rose-500" },
];

const utilities = [
  { id: 1, title: "Data Download Portal", desc: "Access groundwater data and reports", gradient: "from-purple-400 to-violet-500" },
  { id: 2, title: "KPI Tracker", desc: "Monitor departmental performance metrics", gradient: "from-orange-400 to-red-500" },
  { id: 3, title: "Form Repository", desc: "Download official forms and templates", gradient: "from-teal-400 to-cyan-500" },
  { id: 4, title: "Tender Portal", desc: "View active tenders and procurement notices", gradient: "from-indigo-400 to-blue-500" },
];

export const StickyNotes = () => {
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);
  const [activeUtilityIndex, setActiveUtilityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveActivityIndex((prev) => (prev + 1) % activities.length);
      setActiveUtilityIndex((prev) => (prev + 1) % utilities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const NoteSection = ({ 
    title, 
    icon,
    items, 
    activeIndex, 
    onPrev, 
    onNext 
  }: { 
    title: string;
    icon: React.ReactNode;
    items: typeof activities; 
    activeIndex: number; 
    onPrev: () => void; 
    onNext: () => void;
  }) => {
    const currentItem = items[activeIndex];
    
    return (
      <div className="space-y-4 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <h3 className="text-2xl font-bold gradient-text">{title}</h3>
        </div>
        <Card className="relative overflow-hidden rounded-2xl shadow-xl hover-lift group">
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentItem.gradient} opacity-90`} />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          {/* Tape effect */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/30 backdrop-blur-sm rounded-b-lg shadow-md transform -rotate-1" />
          
          <div className="relative p-8 pt-10 text-white">
            <h4 className="font-bold text-xl mb-3 animate-fade-up">{currentItem.title}</h4>
            <p className="text-white/90 text-sm leading-relaxed">{currentItem.desc}</p>
            
            <div className="flex gap-2 mt-6">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onPrev}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onNext}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
            
            {/* Dots indicator */}
            <div className="flex gap-2 mt-4">
              {items.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          <NoteSection
            title="Activities"
            icon={<Zap size={24} />}
            items={activities}
            activeIndex={activeActivityIndex}
            onPrev={() => setActiveActivityIndex((prev) => (prev - 1 + activities.length) % activities.length)}
            onNext={() => setActiveActivityIndex((prev) => (prev + 1) % activities.length)}
          />
          <div className="animation-delay-200">
            <NoteSection
              title="Utilities"
              icon={<Settings size={24} />}
              items={utilities}
              activeIndex={activeUtilityIndex}
              onPrev={() => setActiveUtilityIndex((prev) => (prev - 1 + utilities.length) % utilities.length)}
              onNext={() => setActiveUtilityIndex((prev) => (prev + 1) % utilities.length)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
