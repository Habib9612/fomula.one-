"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Zap, Plus, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
  onSuggestIngredients: (ingredients: any[]) => void
  productType: string | null
  selectedGoal: string | null
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  suggestions?: any[]
}

export function AIAssistant({ isOpen, onClose, onSuggestIngredients, productType, selectedGoal }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: `Hi! I'm your AI health assistant. I can help you create the perfect ${productType || "health"} formula based on your goals and needs. What would you like to achieve?`,
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickSuggestions = [
    { text: "I want more energy", icon: Zap, goal: "energy" },
    { text: "Better sleep quality", icon: "🌙", goal: "sleep" },
    { text: "Improve focus", icon: "🧠", goal: "focus" },
    { text: "Boost immunity", icon: "🛡️", goal: "immunity" },
    { text: "Skin health", icon: "✨", goal: "beauty" },
    { text: "Muscle recovery", icon: "💪", goal: "recovery" },
  ]

  const mockIngredients = [
    {
      id: "vit-d3",
      name: "Vitamin D3",
      description: "Essential for immunity and bone health",
      recommendedDose: { men: 1000, women: 1000 },
      unit: "IU",
      category: "vitamins",
      tags: ["immunity", "bone"],
      price: 0.05,
      forms: ["capsule", "liquid"],
      source: "animal"
    },
    {
      id: "omega-3",
      name: "Omega-3 EPA/DHA",
      description: "Essential fatty acids for brain and heart health",
      recommendedDose: { men: 1600, women: 1100 },
      unit: "mg",
      category: "fatty-acids",
      tags: ["brain", "heart"],
      price: 0.3,
      forms: ["capsule", "liquid"],
      source: "animal"
    }
  ]

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(inputValue),
        suggestions: inputValue.toLowerCase().includes("energy") ? mockIngredients : undefined
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes("energy")) {
      return "Great! For energy support, I recommend a combination of B-vitamins, Vitamin D3, and Omega-3s. These work synergistically to support cellular energy production and reduce fatigue. Would you like me to add these to your formula?"
    } else if (lowerInput.includes("sleep")) {
      return "For better sleep quality, I suggest Magnesium Glycinate, L-Theanine, and Melatonin. These ingredients help relax your nervous system and regulate your sleep-wake cycle naturally."
    } else if (lowerInput.includes("focus")) {
      return "To improve focus and cognitive function, consider Omega-3 DHA, B-Complex vitamins, and Rhodiola Rosea. These support brain health and mental clarity."
    } else {
      return "I understand you're looking to optimize your health. Based on your goals, I can recommend specific ingredients that work well together. What's your primary health concern right now?"
    }
  }

  const handleQuickSuggestion = (suggestion: any) => {
    setInputValue(suggestion.text)
  }

  const handleApplySuggestions = (suggestions: any[]) => {
    onSuggestIngredients(suggestions)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span>AI Health Assistant</span>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
              Beta
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === "user" 
                      ? "bg-stone-200" 
                      : "bg-emerald-100"
                  }`}>
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-stone-600" />
                    ) : (
                      <Bot className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-100 text-stone-900"
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {/* Ingredient Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium opacity-75">Recommended ingredients:</p>
                        <div className="space-y-2">
                          {message.suggestions.map((ingredient) => (
                            <div key={ingredient.id} className="bg-white/20 rounded p-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-medium">{ingredient.name}</p>
                                  <p className="text-xs opacity-75">{ingredient.description}</p>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {ingredient.recommendedDose.men}{ingredient.unit}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => handleApplySuggestions(message.suggestions!)}
                          className="mt-2"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add to Formula
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="bg-stone-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-stone-700 mb-3">Quick suggestions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-3 text-left justify-start"
                  onClick={() => handleQuickSuggestion(suggestion)}
                >
                  <div className="flex items-center space-x-2">
                    {typeof suggestion.icon === 'string' ? (
                      <span className="text-lg">{suggestion.icon}</span>
                    ) : (
                      <suggestion.icon className="w-4 h-4" />
                    )}
                    <span className="text-xs">{suggestion.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="border-t pt-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your health goals..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
