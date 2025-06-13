import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, ArrowLeft, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
}

export default function Timer() {
  const [roundsTimer, setRoundsTimer] = useState<TimerState>({
    minutes: 2,
    seconds: 30,
    isRunning: false,
    isPaused: false,
  });

  const [restTimer, setRestTimer] = useState<TimerState>({
    minutes: 0,
    seconds: 30,
    isRunning: false,
    isPaused: false,
  });

  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds] = useState(5);
  const [selectedRounds, setSelectedRounds] = useState(30);
  const [isRestPhase, setIsRestPhase] = useState(false);

  // Round time options
  const roundOptions = [20, 25, 30, 35, 40];

  // Convert time to total seconds for calculations
  const getTimeInSeconds = (timer: TimerState) =>
    timer.minutes * 60 + timer.seconds;
  const getTotalRoundTime = () =>
    roundsTimer.minutes * 60 + roundsTimer.seconds;
  const getTotalRestTime = () => restTimer.minutes * 60 + restTimer.seconds;

  // Calculate progress for circular timer
  const getProgress = () => {
    if (isRestPhase) {
      const current = getTimeInSeconds(restTimer);
      const total = getTotalRestTime();
      return ((total - current) / total) * 100;
    } else {
      const current = getTimeInSeconds(roundsTimer);
      const total = getTotalRoundTime();
      return ((total - current) / total) * 100;
    }
  };

  const formatTime = (timer: TimerState) => {
    return `${timer.minutes.toString().padStart(2, "0")}:${timer.seconds.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (isRestPhase) {
      setRestTimer((prev) => ({ ...prev, isRunning: true, isPaused: false }));
    } else {
      setRoundsTimer((prev) => ({ ...prev, isRunning: true, isPaused: false }));
    }
  };

  const pauseTimer = () => {
    if (isRestPhase) {
      setRestTimer((prev) => ({ ...prev, isRunning: false, isPaused: true }));
    } else {
      setRoundsTimer((prev) => ({ ...prev, isRunning: false, isPaused: true }));
    }
  };

  const resetTimer = () => {
    setRoundsTimer({
      minutes: 2,
      seconds: 30,
      isRunning: false,
      isPaused: false,
    });
    setRestTimer({
      minutes: 0,
      seconds: 30,
      isRunning: false,
      isPaused: false,
    });
    setCurrentRound(1);
    setIsRestPhase(false);
  };

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isRestPhase && roundsTimer.isRunning) {
      interval = setInterval(() => {
        setRoundsTimer((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            // Round finished, start rest
            setIsRestPhase(true);
            return { ...prev, isRunning: false };
          }
        });
      }, 1000);
    } else if (isRestPhase && restTimer.isRunning) {
      interval = setInterval(() => {
        setRestTimer((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            // Rest finished, next round
            if (currentRound < totalRounds) {
              setCurrentRound((c) => c + 1);
              setIsRestPhase(false);
              setRoundsTimer({
                minutes: 2,
                seconds: 30,
                isRunning: false,
                isPaused: false,
              });
            }
            return { ...prev, isRunning: false };
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    isRestPhase,
    roundsTimer.isRunning,
    restTimer.isRunning,
    currentRound,
    totalRounds,
  ]);

  const isRunning = isRestPhase ? restTimer.isRunning : roundsTimer.isRunning;
  const currentTimer = isRestPhase ? restTimer : roundsTimer;

  return (
    <div className="min-h-screen bg-mint-100 px-4 py-6 pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Timer</h1>
          <div className="w-10" />
        </div>

        {/* Exercise Image/Video Placeholder */}
        <GlassCard className="p-6 mb-6 bg-white/40">
          <div className="aspect-square bg-gradient-to-br from-mint-200 to-mint-300 rounded-2xl flex items-center justify-center mb-4">
            <div className="text-center">
              <Zap size={40} className="text-mint-700 mx-auto mb-2" />
              <p className="text-sm font-medium text-mint-800">
                Exercício Atual
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Jumping Jacks
            </h2>
            <p className="text-sm text-gray-600">Mantenha o ritmo constante</p>
          </div>
        </GlassCard>

        {/* Rounds Selector */}
        <GlassCard className="p-4 mb-6 bg-white/40">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-gray-900">Rounds</span>
            <Badge className="bg-gray-900 text-white">
              {currentRound} de {totalRounds}
            </Badge>
          </div>

          <div className="flex justify-center gap-2">
            {roundOptions.map((value) => (
              <button
                key={value}
                onClick={() => setSelectedRounds(value)}
                className={cn(
                  "w-12 h-10 rounded-xl text-sm font-medium transition-all",
                  selectedRounds === value
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Circular Timer */}
        <GlassCard className="p-8 mb-6 bg-white/40">
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* Background circle */}
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - getProgress() / 100)}`}
                className={cn(
                  "transition-all duration-1000 ease-linear",
                  isRestPhase ? "text-orange-500" : "text-gray-900",
                )}
              />
            </svg>

            {/* Timer display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {formatTime(currentTimer)}
              </div>
              <div
                className={cn(
                  "text-sm font-medium",
                  isRestPhase ? "text-orange-600" : "text-gray-600",
                )}
              >
                {isRestPhase ? "Descanso" : "Treino"}
              </div>
            </div>
          </div>

          {/* Timer Details */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                <Clock size={14} />
                <span>Rounds time</span>
              </div>
              <p className="font-semibold text-gray-900">
                {formatTime({
                  minutes: 2,
                  seconds: 30,
                  isRunning: false,
                  isPaused: false,
                })}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                <Clock size={14} />
                <span>Rest time</span>
              </div>
              <p className="font-semibold text-gray-900">
                {formatTime({
                  minutes: 0,
                  seconds: 30,
                  isRunning: false,
                  isPaused: false,
                })}
              </p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={resetTimer}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-gray-300"
            >
              <RotateCcw size={18} />
            </Button>

            <Button
              onClick={isRunning ? pauseTimer : startTimer}
              className={cn(
                "w-20 h-12 rounded-full text-white",
                isRestPhase
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-900 hover:bg-gray-800",
              )}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
            </Button>
          </div>
        </GlassCard>
      </div>

      <Navigation />
    </div>
  );
}
