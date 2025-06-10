import Link from "next/link";
import {
  MapPin,
  Users,
  BarChart3,
  User,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Star,
  Zap,
  Lightbulb,
} from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Olá, Alana Sofia!
            </h1>
            <p className="text-lg text-muted-foreground">
              Bem-vinda de volta ao seu painel Sonangol
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Última visita</p>
              <p className="text-lg font-medium text-foreground">Hoje, 14:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground mb-1">
              Insight IA do Dia
            </h3>
            <p className="text-muted-foreground">
              Baseado no seu padrão, a sua botija de gás deve durar mais 8 dias.
              Recomendamos abastecer na Bomba Maianga (15% mais barato hoje).
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
            Ver Mais
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          title="Último Abastecimento"
          value="20L"
          subtitle="Há 2 dias"
          color="blue"
        />
        <StatCard
          icon={<Zap className="h-5 w-5" />}
          title="Gás Restante"
          value="8 dias"
          subtitle="Estimativa IA"
          color="orange"
        />
        <StatCard
          icon={<Star className="h-5 w-5" />}
          title="Pontos Fidelidade"
          value="2.847"
          subtitle="+120 esta semana"
          color="yellow"
        />
        <StatCard
          icon={<BarChart3 className="h-5 w-5" />}
          title="Economia Mensal"
          value="12%"
          subtitle="vs mês anterior"
          color="green"
        />
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<MapPin className="h-6 w-6 text-primary" />}
          title="Localizador de Bombas"
          description="5 bombas próximas • Preços atualizados"
          href="/dashboard/bombas"
          badge="3 disponíveis"
        />
        <FeatureCard
          icon={<Users className="h-6 w-6 text-primary" />}
          title="Comunidade"
          description="1.247 membros • 15 posts hoje"
          href="/dashboard/comunidade"
          badge="5 novas dicas"
        />
        <FeatureCard
          icon={<BarChart3 className="h-6 w-6 text-primary" />}
          title="Gestão de Consumo"
          description="Análise inteligente • Previsões IA"
          href="/dashboard/consumo"
          badge="Relatório pronto"
        />
        <FeatureCard
          icon={<User className="h-6 w-6 text-primary" />}
          title="Perfil"
          description="Nível Ouro • 95% completo"
          href="/dashboard/perfil"
          badge="Certificado novo"
        />
      </div>

      {/* Promotional Banner */}
      <div className="bg-accent border border-border rounded-lg p-8 relative">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 text-primary" />
              </div>
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                PROMOÇÃO ESPECIAL
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Dobro de Pontos Esta Semana!
            </h2>
            <p className="text-muted-foreground">
              Abasteça qualquer quantidade e ganhe pontos em dobro. Válido até
              domingo, 12 de Janeiro.
            </p>
          </div>
          <div className="hidden md:block">
            <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-200">
              Participar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Atividade Recente
            </h2>
            <Link
              href="/dashboard/perfil"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              Ver Tudo
            </Link>
          </div>
          <div className="space-y-4">
            <ActivityItem
              icon={<TrendingUp className="h-4 w-4" />}
              description="Abastecimento de 20L na Bomba Sonangol Cacuaco"
              time="Há 2 horas"
              amount="3.600 AOA"
              status="success"
            />
            <ActivityItem
              icon={<Users className="h-4 w-4" />}
              description="Publicou dica sobre manutenção na Comunidade"
              time="Ontem"
              amount="+50 pontos"
              status="info"
            />
            <ActivityItem
              icon={<Zap className="h-4 w-4" />}
              description="Entrega de botija de gás agendada"
              time="Amanhã, 14:00"
              amount="3.500 AOA"
              status="pending"
            />
            <ActivityItem
              icon={<Star className="h-4 w-4" />}
              description="Avaliou Bomba Sonangol Maianga (5 estrelas)"
              time="3 dias atrás"
              amount="+25 pontos"
              status="success"
            />
          </div>
        </div>

        {/* Smart Alerts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Alertas Inteligentes
            </h2>
            <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
              3 novos
            </span>
          </div>
          <div className="space-y-4">
            <AlertItem
              type="warning"
              title="Gás Acabando"
              description="Sua botija deve acabar em 8 dias. Quer agendar entrega?"
              action="Agendar"
              urgent={true}
            />
            <AlertItem
              type="info"
              title="Promoção Personalizada"
              description="10% desconto em gasóleo na sua bomba preferida hoje."
              action="Aproveitar"
              urgent={false}
            />
            <AlertItem
              type="success"
              title="Meta Atingida"
              description="Parabéns! Economizou 15% este mês vs objetivo."
              action="Ver Relatório"
              urgent={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "orange" | "yellow" | "green";
};

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  color,
}) => {
  const colorClasses = {
    blue: "text-blue-600",
    orange: "text-orange-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <div className={colorClasses[color]}>{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">{title}</p>
          <p className="text-lg font-semibold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  href,
  badge,
}) => (
  <Link
    href={href}
    className="group block bg-card border border-border p-6 rounded-lg hover:bg-accent transition-all duration-200"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
      {badge && (
        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
          {badge}
        </span>
      )}
    </div>
    <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm mb-4">{description}</p>
    <div className="flex items-center text-primary text-sm font-medium">
      Acessar
      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
    </div>
  </Link>
);

type ActivityItemProps = {
  icon: React.ReactNode;
  description: string;
  time: string;
  amount: string;
  status: "success" | "info" | "pending";
};

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  description,
  time,
  amount,
  status,
}) => {
  const statusColors = {
    success: "text-green-600",
    info: "text-blue-600",
    pending: "text-orange-600",
  };

  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent transition-colors duration-200">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-foreground text-sm">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${statusColors[status]}`}>
          {amount}
        </p>
      </div>
    </div>
  );
};

type AlertItemProps = {
  type: "warning" | "info" | "success";
  title: string;
  description: string;
  action: string;
  urgent: boolean;
};

const AlertItem: React.FC<AlertItemProps> = ({
  type,
  title,
  description,
  action,
  urgent,
}) => {
  const typeConfig = {
    warning: {
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "text-orange-600",
    },
    info: { icon: <Lightbulb className="h-4 w-4" />, color: "text-blue-600" },
    success: { icon: <Star className="h-4 w-4" />, color: "text-green-600" },
  };

  const config = typeConfig[type];

  return (
    <div className="p-4 rounded-lg bg-accent border border-border">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`${config.color} mt-0.5`}>{config.icon}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-foreground">{title}</h4>
              {urgent && (
                <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
                  URGENTE
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        <button className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors duration-200">
          {action}
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
