import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Dumbbell,
  BarChart3,
  History,
  ChevronUp,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Workout {
  id: number;
  name: string;
  muscleGroup: string;
  lastCompleted: string;
  historyCount: number;
}z

interface Protocol {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  level: string;
  icon: string;
  workouts: Workout[];
}

export default function WorkoutRoutines() {
  const navigate = useNavigate();
  const [expandedProtocol, setExpandedProtocol] = useState<number | null>(1);

  // Mock data - replace with real data later
  const protocols: Protocol[] = [
    {
      id: 1,
      name: "PROTOCOLO HIPERTROFIA",
      startDate: "05/05/2025",
      endDate: "14/06/2025",
      level: "Avançado",
      icon: "💪",
      workouts: [
        {
          id: 1,
          name: "Treino 1",
          muscleGroup: "PEITO E BÍCEPS",
          lastCompleted: "02/06/2025",
          historyCount: 7,
        },
        {
          id: 2,
          name: "Treino 2",
          muscleGroup: "COSTAS E TRÍCEPS",
          lastCompleted: "30/05/2025",
          historyCount: 6,
        },
        {
          id: 3,
          name: "Treino 3",
          muscleGroup: "PERNAS",
          lastCompleted: "28/05/2025",
          historyCount: 5,
        },
        {
          id: 4,
          name: "Treino 4",
          muscleGroup: "OMBROS E CORE",
          lastCompleted: "26/05/2025",
          historyCount: 4,
        },
      ],
    },
    {
      id: 2,
      name: "PROTOCOLO DEFINIÇÃO",
      startDate: "01/04/2025",
      endDate: "30/04/2025",
      level: "Intermediário",
      icon: "🔥",
      workouts: [
        {
          id: 5,
          name: "Treino A",
          muscleGroup: "FULL BODY",
          lastCompleted: "29/04/2025",
          historyCount: 12,
        },
        {
          id: 6,
          name: "Treino B",
          muscleGroup: "CARDIO + CORE",
          lastCompleted: "27/04/2025",
          historyCount: 10,
        },
      ],
    },
  ];

  const toggleProtocol = (protocolId: number) => {
    setExpandedProtocol(expandedProtocol === protocolId ? null : protocolId);
  };

  return (
    <div className="min-h-screen bg-mint-100 px-4 py-6 pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">
            Rotinas de Treinos
          </h1>
          <div className="w-10" />
        </div>

        {/* Protocols List */}
        <div className="space-y-4">
          {protocols.map((protocol) => (
            <GlassCard
              key={protocol.id}
              className="bg-white/40 overflow-hidden"
            >
              {/* Protocol Header */}
              <button
                onClick={() => toggleProtocol(protocol.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-mint-500 rounded-full flex items-center justify-center text-white text-lg">
                    {protocol.icon}
                  </div>
                  <div className="text-left">
                    <h2 className="font-bold text-gray-900 mb-1">
                      {protocol.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>
                        {protocol.startDate} - {protocol.endDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-mint-200/50 border-mint-300 text-mint-700"
                  >
                    {protocol.level}
                  </Badge>
                  <ChevronUp
                    size={20}
                    className={`text-gray-400 transition-transform ${
                      expandedProtocol === protocol.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Workouts List */}
              {expandedProtocol === protocol.id && (
                <div className="border-t border-white/20">
                  {protocol.workouts.map((workout, index) => (
                    <div
                      key={workout.id}
                      className="p-6 border-b border-gray-200 last:border-b-0"
                    >
                      {/* Workout Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {workout.name}
                          </h3>
                          <div className="w-2 h-2 bg-mint-500 rounded-full"></div>
                        </div>
                        <p className="text-gray-700 font-medium mb-2">
                          {workout.muscleGroup}
                        </p>
                        <p className="text-sm text-mint-600">
                          Último treino concluído em: {workout.lastCompleted}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 bg-white/50 border-mint-300 text-mint-700 hover:bg-mint-50 rounded-xl h-10"
                          >
                            <History size={16} className="mr-2" />
                            Histórico
                            <Badge
                              variant="secondary"
                              className="ml-2 bg-mint-500 text-white text-xs"
                            >
                              {workout.historyCount}
                            </Badge>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 bg-white/50 border-mint-300 text-mint-700 hover:bg-mint-50 rounded-xl h-10"
                          >
                            <BarChart3 size={16} className="mr-2" />
                            Evolução
                          </Button>
                        </div>

                        <Button
                          className="w-full bg-mint-600 hover:bg-mint-700 text-white rounded-xl h-12 font-semibold"
                          onClick={() => navigate(`/workout/${workout.id}`)}
                        >
                          <Dumbbell size={18} className="mr-2" />
                          VER TREINO
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Add New Protocol Button */}
        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            className="w-full bg-white/50 border-mint-300 text-mint-700 hover:bg-mint-50 rounded-2xl h-12"
            onClick={() => navigate("/create-routine")}
          >
            <Target size={18} className="mr-2" />
            Criar Nova Rotina
          </Button>
          <Button
            variant="outline"
            className="w-full bg-white/50 border-mint-300 text-mint-700 hover:bg-mint-50 rounded-2xl h-12"
            onClick={() => navigate("/create-workout")}
          >
            <Dumbbell size={18} className="mr-2" />
            Criar Novo Treino
          </Button>
        </div>

        {/* Stats Card */}
        <GlassCard className="mt-6 p-6 bg-white/40">
          <h3 className="font-semibold text-gray-900 mb-4">
            Resumo do Protocolo Atual
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-mint-600 mb-1">8</div>
              <div className="text-sm text-gray-600">Treinos completos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mint-600 mb-1">2</div>
              <div className="text-sm text-gray-600">Semanas ativas</div>
            </div>
          </div>
        </GlassCard>
      </div>

      <Navigation />
    </div>
  );
}
