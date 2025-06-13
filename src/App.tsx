import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Timer from "./pages/Timer";
import Profile from "./pages/Profile";
import WorkoutRoutines from "./pages/WorkoutRoutines";
import WorkoutDetail from "./pages/WorkoutDetail";
import CreateWorkout from "./pages/CreateWorkout";
import CreateRoutine from "./pages/CreateRoutine";
import Calendar from "./pages/Calendar";
import Statistics from "./pages/Statistics";
import Friends from "./pages/Friends";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/routines" element={<WorkoutRoutines />} />
          <Route path="/workout/:workoutId" element={<WorkoutDetail />} />
          <Route path="/create-workout" element={<CreateWorkout />} />
          <Route path="/create-routine" element={<CreateRoutine />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/progress" element={<Statistics />} />
          <Route path="/friends" element={<Friends />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
