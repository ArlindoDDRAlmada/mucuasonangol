# Especificações Técnicas - Sonangol Fuel Pump App

## 🏗️ Arquitetura Técnica Detalhada

### 📁 Estrutura de Componentes

```
src/
├── components/
│   ├── ui/                     # Componentes base Shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── avatar.tsx
│   │   └── table.tsx
│   │
│   ├── layout/                 # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── features/               # Componentes específicos
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── AuthGuard.tsx
│   │   │   └── UserMenu.tsx
│   │   │
│   │   ├── bombas/
│   │   │   ├── MapView.tsx
│   │   │   ├── Filters.tsx
│   │   │   ├── StationCard.tsx
│   │   │   ├── ReservationModal.tsx
│   │   │   └── GPSNavigation.tsx
│   │   │
│   │   ├── comunidade/
│   │   │   ├── PostCard.tsx
│   │   │   ├── CreatePost.tsx
│   │   │   ├── CommentSection.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   ├── PrivateChat.tsx
│   │   │   └── TrendingHashtags.tsx
│   │   │
│   │   ├── consumo/
│   │   │   ├── ConsumptionChart.tsx
│   │   │   ├── GasCalculator.tsx
│   │   │   ├── AlertsPanel.tsx
│   │   │   ├── ReportsSection.tsx
│   │   │   └── AIPoweredInsights.tsx
│   │   │
│   │   ├── perfil/
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── PersonalInfo.tsx
│   │   │   ├── TransactionHistory.tsx
│   │   │   ├── LoyaltySystem.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── PrivacySettings.tsx
│   │   │   └── AIPersonalization.tsx
│   │   │
│   │   ├── manager/
│   │   │   ├── ExecutiveDashboard.tsx
│   │   │   ├── KPICards.tsx
│   │   │   ├── HeatmapView.tsx
│   │   │   ├── PredictiveAnalytics.tsx
│   │   │   └── MaintenanceMonitor.tsx
│   │   │
│   │   └── shared/
│   │       ├── AIAssistant.tsx
│   │       ├── NotificationCenter.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── ThemeToggle.tsx
│   │
│   └── providers/              # Context providers
│       ├── ThemeProvider.tsx
│       ├── AuthProvider.tsx
│       ├── NotificationProvider.tsx
│       └── AIProvider.tsx
```

---

## 🎨 Design System e Componentes UI

### 🎯 Tokens de Design

```typescript
// design-tokens.ts
export const designTokens = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      900: "#1e3a8a",
    },
    sonangol: {
      blue: "#003366",
      orange: "#ff6600",
      gray: "#f5f5f5",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    default: "12px",
    card: "16px",
    button: "8px",
  },
  shadows: {
    soft: "0 2px 8px rgba(0,0,0,0.1)",
    medium: "0 4px 16px rgba(0,0,0,0.15)",
    glassmorphism: "0 8px 32px rgba(31,38,135,0.37)",
  },
  animations: {
    fast: "0.15s ease",
    normal: "0.2s ease",
    slow: "0.3s ease",
  },
};
```

### 🧩 Componentes Base Customizados

#### Button Component

```typescript
// components/ui/button.tsx
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  glassmorphism?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  glassmorphism = false,
  loading = false,
  icon,
  children,
  ...props
}) => {
  const baseClasses = "rounded-xl font-medium transition-all duration-200";
  const glassmorphismClasses = glassmorphism
    ? "backdrop-blur-md bg-white/20 border border-white/30"
    : "";

  return (
    <button
      className={cn(
        baseClasses,
        glassmorphismClasses,
        getVariantClasses(variant)
      )}
      disabled={loading}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
```

#### Card Component

```typescript
// components/ui/card.tsx
interface CardProps {
  glassmorphism?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  shadow?: "soft" | "medium" | "strong";
}

const Card: React.FC<CardProps> = ({
  glassmorphism = true,
  hover = true,
  padding = "md",
  shadow = "soft",
  children,
  className,
  ...props
}) => {
  const baseClasses = "rounded-2xl transition-all duration-200";
  const glassmorphismClasses = glassmorphism
    ? "backdrop-blur-md bg-white/10 border border-white/20"
    : "bg-white dark:bg-gray-800";
  const hoverClasses = hover ? "hover:scale-105 hover:shadow-lg" : "";

  return (
    <div
      className={cn(baseClasses, glassmorphismClasses, hoverClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};
```

---

## 🗺️ Especificações do Localizador de Bombas

### 📍 MapView Component

```typescript
// components/features/bombas/MapView.tsx
interface MapViewProps {
  stations: Station[];
  userLocation?: [number, number];
  selectedStation?: string;
  onStationSelect: (stationId: string) => void;
  filters: FilterState;
}

const MapView: React.FC<MapViewProps> = ({
  stations,
  userLocation,
  selectedStation,
  onStationSelect,
  filters,
}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  // Configuração do mapa Leaflet
  useEffect(() => {
    if (!map) {
      const mapInstance = L.map("map").setView(
        userLocation || [-8.839, 13.2894], // Luanda como padrão
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);

      setMap(mapInstance);
    }
  }, [map, userLocation]);

  // Marcadores personalizados
  const createCustomMarker = (station: Station) => {
    const icon = L.divIcon({
      html: `
        <div class="custom-marker ${station.status}">
          <div class="marker-icon">
            <FuelIcon />
          </div>
          <div class="marker-label">${station.name}</div>
        </div>
      `,
      className: "custom-marker-container",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    return L.marker([station.lat, station.lng], { icon })
      .bindPopup(createPopupContent(station))
      .on("click", () => onStationSelect(station.id));
  };

  return (
    <div className="relative h-full">
      <div id="map" className="h-full rounded-2xl overflow-hidden" />

      {/* Controles do mapa */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button
          variant="secondary"
          size="sm"
          glassmorphism
          onClick={centerOnUser}
        >
          <LocationIcon />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          glassmorphism
          onClick={toggleSatellite}
        >
          <SatelliteIcon />
        </Button>
      </div>

      {/* Legenda */}
      <div className="absolute bottom-4 left-4">
        <Card glassmorphism padding="sm">
          <MapLegend />
        </Card>
      </div>
    </div>
  );
};
```

### 🔍 Filters Component

```typescript
// components/features/bombas/Filters.tsx
interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  stationsCount: number;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFiltersChange,
  stationsCount,
}) => {
  return (
    <Card glassmorphism className="p-4 mb-4">
      <div className="flex flex-wrap gap-4">
        {/* Tipo de combustível */}
        <FilterGroup title="Combustível">
          <FilterChip
            active={filters.fuelTypes.includes("gasoline")}
            onClick={() => toggleFilter("fuelTypes", "gasoline")}
          >
            Gasolina
          </FilterChip>
          <FilterChip
            active={filters.fuelTypes.includes("diesel")}
            onClick={() => toggleFilter("fuelTypes", "diesel")}
          >
            Gasóleo
          </FilterChip>
          <FilterChip
            active={filters.fuelTypes.includes("gas")}
            onClick={() => toggleFilter("fuelTypes", "gas")}
          >
            Gás
          </FilterChip>
        </FilterGroup>

        {/* Serviços */}
        <FilterGroup title="Serviços">
          <FilterChip
            active={filters.services.includes("convenience")}
            onClick={() => toggleFilter("services", "convenience")}
          >
            Loja
          </FilterChip>
          <FilterChip
            active={filters.services.includes("carwash")}
            onClick={() => toggleFilter("services", "carwash")}
          >
            Lavagem
          </FilterChip>
          <FilterChip
            active={filters.services.includes("mechanic")}
            onClick={() => toggleFilter("services", "mechanic")}
          >
            Mecânica
          </FilterChip>
        </FilterGroup>

        {/* Distância */}
        <FilterGroup title="Distância">
          <RangeSlider
            min={0}
            max={50}
            value={filters.maxDistance}
            onChange={(value) =>
              onFiltersChange({ ...filters, maxDistance: value })
            }
            label="km"
          />
        </FilterGroup>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {stationsCount} bombas encontradas
        </span>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpar filtros
        </Button>
      </div>
    </Card>
  );
};
```

---

## 👥 Especificações da Comunidade Social

### 📝 PostCard Component

```typescript
// components/features/comunidade/PostCard.tsx
interface PostCardProps {
  post: Post;
  currentUser: User;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onShare: (postId: string) => void;
  onSave: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLike,
  onComment,
  onShare,
  onSave,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  return (
    <Card glassmorphism className="mb-6">
      {/* Header do post */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Avatar src={post.author.avatar} size="md" />
          <div>
            <h4 className="font-semibold">{post.author.name}</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{formatDate(post.createdAt)}</span>
              {post.author.verified && <VerifiedBadge />}
              <CategoryBadge category={post.category} />
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuItem onClick={() => onSave(post.id)}>
            Guardar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => reportPost(post.id)}>
            Reportar
          </DropdownMenuItem>
        </DropdownMenu>
      </div>

      {/* Conteúdo do post */}
      <div className="p-4">
        <p className="text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>

        {/* Hashtags */}
        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.hashtags.map((tag) => (
              <HashtagChip key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Mídia */}
        {post.media && <MediaGallery media={post.media} />}

        {/* IA Insights */}
        {post.aiInsights && <AIInsightsBadge insights={post.aiInsights} />}
      </div>

      {/* Ações do post */}
      <div className="flex items-center justify-between p-4 border-t border-white/10">
        <div className="flex items-center space-x-6">
          <ActionButton
            icon={<HeartIcon />}
            count={post.likes}
            active={post.isLiked}
            onClick={() => onLike(post.id)}
          >
            Gostar
          </ActionButton>

          <ActionButton
            icon={<CommentIcon />}
            count={post.comments.length}
            onClick={() => setShowComments(!showComments)}
          >
            Comentar
          </ActionButton>

          <ActionButton
            icon={<ShareIcon />}
            count={post.shares}
            onClick={() => onShare(post.id)}
          >
            Partilhar
          </ActionButton>
        </div>

        <SentimentIndicator sentiment={post.sentiment} />
      </div>

      {/* Seção de comentários */}
      {showComments && (
        <div className="border-t border-white/10">
          <CommentSection
            comments={post.comments}
            onAddComment={(comment) => onComment(post.id, comment)}
            currentUser={currentUser}
          />
        </div>
      )}
    </Card>
  );
};
```

---

## 📊 Especificações da Gestão de Consumo

### 📈 ConsumptionChart Component

```typescript
// components/features/consumo/ConsumptionChart.tsx
interface ConsumptionChartProps {
  data: ConsumptionData[];
  period: "week" | "month" | "year";
  type: "gasoline" | "diesel" | "gas" | "all";
  showPredictions?: boolean;
}

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({
  data,
  period,
  type,
  showPredictions = true,
}) => {
  const chartData = useMemo(() => {
    return processChartData(data, period, type);
  }, [data, period, type]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Consumo de Combustível - ${period}`,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y} litros`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Litros",
        },
      },
      x: {
        title: {
          display: true,
          text: "Período",
        },
      },
    },
  };

  return (
    <Card glassmorphism className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Análise de Consumo</h3>

        <div className="flex space-x-2">
          <PeriodSelector
            value={period}
            onChange={setPeriod}
            options={["week", "month", "year"]}
          />

          <TypeSelector
            value={type}
            onChange={setType}
            options={["all", "gasoline", "diesel", "gas"]}
          />
        </div>
      </div>

      <div className="h-80">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Insights de IA */}
      {showPredictions && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
            💡 Insights de IA
          </h4>
          <AIInsights data={chartData} />
        </div>
      )}
    </Card>
  );
};
```

### ⛽ GasCalculator Component

```typescript
// components/features/consumo/GasCalculator.tsx
interface GasCalculatorProps {
  currentUsage: number;
  lastRefill: Date;
  gasType: "domestic" | "industrial";
  householdSize: number;
}

const GasCalculator: React.FC<GasCalculatorProps> = ({
  currentUsage,
  lastRefill,
  gasType,
  householdSize,
}) => {
  const [dailyUsage, setDailyUsage] = useState(0);
  const [prediction, setPrediction] = useState<GasPrediction | null>(null);

  useEffect(() => {
    const calculatePrediction = async () => {
      const result = await aiGasPredictionService.predict({
        currentUsage,
        lastRefill,
        gasType,
        householdSize,
        dailyUsage,
      });
      setPrediction(result);
    };

    calculatePrediction();
  }, [currentUsage, lastRefill, gasType, householdSize, dailyUsage]);

  return (
    <Card glassmorphism className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        🔥 Calculadora Inteligente de Gás
      </h3>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Uso diário estimado (horas)
          </label>
          <Slider
            min={0}
            max={8}
            step={0.5}
            value={dailyUsage}
            onChange={setDailyUsage}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tipo de botija
          </label>
          <Select value={gasType} onChange={setGasType}>
            <option value="domestic">Doméstica (13kg)</option>
            <option value="industrial">Industrial (45kg)</option>
          </Select>
        </div>
      </div>

      {/* Resultados */}
      {prediction && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Duração Estimada"
              value={`${prediction.daysRemaining} dias`}
              icon={<ClockIcon />}
              color="blue"
            />

            <StatCard
              title="Data Prevista"
              value={formatDate(prediction.expectedEndDate)}
              icon={<CalendarIcon />}
              color="green"
            />

            <StatCard
              title="Economia Sugerida"
              value={`${prediction.savingsPercentage}%`}
              icon={<SavingsIcon />}
              color="orange"
            />
          </div>

          {/* Recomendações de IA */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
              🤖 Recomendações Personalizadas
            </h4>
            <ul className="space-y-1 text-sm">
              {prediction.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botão de agendamento */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => scheduleDelivery(prediction.expectedEndDate)}
          >
            📅 Agendar Entrega Automática
          </Button>
        </div>
      )}
    </Card>
  );
};
```

---

## 🤖 Especificações do Assistente Virtual IA

### 💬 AIAssistant Component

```typescript
// components/features/shared/AIAssistant.tsx
interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  context?: string;
  userId: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  isOpen,
  onToggle,
  context,
  userId,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const sendMessage = async (message: string) => {
    const userMessage: Message = {
      id: generateId(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await aiService.processMessage({
        message,
        context,
        userId,
        conversationHistory: messages,
      });

      const aiMessage: Message = {
        id: generateId(),
        content: response.content,
        sender: "ai",
        timestamp: new Date(),
        suggestions: response.suggestions,
        actions: response.actions,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setSuggestions(response.suggestions || []);
    } catch (error) {
      console.error("AI Assistant error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white z-50"
            onClick={onToggle}
          >
            <AIIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interface do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <Avatar3D />
                <div>
                  <h3 className="font-semibold">Assistente Sonangol</h3>
                  <p className="text-xs text-gray-500">Online • IA Ética</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={onToggle}>
                <CloseIcon />
              </Button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onActionClick={handleActionClick}
                />
              ))}

              {isTyping && <TypingIndicator />}
            </div>

            {/* Sugestões */}
            {suggestions.length > 0 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionChip
                      key={index}
                      text={suggestion}
                      onClick={() => sendMessage(suggestion)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <SendIcon />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
```

---

## 📊 Especificações do Painel Administrativo

### 📈 ExecutiveDashboard Component

```typescript
// components/features/manager/ExecutiveDashboard.tsx
interface ExecutiveDashboardProps {
  timeRange: TimeRange
  onTimeRangeChange: (range: TimeRange) => void
}

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  timeRange,
  onTimeRangeChange
}) => {
  const { data: kpis, loading } = useKPIs(timeRange)
  const { data: alerts } = useAlerts()
  const { data: predictions } = usePredictions()

  if (loading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Executivo</h1>
        <TimeRangeSelector
          value={timeRange}
          onChange={onTimeRangeChange}
        />
      </div>

      {/* Alertas críticos */}
      {alerts.critical.length > 0 && (
        <AlertBanner alerts={alerts.critical} />
      )}

      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Receita Total"
          value={formatCurrency(kpis.revenue)}
          change={kpis.revenueChange}
          icon={<RevenueIcon />}
          color="green"
        />

        <K
```
