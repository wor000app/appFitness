import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WorkoutDay {
  date: number;
  hasWorkout: boolean;
  workoutType?: string;
}

export default function Calendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025

  // Mock data - replace with real data later
  const workoutDays: WorkoutDay[] = [
    { date: 2, hasWorkout: true, workoutType: "Peito e Bíceps" },
    { date: 5, hasWorkout: true, workoutType: "Costas e Tríceps" },
    { date: 9, hasWorkout: true, workoutType: "Pernas" },
    { date: 12, hasWorkout: true, workoutType: "Ombros" },
    { date: 16, hasWorkout: true, workoutType: "Peito e Bíceps" },
    { date: 19, hasWorkout: true, workoutType: "Costas e Tríceps" },
    { date: 23, hasWorkout: true, workoutType: "Pernas" },
  ];

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const weekDays = ["Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb.", "Dom."];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Get the first day of the week (0 = Sunday, 1 = Monday, etc.)
    // Adjust so Monday = 0
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const workoutDay = workoutDays.find((wd) => wd.date === day);
      days.push({
        date: day,
        hasWorkout: workoutDay?.hasWorkout || false,
        workoutType: workoutDay?.workoutType,
      });
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const days = getDaysInMonth(currentMonth);
  const workoutCount = workoutDays.length;

  return (
    <div className="min-h-screen bg-mint-100 pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="px-4 pt-6 pb-2 bg-transparent">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-mint-600 hover:bg-mint-100 rounded-full bg-white/60 backdrop-blur-sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
            </Button>
            <span className="text-sm text-gray-600 font-medium">Voltar</span>
            <div className="w-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Frequência de Treinos
          </h1>
        </div>

        {/* Calendar Card */}
        <div className="px-4 py-6">
          <GlassCard className="p-6 bg-white/60">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousMonth}
                className="text-mint-600 hover:bg-mint-100 rounded-full"
              >
                <ChevronLeft size={20} />
              </Button>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {currentMonth.getFullYear()}
                </div>
                <div className="text-gray-600 font-medium">
                  {monthNames[currentMonth.getMonth()]}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextMonth}
                className="text-mint-600 hover:bg-mint-100 rounded-full"
              >
                <ChevronRight size={20} />
              </Button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {days.map((day, index) => (
                <div
                  key={index}
                  className="aspect-square flex items-center justify-center relative"
                >
                  {day ? (
                    <div
                      className={`
                        w-full h-full flex items-center justify-center rounded-full text-sm font-medium transition-colors cursor-pointer
                        ${
                          day.hasWorkout
                            ? "bg-mint-500 text-white hover:bg-mint-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                      title={day.workoutType}
                    >
                      {day.date}
                    </div>
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              ))}
            </div>

            {/* View Full Year Link */}
            <div className="text-center">
              <button className="text-mint-600 font-medium hover:text-mint-700 transition-colors">
                Ver ano completo
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Workout Summary */}
        <div className="px-4">
          <GlassCard className="p-6 bg-white/40">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-mint-200/50 rounded-full flex items-center justify-center">
                <CalendarIcon size={24} className="text-mint-600" />
              </div>
              <div>
                <p className="text-gray-700 font-medium mb-1">Você treinou:</p>
                <p className="text-2xl font-bold text-mint-600">
                  {workoutCount} dias
                  <span className="text-lg font-normal text-gray-600 ml-1">
                    esse mês
                  </span>
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Monthly Stats */}
        <div className="px-4 mt-4">
          <GlassCard className="p-6 bg-white/40">
            <h3 className="font-semibold text-gray-900 mb-4">
              Estatísticas do Mês
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-mint-600 mb-1">
                  {workoutCount}
                </div>
                <div className="text-xs text-gray-600">Treinos</div>
              </div>
              <div>
                <div className="text-xl font-bold text-mint-600 mb-1">
                  {Math.round((workoutCount / 30) * 100)}%
                </div>
                <div className="text-xs text-gray-600">Frequência</div>
              </div>
              <div>
                <div className="text-xl font-bold text-mint-600 mb-1">
                  {Math.ceil(workoutCount / 7)}
                </div>
                <div className="text-xs text-gray-600">Semanas ativas</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Workouts */}
        <div className="px-4 mt-4">
          <GlassCard className="p-6 bg-white/40">
            <h3 className="font-semibold text-gray-900 mb-4">
              Últimos Treinos
            </h3>
            <div className="space-y-3">
              {workoutDays
                .slice(-3)
                .reverse()
                .map((workout) => (
                  <div
                    key={workout.date}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-mint-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {workout.date}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {workout.workoutType}
                        </p>
                        <p className="text-xs text-gray-600">
                          {monthNames[currentMonth.getMonth()]} {workout.date}
                        </p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-mint-500 rounded-full"></div>
                  </div>
                ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
