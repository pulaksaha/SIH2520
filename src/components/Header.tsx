import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  onLoginClick: () => void;
  currentUser?: { name: string; role: string } | null;
  onLogout?: () => void;
}

export const Header = ({ onLoginClick, currentUser, onLogout }: HeaderProps) => {
  const menuItems = [
    { title: "Home", href: "/" },
    {
      title: "About CGWB",
      items: ["Office Location", "Who's Who", "Organogram", "Contact Us", "Roll of Honour"],
    },
    {
      title: "Downloads",
      items: ["Logo", "Data Download"],
    },
    {
      title: "Publications",
      items: ["Bhujal Samvad", "CGWB Publications & Media Warehouse", "Bhujal News"],
    },
    { title: "CGWS", href: "#" },
    { title: "Tender", href: "#" },
    { title: "Vacancies", href: "#" },
    { title: "Social Media", href: "#" },
    {
      title: "Citizen Corner",
      items: ["CGWBcPort", "Public Notice", "RTI Act", "Citizen Charter"],
    },
    { title: "Vedic Gallery", href: "#" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/95">
      {/* Top Bar - Simplified */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-end items-center">
          <button className="px-4 py-1.5 bg-background/20 hover:bg-background/30 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
            SSO Portal
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Government of India Emblem"
              className="gov-emblem"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">CGWB Portal</h1>
              <p className="text-sm text-muted-foreground">Central Ground Water Board</p>
            </div>
          </div>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="gov-primary" onClick={onLoginClick}>
              <User size={18} />
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList>
              {menuItems.map((item) =>
                item.items ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="bg-transparent">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {item.items.map((subItem) => (
                          <li key={subItem}>
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{subItem}</div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};
