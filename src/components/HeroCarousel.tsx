import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Digital Transformation Initiative",
    description: "Modernizing government workflows with cutting-edge technology",
    gradient: "from-primary via-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Flood Management & Infrastructure",
    description: "Building resilient water resource systems for the future",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
  },
  {
    id: 3,
    title: "Sustainable Development Goals",
    description: "Working towards environmental sustainability and water security",
    gradient: "from-purple-600 via-pink-600 to-rose-600",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[450px] md:h-[550px] overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float animation-delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Spotlight badge */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center gap-2 bg-gradient-to-r from-accent to-orange-500 text-accent-foreground px-5 py-2.5 rounded-full text-sm font-bold shadow-lg animate-bounce-gentle">
          <Sparkles size={16} className="animate-pulse" />
          SPOTLIGHT
        </div>
      </div>

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentSlide 
              ? isTransitioning ? "opacity-50 scale-105" : "opacity-100 scale-100" 
              : "opacity-0 scale-95"
          }`}
        >
          <div className={`h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center relative`}>
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <div className="text-center text-white px-8 relative z-10">
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
                index === currentSlide && !isTransitioning ? "animate-fade-up" : ""
              }`}>
                {slide.title}
              </h2>
              <p className={`text-xl md:text-2xl opacity-90 max-w-2xl mx-auto transition-all duration-500 ${
                index === currentSlide && !isTransitioning ? "animate-fade-up animation-delay-200" : ""
              }`}>
                {slide.description}
              </p>
              <div className={`mt-8 transition-all duration-500 ${
                index === currentSlide && !isTransitioning ? "animate-fade-up animation-delay-400" : ""
              }`}>
                <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm border border-white/20 h-12 w-12 rounded-full transition-all duration-300 hover:scale-110 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm border border-white/20 h-12 w-12 rounded-full transition-all duration-300 hover:scale-110 z-10"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? "bg-white w-10 shadow-lg" 
                : "bg-white/40 hover:bg-white/60 w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
