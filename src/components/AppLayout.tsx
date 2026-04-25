import { NavLink, Outlet } from "react-router-dom";
import { Dumbbell, Plus, CheckCircle2, Home } from "lucide-react";

const tabs = [
  { to: "/", label: "TRAIN", icon: Home, end: true },
  { to: "/add", label: "CREATE", icon: Plus },
  { to: "/completed", label: "DONE", icon: CheckCircle2 },
];

export default function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="w-full max-w-6xl mx-auto px-6 md:px-10 pt-8 md:pt-12 pb-4 flex justify-between items-end animate-fade-in">
        <div className="space-y-1">
          <span className="text-neon font-heading tracking-[0.25em] text-xs">USER_ID: PHANTOM_9</span>
          <h1 className="text-4xl md:text-6xl font-heading italic leading-none tracking-tight">
            KINETIX<span className="text-neon">_</span>LABS
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-3 glass-card rounded-full px-4 py-2">
          <Dumbbell className="size-4 text-neon" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">System Online</span>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-10 pb-40">
        <Outlet />
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[min(92vw,420px)] glass-card rounded-full p-2 flex items-center justify-between z-50 shadow-2xl backdrop-blur-xl">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 rounded-full font-heading tracking-widest text-sm italic transition-colors ${
                isActive ? "text-neon" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <t.icon className="size-4" />
                <span>{t.label}</span>
                <span className={`h-1 w-1 rounded-full ${isActive ? "bg-neon" : "bg-transparent"}`} />
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
