"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AnimatedHero() {
  const [currentIngredient, setCurrentIngredient] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const ingredients = [
    { name: "Vitamin D3", color: "bg-yellow-400", description: "Immunity & Bone Health" },
    { name: "Omega-3", color: "bg-blue-400", description: "Brain & Heart Health" },
    { name: "Magnesium", color: "bg-green-400", description: "Sleep & Relaxation" },
    { name: "Vitamin C", color: "bg-orange-400", description: "Antioxidant Power" },
    { name: "Collagen", color: "bg-pink-400", description: "Skin & Joint Health" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIngredient((prev) => (prev + 1) % ingredients.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [ingredients.length])

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-100 rounded-3xl opacity-60" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 animate-pulse ${
              ingredients[i % ingredients.length]?.color || "bg-emerald-400"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Animated Bottle/Container */}
        <div className="relative mx-auto">
          <div className="w-32 h-40 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center border-4 border-emerald-200 transform hover:scale-105 transition-transform duration-300">
            {/* Bottle Cap */}
            <div className="w-16 h-6 bg-emerald-600 rounded-t-lg mb-2" />

            {/* Bottle Body with Animated Fill */}
            <div className="w-24 h-28 bg-gradient-to-t from-emerald-100 to-white rounded-lg relative overflow-hidden">
              <div
                className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${ingredients[currentIngredient]?.color} opacity-60`}
                style={{ height: `${20 + (currentIngredient + 1) * 15}%` }}
              />

              {/* Ingredient Particles */}
              <div className="absolute inset-0 flex items-center justify-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full ${ingredients[currentIngredient]?.color} animate-bounce`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      position: "absolute",
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-white text-emerald-600 border-emerald-200 text-xs">FORMULA.ONE</Badge>
            </div>
          </div>
        </div>

        {/* Current Ingredient Display */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-emerald-200 max-w-sm mx-auto">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${ingredients[currentIngredient]?.color}`} />
              <h3 className="font-bold text-stone-900">{ingredients[currentIngredient]?.name}</h3>
            </div>
            <p className="text-sm text-stone-600">{ingredients[currentIngredient]?.description}</p>
          </div>
        </Card>

        {/* Ingredient Indicators */}
        <div className="flex justify-center space-x-2">
          {ingredients.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIngredient(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIngredient
                  ? `${ingredients[index]?.color} scale-125`
                  : "bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-600">50+</div>
            <div className="text-xs text-stone-600">Ingredients</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">∞</div>
            <div className="text-xs text-stone-600">Combinations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">1</div>
            <div className="text-xs text-stone-600">Perfect Formula</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-pulse" />
      <div
        className="absolute bottom-4 left-4 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-4 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
    </div>
  )
}
