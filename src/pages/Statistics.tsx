import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  Dumbbell,
  Target,
  Flame,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Statistics() {
  const navigate = useNavigate();

  // Mock data for charts
  const weeklyFrequencyData = [
    { week: "Sem 1", treinos: 4, meta: 5 },
    { week: "Sem 2", treinos: 5, meta: 5 },
    { week: "Sem 3", treinos: 3, meta: 5 },
    { week: "Sem 4", treinos: 6, meta: 5 },
    { week: "Sem 5", treinos: 4, meta: 5 },
    { week: "Sem 6", treinos: 5, meta: 5 },
  ];

  const muscleGroupData = [
    { name: "Peito", sessions: 8, avgWeight: 15 },
    { name: "Costas", sessions: 7, avgWeight: 18 },
    { name: "Pernas", sessions: 6, avgWeight: 25 },
    { name: "Ombros", sessions: 5, avgWeight: 12 },
    { name: "Bíceps", sessions: 8, avgWeight: 10 },
    { name: "Tríceps", sessions: 7, avgWeight: 14 },
  ];

  const progressionData = [
    { month: "Jan", peso: 70, gordura: 18, musculo: 65 },
    { month: "Fev", peso: 71, gordura: 17, musculo: 66 },
    { month: "Mar", peso: 72, gordura: 16, musculo: 67 },
    { month: "Abr", peso: 73, gordura: 15, musculo: 68 },
    { month: "Mai", peso: 74, gordura: 14, musculo: 69 },
    { month: "Jun", peso: 75, gordura: 13, musculo: 70 },
  ];

  const workoutDistribution = [
    { name: "Peito", value: 25, color: "#4A8173" },
    { name: "Costas", value: 23, color: "#66998C" },
    { name: "Pernas", value: 20, color: "#8DB4AB" },
    { name: "Ombros", value: 16, color: "#B4D0CA" },
    { name: "Braços", value: 16, color: "#DBECE9" },
  ];

  const monthlyStats = {
    totalWorkouts: 28,
    avgDuration: 42,
    totalSets: 168,
    avgWeight: 16.5,
    streak: 7,
    consistency: 87,
  };

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
            Estatísticas
          </h1>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Monthly Overview */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={24} className="text-mint-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Resumo do Mês
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-mint-100/50 rounded-xl">
                <div className="text-2xl font-bold text-mint-600 mb-1">
                  {monthlyStats.totalWorkouts}
                </div>
                <div className="text-xs text-gray-600">Treinos</div>
              </div>
              <div className="text-center p-3 bg-mint-100/50 rounded-xl">
                <div className="text-2xl font-bold text-mint-600 mb-1">
                  {monthlyStats.avgDuration}min
                </div>
                <div className="text-xs text-gray-600">Duração média</div>
              </div>
              <div className="text-center p-3 bg-mint-100/50 rounded-xl">
                <div className="text-2xl font-bold text-mint-600 mb-1">
                  {monthlyStats.totalSets}
                </div>
                <div className="text-xs text-gray-600">Séries totais</div>
              </div>
              <div className="text-center p-3 bg-mint-100/50 rounded-xl">
                <div className="text-2xl font-bold text-mint-600 mb-1">
                  {monthlyStats.consistency}%
                </div>
                <div className="text-xs text-gray-600">Consistência</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  Sequência: {monthlyStats.streak} dias
                </span>
              </div>
              <Badge className="bg-mint-500 text-white">Em progresso</Badge>
            </div>
          </GlassCard>

          {/* Goals and Achievements */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <Target size={20} className="text-mint-600" />
              <h3 className="font-semibold text-gray-900">Metas do Mês</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Treinos realizados</span>
                  <span className="font-medium text-gray-900">28/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-mint-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: "93%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Peso alvo</span>
                  <span className="font-medium text-gray-900">75/78kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-mint-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: "96%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Consistência</span>
                  <span className="font-medium text-gray-900">87/90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-mint-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: "97%" }}
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Weekly Frequency Chart */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} className="text-mint-600" />
              <h3 className="font-semibold text-gray-900">
                Frequência Semanal
              </h3>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#B4D0CA" />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 12, fill: "#374151" }}
                    stroke="#666"
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#374151" }}
                    stroke="#666"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #B4D0CA",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="treinos"
                    stroke="#4A8173"
                    fill="#B4D0CA"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="meta"
                    stroke="#FF6B6B"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Muscle Group Distribution */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell size={20} className="text-mint-600" />
              <h3 className="font-semibold text-gray-900">Grupos Musculares</h3>
            </div>

            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workoutDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelStyle={{ fontSize: "10px", fill: "#374151" }}
                  >
                    {workoutDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {workoutDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Progression Chart */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <Target size={20} className="text-mint-600" />
              <h3 className="font-semibold text-gray-900">Evolução Corporal</h3>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#B4D0CA" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#374151" }}
                    stroke="#666"
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#374151" }}
                    stroke="#666"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #B4D0CA",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="peso"
                    stroke="#4A8173"
                    strokeWidth={2}
                    name="Peso (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="musculo"
                    stroke="#66998C"
                    strokeWidth={2}
                    name="Massa muscular (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="gordura"
                    stroke="#FF6B6B"
                    strokeWidth={2}
                    name="Gordura (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-white/50 border-mint-300 text-mint-700 hover:bg-mint-50 rounded-xl h-12"
              onClick={() => navigate("/calendar")}
            >
              <Calendar size={16} className="mr-2" />
              Ver Calendário
            </Button>
            <Button
              variant="outline"
              className="bg-white/50 border-mint-300 text-mint-700 hover:bg-mint-50 rounded-xl h-12"
              onClick={() => navigate("/routines")}
            >
              <Dumbbell size={16} className="mr-2" />
              Meus Treinos
            </Button>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
