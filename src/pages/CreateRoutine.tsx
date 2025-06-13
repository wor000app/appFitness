import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Calendar,
  Dumbbell,
  Target,
  Plus,
  Clock,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Workout {
  id: string;
  name: string;
  muscleGroup: string;
  exercises: number;
  estimatedTime: string;
}

interface RoutineDay {
  day: string;
  workouts: string[];
}

interface Routine {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  level: string;
  weeklySchedule: RoutineDay[];
}

export default function CreateRoutine() {
  const navigate = useNavigate();

  // Mock data - available workouts
  const availableWorkouts: Workout[] = [
    {
      id: "1",
      name: "Treino 1",
      muscleGroup: "Peito e Bíceps",
      exercises: 6,
      estimatedTime: "45 min",
    },
    {
      id: "2",
      name: "Treino 2",
      muscleGroup: "Costas e Tríceps",
      exercises: 5,
      estimatedTime: "40 min",
    },
    {
      id: "3",
      name: "Treino 3",
      muscleGroup: "Pernas",
      exercises: 7,
      estimatedTime: "50 min",
    },
    {
      id: "4",
      name: "Treino 4",
      muscleGroup: "Ombros e Core",
      exercises: 5,
      estimatedTime: "35 min",
    },
    {
      id: "5",
      name: "Treino 5",
      muscleGroup: "Full Body",
      exercises: 8,
      estimatedTime: "60 min",
    },
  ];

  const [routine, setRoutine] = useState<Routine>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    level: "",
    weeklySchedule: [
      { day: "Segunda", workouts: [] },
      { day: "Terça", workouts: [] },
      { day: "Quarta", workouts: [] },
      { day: "Quinta", workouts: [] },
      { day: "Sexta", workouts: [] },
      { day: "Sábado", workouts: [] },
      { day: "Domingo", workouts: [] },
    ],
  });

  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);

  const levels = ["Iniciante", "Intermediário", "Avançado"];

  const addWorkoutToDay = (dayIndex: number, workoutId: string) => {
    setRoutine((prev) => ({
      ...prev,
      weeklySchedule: prev.weeklySchedule.map((day, index) =>
        index === dayIndex
          ? { ...day, workouts: [...day.workouts, workoutId] }
          : day,
      ),
    }));
  };

  const removeWorkoutFromDay = (dayIndex: number, workoutId: string) => {
    setRoutine((prev) => ({
      ...prev,
      weeklySchedule: prev.weeklySchedule.map((day, index) =>
        index === dayIndex
          ? { ...day, workouts: day.workouts.filter((id) => id !== workoutId) }
          : day,
      ),
    }));
  };

  const toggleWorkoutSelection = (workoutId: string) => {
    setSelectedWorkouts((prev) =>
      prev.includes(workoutId)
        ? prev.filter((id) => id !== workoutId)
        : [...prev, workoutId],
    );
  };

  const getWorkoutById = (id: string) =>
    availableWorkouts.find((w) => w.id === id);

  const saveRoutine = () => {
    if (routine.name && routine.startDate && routine.endDate && routine.level) {
      // Here you would save to your backend/storage
      console.log("Saving routine:", routine);
      navigate("/routines");
    }
  };

  const getTotalWorkoutsPerWeek = () => {
    return routine.weeklySchedule.reduce(
      (total, day) => total + day.workouts.length,
      0,
    );
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
              onClick={saveRoutine}
            >
              <Save size={20} />
            </Button>
          </div>
          <h1 className="text-xl font-semibold">Criar Nova Rotina</h1>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Routine Info */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <Target size={20} className="text-mint-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Informações da Rotina
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="routine-name" className="text-gray-700">
                  Nome da Rotina
                </Label>
                <Input
                  id="routine-name"
                  placeholder="Ex: PROTOCOLO HIPERTROFIA"
                  value={routine.name}
                  onChange={(e) =>
                    setRoutine((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-700">
                  Descrição
                </Label>
                <Input
                  id="description"
                  placeholder="Descreva o objetivo da rotina"
                  value={routine.description}
                  onChange={(e) =>
                    setRoutine((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date" className="text-gray-700">
                    Data de Início
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={routine.startDate}
                    onChange={(e) =>
                      setRoutine((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="end-date" className="text-gray-700">
                    Data de Fim
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={routine.endDate}
                    onChange={(e) =>
                      setRoutine((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="level" className="text-gray-700">
                  Nível de Dificuldade
                </Label>
                <Select
                  value={routine.level}
                  onValueChange={(value) =>
                    setRoutine((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassCard>

          {/* Available Workouts */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell size={20} className="text-mint-600" />
              <h3 className="font-semibold text-gray-900">
                Treinos Disponíveis
              </h3>
            </div>

            <div className="space-y-3">
              {availableWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white/50"
                >
                  <Checkbox
                    checked={selectedWorkouts.includes(workout.id)}
                    onCheckedChange={() => toggleWorkoutSelection(workout.id)}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {workout.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {workout.muscleGroup}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>{workout.exercises} exercícios</span>
                      <span>•</span>
                      <span>{workout.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedWorkouts.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                Selecione os treinos que deseja incluir na rotina
              </div>
            )}
          </GlassCard>

          {/* Weekly Schedule */}
          {selectedWorkouts.length > 0 && (
            <GlassCard className="p-6 bg-white/60">
              <div className="flex items-center gap-3 mb-4">
                <Calendar size={20} className="text-mint-600" />
                <h3 className="font-semibold text-gray-900">
                  Cronograma Semanal
                </h3>
              </div>

              <div className="space-y-4">
                {routine.weeklySchedule.map((day, dayIndex) => (
                  <div
                    key={day.day}
                    className="border border-gray-200 rounded-xl p-4 bg-white/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{day.day}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {day.workouts.length} treino(s)
                      </Badge>
                    </div>

                    {/* Assigned Workouts */}
                    {day.workouts.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {day.workouts.map((workoutId) => {
                          const workout = getWorkoutById(workoutId);
                          return (
                            <div
                              key={workoutId}
                              className="flex items-center justify-between p-2 bg-mint-100/50 rounded-lg"
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {workout?.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {workout?.muscleGroup}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  removeWorkoutFromDay(dayIndex, workoutId)
                                }
                                className="h-6 w-6 text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={12} />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Add Workout Dropdown */}
                    <Select
                      onValueChange={(workoutId) =>
                        addWorkoutToDay(dayIndex, workoutId)
                      }
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="+ Adicionar treino" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedWorkouts
                          .filter((id) => !day.workouts.includes(id))
                          .map((workoutId) => {
                            const workout = getWorkoutById(workoutId);
                            return (
                              <SelectItem key={workoutId} value={workoutId}>
                                {workout?.name} - {workout?.muscleGroup}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Routine Summary */}
          {routine.name && selectedWorkouts.length > 0 && (
            <GlassCard className="p-4 bg-mint-100/50">
              <h4 className="font-semibold text-gray-900 mb-3">
                Resumo da Rotina
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-lg font-bold text-mint-600">
                    {selectedWorkouts.length}
                  </div>
                  <div className="text-gray-600">Treinos</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-mint-600">
                    {getTotalWorkoutsPerWeek()}
                  </div>
                  <div className="text-gray-600">Por semana</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-mint-600">
                    {routine.level || "—"}
                  </div>
                  <div className="text-gray-600">Nível</div>
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
              onClick={saveRoutine}
              disabled={
                !routine.name ||
                !routine.startDate ||
                !routine.endDate ||
                !routine.level ||
                selectedWorkouts.length === 0
              }
              className="flex-1 bg-mint-600 hover:bg-mint-700 text-white rounded-xl"
            >
              <Save size={16} className="mr-2" />
              Salvar Rotina
            </Button>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
