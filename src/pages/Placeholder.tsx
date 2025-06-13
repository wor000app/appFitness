import { GlassCard } from "@/components/ui/glass-card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function Placeholder({
  title,
  description,
  icon = <Construction size={40} className="text-mint-600" />,
}: PlaceholderProps) {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <div className="w-10" />
        </div>

        {/* Placeholder Content */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <GlassCard className="p-8 bg-white/40 text-center">
            <div className="mb-4">{icon}</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Em Desenvolvimento
            </h2>
            <p className="text-gray-600 mb-6">{description}</p>
            <Button
              onClick={() => navigate("/")}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl"
            >
              Voltar ao Início
            </Button>
          </GlassCard>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
