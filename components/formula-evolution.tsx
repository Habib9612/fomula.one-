"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Sparkles, Target, Calendar } from "lucide-react"

interface EvolutionData {
  week: number
  energyScore: number
  sleepScore: number
  stressScore: number
  overallWellness: number
  feedback: string[]
}

interface FormulaEvolutionProps {
  currentFormula: any[]
  healthProfile: any
}

export function FormulaEvolution({ currentFormula, healthProfile }: FormulaEvolutionProps) {
  const [evolutionData, setEvolutionData] = useState<EvolutionData[]>([
    {
      week: 1,
      energyScore: 6,
      sleepScore: 5,
      stressScore: 7,
      overallWellness: 60,
      feedback: ["Started feeling more alert in afternoons", "Sleep quality slightly improved"],
    },
    {
      week: 2,
      energyScore: 7,
      sleepScore: 6,
      stressScore: 6,
      overallWellness: 65,
      feedback: ["Energy levels more consistent", "Less afternoon crashes"],
    },
    {
      week: 3,
      energyScore: 8,
      sleepScore: 7,
      stressScore: 5,
      overallWellness: 72,
      feedback: ["Sleeping deeper", "Feeling more focused at work", "Stress levels decreasing"],
    },
    {
      week: 4,
      energyScore: 8,
      sleepScore: 8,
      stressScore: 4,
      overallWellness: 78,
      feedback: ["Best sleep in months", "Energy sustained throughout day", "Handling stress much better"],
    },
  ])

  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      type: "increase",
      ingredient: "Magnesium Glycinate",
      currentDose: 310,
      suggestedDose: 400,
      reason: "Your sleep scores are improving. Increasing magnesium could enhance deep sleep quality further.",
      confidence: 85,
    },
    {
      id: 2,
      type: "add",
      ingredient: "L-Theanine",
      currentDose: 0,
      suggestedDose: 200,
      reason: "Based on your stress reduction goals and current progress, L-Theanine could help maintain calm focus.",
      confidence: 78,
    },
    {
      id: 3,
      type: "decrease",
      ingredient: "Ashwagandha",
      currentDose: 500,
      suggestedDose: 300,
      reason: "Your stress levels have improved significantly. We can reduce this dose to avoid over-supplementation.",
      confidence: 72,
    },
  ])

  const currentWeek = evolutionData[evolutionData.length - 1]
  const previousWeek = evolutionData[evolutionData.length - 2]

  const getScoreChange = (current: number, previous: number) => {
    const change = current - previous
    if (change > 0) return { icon: TrendingUp, color: "text-green-600", text: `+${change}` }
    if (change < 0) return { icon: TrendingDown, color: "text-red-600", text: `${change}` }
    return { icon: Minus, color: "text-stone-500", text: "0" }
  }

  const energyChange = getScoreChange(currentWeek.energyScore, previousWeek.energyScore)
  const sleepChange = getScoreChange(currentWeek.sleepScore, previousWeek.sleepScore)
  const stressChange = getScoreChange(currentWeek.stressScore, previousWeek.stressScore)

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <span>Your Progress Journey</span>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
              Week {currentWeek.week}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-stone-900">{currentWeek.energyScore}/10</span>
                <energyChange.icon className={`w-4 h-4 ${energyChange.color}`} />
                <span className={`text-sm ${energyChange.color}`}>{energyChange.text}</span>
              </div>
              <p className="text-sm text-stone-600">Energy Level</p>
              <Progress value={currentWeek.energyScore * 10} className="mt-2" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-stone-900">{currentWeek.sleepScore}/10</span>
                <sleepChange.icon className={`w-4 h-4 ${sleepChange.color}`} />
                <span className={`text-sm ${sleepChange.color}`}>{sleepChange.text}</span>
              </div>
              <p className="text-sm text-stone-600">Sleep Quality</p>
              <Progress value={currentWeek.sleepScore * 10} className="mt-2" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-stone-900">{currentWeek.stressScore}/10</span>
                <stressChange.icon className={`w-4 h-4 ${stressChange.color}`} />
                <span className={`text-sm ${stressChange.color}`}>{stressChange.text}</span>
              </div>
              <p className="text-sm text-stone-600">Stress Management</p>
              <Progress value={currentWeek.stressScore * 10} className="mt-2" />
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-2">{currentWeek.overallWellness}%</div>
              <p className="text-sm text-stone-600">Overall Wellness</p>
              <Progress value={currentWeek.overallWellness} className="mt-2" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
            <h4 className="font-semibold text-emerald-900 mb-2">Recent Feedback</h4>
            <ul className="space-y-1">
              {currentWeek.feedback.map((item, index) => (
                <li key={index} className="text-sm text-emerald-700 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>AI Formula Optimization</span>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              Based on your progress
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge
                        variant="outline"
                        className={`${
                          suggestion.type === "increase"
                            ? "bg-green-50 text-green-700"
                            : suggestion.type === "add"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {suggestion.type === "increase"
                          ? "↗ Increase"
                          : suggestion.type === "add"
                            ? "+ Add"
                            : "↘ Reduce"}
                      </Badge>
                      <h4 className="font-semibold text-stone-900">{suggestion.ingredient}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.confidence}% confidence
                      </Badge>
                    </div>

                    <div className="mb-3">
                      {suggestion.type === "add" ? (
                        <p className="text-sm text-stone-600">
                          <span className="font-medium">Add:</span> {suggestion.suggestedDose}mg daily
                        </p>
                      ) : (
                        <p className="text-sm text-stone-600">
                          <span className="font-medium">Change:</span> {suggestion.currentDose}mg →{" "}
                          {suggestion.suggestedDose}mg daily
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-stone-700 mb-3">{suggestion.reason}</p>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline">
                      Decline
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Apply Change
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-stone-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-stone-600" />
              <span className="text-sm font-medium text-stone-900">Next Check-in</span>
            </div>
            <p className="text-sm text-stone-600">
              We'll analyze your progress again in 1 week and suggest further optimizations based on your feedback and
              wellness scores.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
