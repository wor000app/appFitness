import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  PlayCircle,
  Clock,
  Info,
  Dumbbell,
  Upload,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Exercise {
  id: string;
  name: string;
  series: string;
  weight: string;
  rest: string;
  instructions: string;
  muscleGroup: string;
  videoFile?: File;
  videoUrl?: string;
}

interface Workout {
  name: string;
  muscleGroup: string;
  exercises: Exercise[];
}

export default function CreateWorkout() {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout>({
    name: "",
    muscleGroup: "",
    exercises: [],
  });

  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [newExercise, setNewExercise] = useState<Exercise>({
    id: "",
    name: "",
    series: "",
    weight: "",
    rest: "",
    instructions: "",
    muscleGroup: "",
    videoFile: undefined,
    videoUrl: "",
  });

  const muscleGroups = [
    "Peito",
    "Costas",
    "Pernas",
    "Ombros",
    "Bíceps",
    "Tríceps",
    "Core",
    "Glúteos",
    "Panturrilha",
  ];

  const predefinedExercises = [
    "Supino Inclinado com Halteres",
    "Supino Reto com Halteres",
    "Crucifixo Máquina",
    "Rosca Direta com Barra",
    "Rosca Martelo",
    "Pulldown",
    "Remada Baixa",
    "Leg Press",
    "Agachamento",
    "Elevação Lateral",
  ];

  const addExercise = () => {
    if (newExercise.name && newExercise.series) {
      const exerciseToAdd = {
        ...newExercise,
        id: Date.now().toString(),
      };
      setWorkout((prev) => ({
        ...prev,
        exercises: [...prev.exercises, exerciseToAdd],
      }));
      setNewExercise({
        id: "",
        name: "",
        series: "",
        weight: "",
        rest: "",
        instructions: "",
        muscleGroup: "",
        videoFile: undefined,
        videoUrl: "",
      });
      setIsAddingExercise(false);
    }
  };

  const removeExercise = (id: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== id),
    }));
  };

  const saveWorkout = () => {
    if (workout.name && workout.exercises.length > 0) {
      // Here you would save to your backend/storage
      console.log("Saving workout:", workout);
      navigate("/routines");
    }
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
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
              onClick={saveWorkout}
            >
              <Save size={20} />
            </Button>
          </div>
          <h1 className="text-xl font-semibold">Criar Treino</h1>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Workout Info */}
          <GlassCard className="p-6 bg-white/60">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informações do Treino
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="workout-name" className="text-gray-700">
                  Nome do Treino
                </Label>
                <Input
                  id="workout-name"
                  placeholder="Ex: Treino 1"
                  value={workout.name}
                  onChange={(e) =>
                    setWorkout((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="muscle-group" className="text-gray-700">
                  Grupo Muscular Principal
                </Label>
                <Select
                  value={workout.muscleGroup}
                  onValueChange={(value) =>
                    setWorkout((prev) => ({ ...prev, muscleGroup: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o grupo muscular" />
                  </SelectTrigger>
                  <SelectContent>
                    {muscleGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassCard>

          {/* Exercises List */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Exercícios ({workout.exercises.length})
              </h3>
              <Button
                size="sm"
                onClick={() => setIsAddingExercise(true)}
                className="bg-mint-600 hover:bg-mint-700 text-white rounded-xl"
              >
                <Plus size={16} className="mr-1" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-4">
              {workout.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="border border-gray-200 rounded-xl p-4 bg-white/50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {exercise.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Séries:</span>
                          <span className="ml-1 font-medium">
                            {exercise.series}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Carga:</span>
                          <span className="ml-1 font-medium">
                            {exercise.weight}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock size={14} className="text-mint-600" />
                        <span className="text-mint-600 text-sm">
                          Intervalo: {exercise.rest}
                        </span>
                      </div>
                      {exercise.instructions && (
                        <div className="mt-2 flex items-start gap-2">
                          <Info
                            size={14}
                            className="text-gray-600 mt-0.5 flex-shrink-0"
                          />
                          <p className="text-gray-600 text-sm">
                            {exercise.instructions}
                          </p>
                        </div>
                      )}
                      {(exercise.videoFile || exercise.videoUrl) && (
                        <div className="mt-2 flex items-center gap-2">
                          <Video size={14} className="text-mint-600" />
                          <span className="text-mint-600 text-sm">
                            Vídeo de demonstração anexado
                          </span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExercise(exercise.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}

              {workout.exercises.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Dumbbell size={40} className="mx-auto mb-2 text-gray-400" />
                  <p>Nenhum exercício adicionado ainda</p>
                  <p className="text-sm">Clique em "Adicionar" para começar</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Add Exercise Modal */}
          {isAddingExercise && (
            <GlassCard className="p-6 bg-white/80 border-2 border-mint-300">
              <h3 className="font-semibold text-gray-900 mb-4">
                Novo Exercício
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="exercise-name" className="text-gray-700">
                    Nome do Exercício
                  </Label>
                  <Select
                    value={newExercise.name}
                    onValueChange={(value) =>
                      setNewExercise((prev) => ({ ...prev, name: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione ou digite o exercício" />
                    </SelectTrigger>
                    <SelectContent>
                      {predefinedExercises.map((exercise) => (
                        <SelectItem key={exercise} value={exercise}>
                          {exercise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="series" className="text-gray-700">
                      Séries
                    </Label>
                    <Input
                      id="series"
                      placeholder="Ex: 3x12"
                      value={newExercise.series}
                      onChange={(e) =>
                        setNewExercise((prev) => ({
                          ...prev,
                          series: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight" className="text-gray-700">
                      Carga
                    </Label>
                    <Input
                      id="weight"
                      placeholder="Ex: 15kg"
                      value={newExercise.weight}
                      onChange={(e) =>
                        setNewExercise((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="rest" className="text-gray-700">
                    Intervalo
                  </Label>
                  <Input
                    id="rest"
                    placeholder="Ex: 90s"
                    value={newExercise.rest}
                    onChange={(e) =>
                      setNewExercise((prev) => ({
                        ...prev,
                        rest: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="instructions" className="text-gray-700">
                    Instruções
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Ex: USE HALTERES ACIMA DE 14KG"
                    value={newExercise.instructions}
                    onChange={(e) =>
                      setNewExercise((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {/* Video Upload Section */}
                <div>
                  <Label className="text-gray-700 mb-3 block">
                    Vídeo de Demonstração
                  </Label>

                  {!newExercise.videoFile && !newExercise.videoUrl ? (
                    <div className="space-y-3">
                      {/* File Upload */}
                      <div>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setNewExercise((prev) => ({
                                ...prev,
                                videoFile: file,
                                videoUrl: "",
                              }));
                            }
                          }}
                          className="hidden"
                          id="video-upload"
                        />
                        <Label
                          htmlFor="video-upload"
                          className="flex items-center justify-center w-full h-24 border-2 border-dashed border-mint-300 rounded-xl bg-mint-50/50 hover:bg-mint-100/50 cursor-pointer transition-colors"
                        >
                          <div className="text-center">
                            <Upload
                              size={24}
                              className="text-mint-600 mx-auto mb-2"
                            />
                            <span className="text-sm font-medium text-mint-700">
                              Clique para enviar vídeo
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              MP4, MOV, AVI (máx. 50MB)
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-sm text-gray-500">ou</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                      </div>

                      {/* URL Input */}
                      <div>
                        <Input
                          placeholder="Cole a URL do vídeo (YouTube, Vimeo, etc.)"
                          value={newExercise.videoUrl}
                          onChange={(e) =>
                            setNewExercise((prev) => ({
                              ...prev,
                              videoUrl: e.target.value,
                              videoFile: undefined,
                            }))
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-mint-300 rounded-xl p-4 bg-mint-50/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-mint-600 rounded-xl flex items-center justify-center">
                            <Video size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {newExercise.videoFile
                                ? newExercise.videoFile.name
                                : "Vídeo via URL"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {newExercise.videoFile
                                ? `${(newExercise.videoFile.size / 1024 / 1024).toFixed(1)} MB`
                                : newExercise.videoUrl}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setNewExercise((prev) => ({
                              ...prev,
                              videoFile: undefined,
                              videoUrl: "",
                            }))
                          }
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingExercise(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={addExercise}
                    className="flex-1 bg-mint-600 hover:bg-mint-700 text-white"
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Save Button */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/routines")}
              className="flex-1 bg-white/50 border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={saveWorkout}
              disabled={!workout.name || workout.exercises.length === 0}
              className="flex-1 bg-mint-600 hover:bg-mint-700 text-white rounded-xl"
            >
              <Save size={16} className="mr-2" />
              Salvar Treino
            </Button>
          </div>

          {/* Workout Summary */}
          {workout.exercises.length > 0 && (
            <GlassCard className="p-4 bg-mint-100/50">
              <h4 className="font-semibold text-gray-900 mb-2">
                Resumo do Treino
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-lg font-bold text-mint-600">
                    {workout.exercises.length}
                  </div>
                  <div className="text-gray-600">Exercícios</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-mint-600">
                    {workout.exercises.reduce(
                      (acc, ex) =>
                        acc + (parseInt(ex.series.split("x")[0]) || 0),
                      0,
                    )}
                  </div>
                  <div className="text-gray-600">Séries</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-mint-600">~45</div>
                  <div className="text-gray-600">Minutos</div>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
}
