"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

interface AIAssistantProps {
  context?: string;
  userId?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  context: _context,
  userId: _userId,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedContext = _context;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedUserId = _userId;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! Sou o assistente virtual da Sonangol. Como posso ajudá-lo hoje?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Encontrar bomba próxima",
        "Verificar preços de combustível",
        "Calcular duração do gás",
        "Suporte técnico",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (
    userMessage: string
  ): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("bomba") ||
      lowerMessage.includes("combustível") ||
      lowerMessage.includes("gasolina") ||
      lowerMessage.includes("gasóleo")
    ) {
      return {
        content:
          "Encontrei 3 bombas próximas da sua localização! A Bomba Central tem gasolina a 180 AOA/litro e gasóleo a 165 AOA/litro. Quer que eu reserve combustível para si?",
        suggestions: [
          "Reservar gasolina",
          "Ver todas as bombas",
          "Verificar preços",
          "Navegar para bomba",
        ],
      };
    }

    if (lowerMessage.includes("gás") || lowerMessage.includes("botija")) {
      return {
        content:
          "Baseado no seu padrão de consumo, a sua botija de gás deve durar mais 8 dias. Quer que eu agende uma entrega automática?",
        suggestions: [
          "Agendar entrega",
          "Calcular consumo",
          "Ver histórico",
          "Dicas de economia",
        ],
      };
    }

    if (lowerMessage.includes("preço") || lowerMessage.includes("custo")) {
      return {
        content:
          "Os preços atuais em Luanda são: Gasolina 180 AOA/L, Gasóleo 165 AOA/L, Gás doméstico 3.500 AOA. Preços atualizados há 2 horas.",
        suggestions: [
          "Ver histórico de preços",
          "Comparar bombas",
          "Alertas de preço",
          "Promoções ativas",
        ],
      };
    }

    if (
      lowerMessage.includes("comunidade") ||
      lowerMessage.includes("social")
    ) {
      return {
        content:
          "Na comunidade Sonangol temos 1.247 membros ativos! Hoje há 15 novas dicas de manutenção e 8 experiências partilhadas. Quer participar?",
        suggestions: [
          "Ver posts recentes",
          "Publicar experiência",
          "Dicas de manutenção",
          "Ranking comunidade",
        ],
      };
    }

    if (
      lowerMessage.includes("problema") ||
      lowerMessage.includes("erro") ||
      lowerMessage.includes("ajuda")
    ) {
      return {
        content:
          "Lamento que esteja com dificuldades. Posso ajudar com problemas técnicos, dúvidas sobre combustível ou questões da aplicação. Pode descrever o problema?",
        suggestions: [
          "Problema técnico",
          "Dúvida sobre app",
          "Contactar humano",
          "FAQ",
        ],
      };
    }

    return {
      content:
        "Entendo! Posso ajudar com localização de bombas, gestão de consumo, comunidade ou qualquer dúvida sobre a aplicação Sonangol. O que precisa?",
      suggestions: [
        "Encontrar bombas",
        "Gestão de consumo",
        "Comunidade",
        "Suporte técnico",
      ],
    };
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateResponse(message);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "ai",
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50 hover:shadow-3xl transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative">
              <span className="text-2xl">🤖</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] backdrop-blur-md bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl border border-white/20 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold">Assistente Sonangol</h3>
                  <p className="text-xs text-blue-100">Online • IA Ética</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <span className="text-lg">×</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("pt-AO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages.length > 0 &&
                messages[messages.length - 1].suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {messages[messages.length - 1].suggestions!.map(
                      (suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                        >
                          {suggestion}
                        </button>
                      )
                    )}
                  </div>
                )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  disabled={isTyping}
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
                >
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
