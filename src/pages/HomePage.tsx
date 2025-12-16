import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { StickyNotes } from "@/components/StickyNotes";
import { MilestonesTimeline } from "@/components/MilestonesTimeline";
import { VisionSection } from "@/components/VisionSection";
import { WhoWeAre } from "@/components/WhoWeAre";
import { LoginModal } from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onLoginClick={() => setLoginModalOpen(true)}
        currentUser={user ? { name: user.name, role: user.role } : null}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Sticky Notes Section */}
        <StickyNotes />

        {/* Milestones Timeline */}
        <MilestonesTimeline />

        {/* Vision Section */}
        <VisionSection />

        {/* Who We Are */}
        <WhoWeAre />

        {/* Quick Access to Utilities */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float animation-delay-500" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              <h2 className="text-4xl font-bold gradient-text mb-4">Quick Access</h2>
              <p className="text-muted-foreground text-lg">Explore our comprehensive tools and activities</p>
            </div>
            <div className="flex justify-center opacity-0 animate-fade-up animation-delay-200" style={{ animationFillMode: 'forwards' }}>
              <a
                href="/utilities-activities"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-2xl hover:from-primary-hover hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="text-xl font-semibold">Explore Utilities & Activities</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
};

export default HomePage;
