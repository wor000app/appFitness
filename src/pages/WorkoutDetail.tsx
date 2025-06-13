import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, Info, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Exercise {
  id: number;
  name: string;
  series: string;
  weight: string;
  rest: string;
  instructions: string;
  videoThumbnail: string;
}

interface WorkoutData {
  id: string;
  name: string;
  muscleGroup: string;
  exercises: Exercise[];
}

export default function WorkoutDetail() {
  const navigate = useNavigate();
  const { workoutId } = useParams();

  // Mock data - replace with real data later
  const workoutData: WorkoutData = {
    id: "1",
    name: "Treino 1",
    muscleGroup: "PEITO E BÍCEPS",
    exercises: [
      {
        id: 1,
        name: "Supino Inclinado com Halteres",
        series: "6x8 a 10",
        weight: "15kg",
        rest: "90s",
        instructions: "USE HALTERES ACIMA DE 14KG",
        videoThumbnail: "/api/placeholder/120/80",
      },
      {
        id: 2,
        name: "Supino Reto com Halteres",
        series: "4x12/10/8",
        weight: "10kg",
        rest: "60s",
        instructions:
          "PROGRESSÃO DE CARGA A CADA SÉRIE DIMINUINDO AS REPETIÇÕES",
        videoThumbnail: "/api/placeholder/120/80",
      },
      {
        id: 3,
        name: "Crucifixo Máquina",
        series: "3x15",
        weight: "9kg",
        rest: "45s",
        instructions: "NA ÚLTIMA SÉRIE FAÇA UM REST-PAUSE",
        videoThumbnail: "/api/placeholder/120/80",
      },
      {
        id: 4,
        name: "Rosca Direta com Barra",
        series: "4x10",
        weight: "12kg",
        rest: "60s",
        instructions: "MANTENHA CONTROLE NO MOVIMENTO",
        videoThumbnail: "/api/placeholder/120/80",
      },
      {
        id: 5,
        name: "Rosca Martelo",
        series: "3x12",
        weight: "8kg",
        rest: "45s",
        instructions: "FOQUE NA CONTRAÇÃO DO BÍCEPS",
        videoThumbnail: "/api/placeholder/120/80",
      },
    ],
  };

  const handleStartWorkout = () => {
    navigate("/timer");
  };

  return (
    <div className="min-h-screen bg-mint-100 pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gray-800 text-white px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
            </Button>
            <span className="text-sm">Voltar</span>
            <div className="w-10" />
          </div>
          <h1 className="text-2xl font-bold">{workoutData.muscleGroup}</h1>
        </div>

        {/* Start Section */}
        <div className="bg-mint-500 px-4 py-6">
          <Button
            onClick={handleStartWorkout}
            className="w-full bg-mint-700 hover:bg-mint-800 text-white rounded-2xl h-14 text-lg font-semibold mb-4"
            size="lg"
          >
            <Play size={20} className="mr-2" />
            INICIAR
          </Button>

          <div className="text-center text-white">
            <p className="font-medium mb-1">
              Você está no "modo visualização".
            </p>
            <p className="text-mint-100">
              Aperte INICIAR para começar seu treino.
            </p>
          </div>
        </div>

        {/* Exercises List */}
        <div className="px-4 py-6 space-y-4">
          {workoutData.exercises.map((exercise, index) => (
            <GlassCard key={exercise.id} className="p-4 bg-white/60">
              <div className="flex gap-4">
                {/* Exercise Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                    {exercise.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 text-sm">
                        Séries:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {exercise.series}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 text-sm">
                        Carga:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {exercise.weight}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-mint-600" />
                      <span className="text-mint-600 font-medium underline cursor-pointer">
                        Intervalo: {exercise.rest}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-start gap-2">
                      <Info
                        size={14}
                        className="text-gray-600 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <span className="font-medium text-gray-700 text-sm block mb-1">
                          Instruções:
                        </span>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {exercise.instructions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Thumbnail */}
                <div className="w-24 h-20 flex-shrink-0">
                  <div className="relative w-full h-full bg-gradient-to-br from-mint-400 to-mint-600 rounded-xl overflow-hidden">
                    <img
                      src={exercise.videoThumbnail}
                      alt={`${exercise.name} demonstration`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <PlayCircle size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Summary Card */}
        <div className="px-4 mb-6">
          <GlassCard className="p-4 bg-white/40">
            <h3 className="font-semibold text-gray-900 mb-3">
              Resumo do Treino
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-mint-600 mb-1">
                  {workoutData.exercises.length}
                </div>
                <div className="text-xs text-gray-600">Exercícios</div>
              </div>
              <div>
                <div className="text-xl font-bold text-mint-600 mb-1">~45</div>
                <div className="text-xs text-gray-600">Minutos</div>
              </div>
              <div>
                <div className="text-xl font-bold text-mint-600 mb-1">18</div>
                <div className="text-xs text-gray-600">Séries</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
