import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Timer, Calendar, BarChart3, User } from "lucide-react";

const navigationItems = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Timer",
    icon: Timer,
    path: "/timer",
  },
  {
    label: "Calendar",
    icon: Calendar,
    path: "/calendar",
  },
  {
    label: "Stats",
    icon: BarChart3,
    path: "/progress",
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-4 mb-4">
        <nav className="backdrop-blur-lg bg-black/80 rounded-3xl px-6 py-3 shadow-glass">
          <div className="flex items-center justify-between">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-200",
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white/80",
                  )}
                >
                  <div
                    className={cn(
                      "p-2 rounded-xl transition-all duration-200",
                      isActive ? "bg-white/20" : "hover:bg-white/10",
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
