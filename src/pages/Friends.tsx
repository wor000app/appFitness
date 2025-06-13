import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Users,
  UserPlus,
  MessageCircle,
  Trophy,
  Target,
  Search,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const navigate = useNavigate();

  // Mock data for friends
  const friends = [
    {
      id: 1,
      name: "Ana Silva",
      avatar: "",
      status: "online",
      workoutsThisWeek: 5,
      currentStreak: 12,
      level: "Intermediário",
      lastActivity: "Treinou há 2 horas",
      mutualFriends: 3,
    },
    {
      id: 2,
      name: "Carlos Santos",
      avatar: "",
      status: "offline",
      workoutsThisWeek: 3,
      currentStreak: 8,
      level: "Avançado",
      lastActivity: "Treinou ontem",
      mutualFriends: 5,
    },
    {
      id: 3,
      name: "Marina Costa",
      avatar: "",
      status: "online",
      workoutsThisWeek: 4,
      currentStreak: 15,
      level: "Iniciante",
      lastActivity: "Treinou há 1 hora",
      mutualFriends: 2,
    },
    {
      id: 4,
      name: "João Oliveira",
      avatar: "",
      status: "online",
      workoutsThisWeek: 6,
      currentStreak: 20,
      level: "Avançado",
      lastActivity: "Treino ativo",
      mutualFriends: 8,
    },
  ];

  const friendRequests = [
    {
      id: 1,
      name: "Pedro Ferreira",
      avatar: "",
      mutualFriends: 2,
      timeAgo: "há 2 dias",
    },
    {
      id: 2,
      name: "Sofia Lima",
      avatar: "",
      mutualFriends: 1,
      timeAgo: "há 1 semana",
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-500" : "bg-gray-400";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante":
        return "bg-blue-100 text-blue-700";
      case "Intermediário":
        return "bg-yellow-100 text-yellow-700";
      case "Avançado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
            <Button
              variant="ghost"
              size="icon"
              className="text-mint-600 hover:bg-mint-100 rounded-full bg-white/60 backdrop-blur-sm"
            >
              <Search size={20} />
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Amigos</h1>
        </div>

        <div className="px-4 space-y-4">
          {/* Quick Stats */}
          <GlassCard className="p-6 bg-white/60">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-mint-600 mb-1">
                  {friends.length}
                </div>
                <div className="text-xs text-gray-600">Amigos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-mint-600 mb-1">
                  {friends.filter((f) => f.status === "online").length}
                </div>
                <div className="text-xs text-gray-600">Online</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-mint-600 mb-1">
                  {friendRequests.length}
                </div>
                <div className="text-xs text-gray-600">Solicitações</div>
              </div>
            </div>
          </GlassCard>

          {/* Friend Requests */}
          {friendRequests.length > 0 && (
            <GlassCard className="p-6 bg-white/60">
              <div className="flex items-center gap-3 mb-4">
                <UserPlus size={20} className="text-mint-600" />
                <h3 className="font-semibold text-gray-900">
                  Solicitações de Amizade
                </h3>
                <Badge className="bg-mint-500 text-white">
                  {friendRequests.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {friendRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 bg-mint-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback className="bg-mint-200 text-mint-700">
                          {request.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {request.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {request.mutualFriends} amigos em comum •{" "}
                          {request.timeAgo}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-mint-500 hover:bg-mint-600 text-white h-8 px-3"
                      >
                        Aceitar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-600 h-8 px-3"
                      >
                        Recusar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Friends List */}
          <GlassCard className="p-6 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <Users size={20} className="text-mint-600" />
              <h3 className="font-semibold text-gray-900">Meus Amigos</h3>
            </div>

            <div className="space-y-4">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-mint-200 text-mint-700">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                            friend.status,
                          )}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {friend.name}
                          </span>
                          <Badge
                            className={`text-xs ${getLevelColor(friend.level)}`}
                          >
                            {friend.level}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {friend.lastActivity}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Target size={12} />
                            <span>
                              {friend.workoutsThisWeek} treinos/semana
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy size={12} />
                            <span>{friend.currentStreak} dias</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-mint-600 h-8 w-8"
                      >
                        <MessageCircle size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-gray-600 h-8 w-8"
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Add Friend Button */}
          <GlassCard className="p-6 bg-white/60">
            <Button className="w-full bg-mint-500 hover:bg-mint-600 text-white rounded-xl h-12">
              <UserPlus size={20} className="mr-2" />
              Adicionar Amigo
            </Button>
          </GlassCard>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
