import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Edit,
  Users,
  BarChart3,
  GraduationCap,
  Dumbbell,
  Volume2,
  ChevronRight,
  Settings,
} from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-mint-100 px-4 py-6 pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Edit size={20} />
          </Button>
        </div>

        {/* Profile Card */}
        <GlassCard className="p-6 mb-6 bg-white/40">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/80/80"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.innerHTML =
                    '<div class="text-white font-semibold text-lg">IR</div>';
                }}
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Isabelli Roberts
            </h2>
            <p className="text-gray-600 text-sm mb-4">isabelli_roberts</p>

            {/* Stats */}
            <div className="bg-mint-200/30 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-mint-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👟</span>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900">6 859</p>
                    <p className="text-sm text-gray-600">Steps today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Menu Items */}
        <div className="space-y-4 mb-6">
          {/* Friends */}
          <GlassCard className="bg-white/40">
            <button
              className="w-full p-4 flex items-center justify-between"
              onClick={() => navigate("/friends")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mint-200/50 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-mint-700" />
                </div>
                <span className="font-medium text-gray-900">Friends</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </GlassCard>

          {/* Statistics */}
          <GlassCard className="bg-white/40">
            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mint-200/50 rounded-xl flex items-center justify-center">
                  <BarChart3 size={20} className="text-mint-700" />
                </div>
                <span className="font-medium text-gray-900">Statistics</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </GlassCard>

          {/* Academy */}
          <GlassCard className="bg-white/40">
            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mint-200/50 rounded-xl flex items-center justify-center">
                  <GraduationCap size={20} className="text-mint-700" />
                </div>
                <span className="font-medium text-gray-900">Academy</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </GlassCard>

          {/* Strength Log */}
          <GlassCard className="bg-white/40">
            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mint-200/50 rounded-xl flex items-center justify-center">
                  <Dumbbell size={20} className="text-mint-700" />
                </div>
                <span className="font-medium text-gray-900">Strength log</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </GlassCard>
        </div>

        {/* Settings */}
        <GlassCard className="p-4 mb-6 bg-white/40">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings size={18} />
            Configurações
          </h3>

          <div className="space-y-4">
            {/* Sound Setting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-mint-200/50 rounded-lg flex items-center justify-center">
                  <Volume2 size={16} className="text-mint-700" />
                </div>
                <span className="font-medium text-gray-900">Sound</span>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-mint-200/50 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                </div>
                <span className="font-medium text-gray-900">Modo Escuro</span>
              </div>
              <Switch />
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-mint-200/50 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <span className="font-medium text-gray-900">Notificações</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </GlassCard>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full rounded-2xl h-12 border-red-200 text-red-600 hover:bg-red-50"
        >
          Sair da Conta
        </Button>
      </div>

      <Navigation />
    </div>
  );
}
