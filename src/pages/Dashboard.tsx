import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Calendar,
  Dumbbell,
  Target,
  TrendingUp,
  Clock,
  Flame,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock data - replace with real data later
  const todaysWorkout = {
    name: "Peito e Bíceps",
    exercises: 6,
    estimatedTime: "45 min",
    completed: false,
  };

  const weeklyProgress = {
    completed: 4,
    total: 6,
    percentage: 67,
  };

  const currentStreak = 7;

  return (
    <div className="min-h-screen bg-mint-100 px-4 py-6 pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Olá! 👋</h1>
              <p className="text-gray-600">Pronto para treinar hoje?</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 bg-orange-500/10 rounded-full">
                <Flame size={16} className="text-orange-500" />
                <span className="text-sm font-semibold text-orange-700">
                  {currentStreak}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Workout Card */}
        <GlassCard className="p-6 mb-6 bg-white/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Treino de Hoje
              </h2>
              <p className="text-gray-600 text-sm">
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-mint-200/50 border-mint-300 text-mint-700"
            >
              Programado
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {todaysWorkout.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Dumbbell size={14} />
                  <span>{todaysWorkout.exercises} exercícios</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{todaysWorkout.estimatedTime}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl h-12"
              size="lg"
              onClick={() => navigate("/routines")}
            >
              <Play size={18} className="mr-2" />
              Ver Rotinas
            </Button>
          </div>
        </GlassCard>

        {/* Weekly Progress */}
        <GlassCard className="p-6 mb-6 bg-white/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Progresso Semanal</h3>
            <TrendingUp size={20} className="text-mint-600" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {weeklyProgress.completed}/{weeklyProgress.total} treinos
              </span>
              <span className="font-semibold text-mint-700">
                {weeklyProgress.percentage}%
              </span>
            </div>
            <div className="w-full bg-mint-200/50 rounded-full h-2">
              <div
                className="bg-mint-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${weeklyProgress.percentage}%` }}
              />
            </div>
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <GlassCard
            className="p-4 bg-white/40 cursor-pointer hover:bg-white/50 transition-colors"
            onClick={() => navigate("/calendar")}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-mint-200/50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Calendar size={20} className="text-mint-700" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Calendário
              </h4>
              <p className="text-xs text-gray-600">Ver progresso</p>
            </div>
          </GlassCard>

          <GlassCard
            className="p-4 bg-white/40 cursor-pointer hover:bg-white/50 transition-colors"
            onClick={() => navigate("/routines")}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-mint-200/50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Target size={20} className="text-mint-700" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Rotinas
              </h4>
              <p className="text-xs text-gray-600">Ver treinos</p>
            </div>
          </GlassCard>
        </div>

      </div>

      <Navigation />
    </div>
  );
}
