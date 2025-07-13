"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Plus, Trash2, Bot, Sparkles, ShoppingCart, ArrowRight } from "lucide-react"
import { AIAssistant } from "@/components/ai-assistant"
import { FormulaSummary } from "@/components/formula-summary"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HealthProfile } from "@/components/health-profile"
import { FormulaEvolution } from "@/components/formula-evolution"
import { FormulaCommunity } from "@/components/formula-community"
import { Enhanced3DPreview } from "@/components/enhanced-3d-preview"

interface Ingredient {
  id: string
  name: string
  description: string
  maxDosage: number
  unit: string
  category: string
  tags: string[]
  price: number
  forms: string[]
  recommendedDose: { men: number; women: number }
  source: string
}

interface SelectedIngredient extends Ingredient {
  dosage: number
  form: string
}

interface FormulaBuilderProps {
  productType: string | null
  onBack: () => void
}

export function FormulaBuilder({ productType, onBack }: FormulaBuilderProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([])
  const [showAI, setShowAI] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [userType, setUserType] = useState<"men" | "women" | null>(null)
  const [healthProfile, setHealthProfile] = useState<any>(null)
  const [showHealthProfile, setShowHealthProfile] = useState(false)

  // Comprehensive ingredient database with all vitamins, minerals, and supplements
  const ingredients: Ingredient[] = [
    // Vitamins
    {
      id: "vit-a",
      name: "Vitamin A (Retinol)",
      description: "Essential for vision, immune function, and skin health",
      maxDosage: 3000,
      unit: "mcg",
      category: "vitamins",
      tags: ["vision", "immunity", "skin"],
      price: 0.12,
      forms: ["capsule", "powder", "liquid", "gummy"],
      recommendedDose: { men: 900, women: 700 },
      source: "animal",
    },
    {
      id: "vit-b1",
      name: "Thiamine (Vitamin B1)",
      description: "Supports energy metabolism and nervous system function",
      maxDosage: 100,
      unit: "mg",
      category: "vitamins",
      tags: ["energy", "nervous-system", "metabolism"],
      price: 0.08,
      forms: ["capsule", "powder", "liquid"],
      recommendedDose: { men: 1.2, women: 1.1 },
      source: "synthetic",
    },
    {
      id: "vit-b2",
      name: "Riboflavin (Vitamin B2)",
      description: "Important for energy production and cellular function",
      maxDosage: 400,
      unit: "mg",
      category: "vitamins",
      tags: ["energy", "cellular", "metabolism"],
      price: 0.09,
      forms: ["capsule", "powder", "liquid"],
      recommendedDose: { men: 1.3, women: 1.1 },
      source: "synthetic",
    },
    {
      id: "vit-b3",
      name: "Niacin (Vitamin B3)",
      description: "Supports cardiovascular health and energy metabolism",
      maxDosage: 35,
      unit: "mg",
      category: "vitamins",
      tags: ["heart", "energy", "cholesterol"],
      price: 0.07,
      forms: ["capsule", "powder", "liquid"],
      recommendedDose: { men: 16, women: 14 },
      source: "synthetic",
    },
    {
      id: "vit-b5",
      name: "Pantothenic Acid (Vitamin B5)",
      description: "Essential for hormone production and energy metabolism",
      maxDosage: 1000,
      unit: "mg",
      category: "vitamins",
      tags: ["hormones", "energy", "stress"],
      price: 0.11,
      forms: ["capsule", "powder", "liquid"],
      recommendedDose: { men: 5, women: 5 },
      source: "synthetic",
    },
    {
      id: "vit-b6",
      name: "Pyridoxine (Vitamin B6)",
      description: "Important for brain development and immune function",
      maxDosage: 100,
      unit: "mg",
      category: "vitamins",
      tags: ["brain", "immunity", "mood"],
      price: 0.1,
      forms: ["capsule", "powder", "liquid"],
      recommendedDose: { men: 1.3, women: 1.3 },
      source: "synthetic",
    },
    {
      id: "vit-b7",
      name: "Biotin (Vitamin B7)",
      description: "Essential for hair, skin, nail health and metabolism",
      maxDosage: 10000,
      unit: "mcg",
      category: "vitamins",
      tags: ["hair", "skin", "nails", "metabolism"],
      price: 0.08,
      forms: ["capsule", "powder", "gummy", "liquid"],
      recommendedDose: { men: 30, women: 30 },
      source: "synthetic",
    },
    {
      id: "vit-b9",
      name: "Folate (Vitamin B9)",
      description: "Critical for DNA synthesis and red blood cell formation",
      maxDosage: 1000,
      unit: "mcg",
      category: "vitamins",
      tags: ["pregnancy", "blood", "dna"],
      price: 0.09,
      forms: ["capsule", "powder", "liquid"],
      recommendedDose: { men: 400, women: 400 },
      source: "synthetic",
    },
    {
      id: "vit-b12",
      name: "Cobalamin (Vitamin B12)",
      description: "Essential for nerve function and red blood cell formation",
      maxDosage: 2000,
      unit: "mcg",
      category: "vitamins",
      tags: ["energy", "nerves", "blood"],
      price: 0.15,
      forms: ["capsule", "powder", "liquid", "sublingual"],
      recommendedDose: { men: 2.4, women: 2.4 },
      source: "animal",
    },
    {
      id: "vit-c",
      name: "Vitamin C (Ascorbic Acid)",
      description: "Powerful antioxidant supporting immune system and collagen",
      maxDosage: 2000,
      unit: "mg",
      category: "vitamins",
      tags: ["immunity", "antioxidant", "collagen"],
      price: 0.06,
      forms: ["capsule", "powder", "liquid", "gummy", "chewable"],
      recommendedDose: { men: 90, women: 75 },
      source: "synthetic",
    },
    {
      id: "vit-d3",
      name: "Vitamin D3 (Cholecalciferol)",
      description: "Essential for bone health, immunity, and mood",
      maxDosage: 4000,
      unit: "IU",
      category: "vitamins",
      tags: ["bone", "immunity", "mood"],
      price: 0.05,
      forms: ["capsule", "liquid", "gummy"],
      recommendedDose: { men: 600, women: 600 },
      source: "animal",
    },
    {
      id: "vit-e",
      name: "Vitamin E (Tocopherol)",
      description: "Antioxidant protecting cells from oxidative damage",
      maxDosage: 1000,
      unit: "mg",
      category: "vitamins",
      tags: ["antioxidant", "skin", "heart"],
      price: 0.13,
      forms: ["capsule", "liquid"],
      recommendedDose: { men: 15, women: 15 },
      source: "plant",
    },
    {
      id: "vit-k2",
      name: "Vitamin K2 (Menaquinone)",
      description: "Important for bone health and cardiovascular function",
      maxDosage: 180,
      unit: "mcg",
      category: "vitamins",
      tags: ["bone", "heart", "calcium"],
      price: 0.25,
      forms: ["capsule", "liquid"],
      recommendedDose: { men: 120, women: 90 },
      source: "animal",
    },

    // Essential Minerals
    {
      id: "calcium",
      name: "Calcium Carbonate",
      description: "Essential for bone and teeth health, muscle function",
      maxDosage: 2500,
      unit: "mg",
      category: "minerals",
      tags: ["bone", "teeth", "muscle"],
      price: 0.04,
      forms: ["capsule", "powder", "chewable"],
      recommendedDose: { men: 1000, women: 1200 },
      source: "mineral",
    },
    {
      id: "magnesium",
      name: "Magnesium Glycinate",
      description: "Highly bioavailable magnesium for relaxation and sleep",
      maxDosage: 400,
      unit: "mg",
      category: "minerals",
      tags: ["sleep", "relaxation", "muscle"],
      price: 0.15,
      forms: ["capsule", "powder"],
      recommendedDose: { men: 400, women: 310 },
      source: "mineral",
    },
    {
      id: "iron",
      name: "Iron Bisglycinate",
      description: "Gentle iron for energy and red blood cell formation",
      maxDosage: 45,
      unit: "mg",
      category: "minerals",
      tags: ["energy", "blood", "fatigue"],
      price: 0.18,
      forms: ["capsule", "liquid"],
      recommendedDose: { men: 8, women: 18 },
      source: "mineral",
    },
    {
      id: "zinc",
      name: "Zinc Picolinate",
      description: "Essential for immune function and wound healing",
      maxDosage: 40,
      unit: "mg",
      category: "minerals",
      tags: ["immunity", "healing", "testosterone"],
      price: 0.12,
      forms: ["capsule", "powder", "liquid"],
      recommendedDose: { men: 11, women: 8 },
      source: "mineral",
    },
    {
      id: "selenium",
      name: "Selenium Methionine",
      description: "Antioxidant mineral supporting thyroid function",
      maxDosage: 400,
      unit: "mcg",
      category: "minerals",
      tags: ["antioxidant", "thyroid", "immunity"],
      price: 0.2,
      forms: ["capsule", "powder"],
      recommendedDose: { men: 55, women: 55 },
      source: "mineral",
    },
    {
      id: "iodine",
      name: "Potassium Iodide",
      description: "Essential for thyroid hormone production",
      maxDosage: 1100,
      unit: "mcg",
      category: "minerals",
      tags: ["thyroid", "metabolism", "energy"],
      price: 0.08,
      forms: ["capsule", "liquid"],
      recommendedDose: { men: 150, women: 150 },
      source: "mineral",
    },
    {
      id: "chromium",
      name: "Chromium Picolinate",
      description: "Supports glucose metabolism and insulin function",
      maxDosage: 200,
      unit: "mcg",
      category: "minerals",
      tags: ["glucose", "insulin", "metabolism"],
      price: 0.14,
      forms: ["capsule", "powder"],
      recommendedDose: { men: 35, women: 25 },
      source: "mineral",
    },

    // Amino Acids & Proteins
    {
      id: "whey-protein",
      name: "Whey Protein Isolate",
      description: "Complete protein for muscle building and recovery",
      maxDosage: 50000,
      unit: "mg",
      category: "proteins",
      tags: ["muscle", "recovery", "protein"],
      price: 0.02,
      forms: ["powder"],
      recommendedDose: { men: 25000, women: 20000 },
      source: "animal",
    },
    {
      id: "collagen",
      name: "Hydrolyzed Collagen",
      description: "Supports skin, hair, nails, and joint health",
      maxDosage: 20000,
      unit: "mg",
      category: "proteins",
      tags: ["skin", "hair", "joints", "anti-aging"],
      price: 0.03,
      forms: ["powder", "capsule"],
      recommendedDose: { men: 10000, women: 10000 },
      source: "animal",
    },
    {
      id: "creatine",
      name: "Creatine Monohydrate",
      description: "Supports muscle strength and cognitive function",
      maxDosage: 5000,
      unit: "mg",
      category: "performance",
      tags: ["muscle", "strength", "brain"],
      price: 0.1,
      forms: ["powder", "capsule"],
      recommendedDose: { men: 5000, women: 3000 },
      source: "synthetic",
    },
    {
      id: "l-carnitine",
      name: "L-Carnitine",
      description: "Supports fat metabolism and energy production",
      maxDosage: 3000,
      unit: "mg",
      category: "amino-acids",
      tags: ["fat-burning", "energy", "metabolism"],
      price: 0.16,
      forms: ["capsule", "powder", "liquid"],
      recommendedDose: { men: 2000, women: 1500 },
      source: "synthetic",
    },

    // Herbs & Adaptogens
    {
      id: "ashwagandha",
      name: "Ashwagandha Extract",
      description: "Adaptogenic herb for stress management and focus",
      maxDosage: 600,
      unit: "mg",
      category: "herbs",
      tags: ["stress", "focus", "adaptogen", "testosterone"],
      price: 0.25,
      forms: ["capsule", "powder"],
      recommendedDose: { men: 500, women: 400 },
      source: "plant",
    },
    {
      id: "rhodiola",
      name: "Rhodiola Rosea",
      description: "Adaptogen for mental performance and fatigue resistance",
      maxDosage: 600,
      unit: "mg",
      category: "herbs",
      tags: ["mental-performance", "fatigue", "adaptogen"],
      price: 0.3,
      forms: ["capsule", "powder"],
      recommendedDose: { men: 400, women: 300 },
      source: "plant",
    },
    {
      id: "turmeric",
      name: "Turmeric Curcumin",
      description: "Powerful anti-inflammatory and antioxidant compound",
      maxDosage: 1000,
      unit: "mg",
      category: "herbs",
      tags: ["inflammation", "antioxidant", "joints"],
      price: 0.18,
      forms: ["capsule", "powder"],
      recommendedDose: { men: 500, women: 500 },
      source: "plant",
    },

    // Omega Fatty Acids
    {
      id: "omega-3",
      name: "Omega-3 EPA/DHA",
      description: "Essential fatty acids for brain and heart health",
      maxDosage: 3000,
      unit: "mg",
      category: "fatty-acids",
      tags: ["brain", "heart", "inflammation"],
      price: 0.3,
      forms: ["capsule", "liquid"],
      recommendedDose: { men: 1600, women: 1100 },
      source: "animal",
    },
    {
      id: "omega-3-vegan",
      name: "Algae Omega-3",
      description: "Plant-based EPA/DHA from algae",
      maxDosage: 2000,
      unit: "mg",
      category: "fatty-acids",
      tags: ["brain", "heart", "vegan"],
      price: 0.45,
      forms: ["capsule", "liquid"],
      recommendedDose: { men: 1600, women: 1100 },
      source: "plant",
    },

    // Probiotics
    {
      id: "probiotics",
      name: "Multi-Strain Probiotics",
      description: "Beneficial bacteria for digestive and immune health",
      maxDosage: 100,
      unit: "billion CFU",
      category: "probiotics",
      tags: ["gut-health", "immunity", "digestion"],
      price: 0.4,
      forms: ["capsule", "powder"],
      recommendedDose: { men: 50, women: 50 },
      source: "fermented",
    },

    // Specialty Compounds
    {
      id: "coq10",
      name: "Coenzyme Q10",
      description: "Supports cellular energy production and heart health",
      maxDosage: 300,
      unit: "mg",
      category: "antioxidants",
      tags: ["energy", "heart", "antioxidant"],
      price: 0.5,
      forms: ["capsule", "liquid"],
      recommendedDose: { men: 100, women: 100 },
      source: "synthetic",
    },
    {
      id: "resveratrol",
      name: "Trans-Resveratrol",
      description: "Antioxidant compound supporting longevity and heart health",
      maxDosage: 500,
      unit: "mg",
      category: "antioxidants",
      tags: ["longevity", "heart", "antioxidant"],
      price: 0.6,
      forms: ["capsule", "powder"],
      recommendedDose: { men: 250, women: 250 },
      source: "plant",
    },
  ]

  // Add gender-specific popular formulas
  const popularFormulas = {
    men: [
      {
        id: "men-performance",
        name: "Men's Performance Stack",
        description: "Boost energy, strength, and testosterone naturally",
        ingredients: ["creatine", "ashwagandha", "zinc", "vit-d3", "omega-3"],
        price: 45,
        popular: true,
      },
      {
        id: "men-focus",
        name: "Men's Focus & Energy",
        description: "Enhanced cognitive performance and sustained energy",
        ingredients: ["rhodiola", "vit-b12", "omega-3", "coq10"],
        price: 38,
        popular: false,
      },
      {
        id: "men-recovery",
        name: "Men's Recovery Formula",
        description: "Optimize muscle recovery and sleep quality",
        ingredients: ["magnesium", "whey-protein", "turmeric", "ashwagandha"],
        price: 42,
        popular: false,
      },
    ],
    women: [
      {
        id: "women-glow",
        name: "Women's Glow Stack",
        description: "Radiant skin, strong hair, and healthy nails",
        ingredients: ["collagen", "vit-c", "vit-e", "vit-b7", "omega-3"],
        price: 48,
        popular: true,
      },
      {
        id: "women-energy",
        name: "Women's Energy & Vitality",
        description: "Combat fatigue and support hormonal balance",
        ingredients: ["iron", "vit-b12", "vit-d3", "ashwagandha", "rhodiola"],
        price: 44,
        popular: false,
      },
      {
        id: "women-wellness",
        name: "Women's Daily Wellness",
        description: "Complete nutritional support for active women",
        ingredients: ["vit-b9", "calcium", "iron", "omega-3", "probiotics"],
        price: 40,
        popular: false,
      },
    ],
  }

  // Update the health goals to be more comprehensive
  const healthGoals = [
    { id: "energy", name: "Energy & Vitality", icon: "⚡", color: "bg-yellow-100 text-yellow-700" },
    { id: "muscle", name: "Muscle & Strength", icon: "💪", color: "bg-red-100 text-red-700" },
    { id: "beauty", name: "Beauty & Anti-Aging", icon: "✨", color: "bg-pink-100 text-pink-700" },
    { id: "brain", name: "Brain & Focus", icon: "🧠", color: "bg-blue-100 text-blue-700" },
    { id: "sleep", name: "Sleep & Recovery", icon: "🌙", color: "bg-purple-100 text-purple-700" },
    { id: "immunity", name: "Immune Support", icon: "🛡️", color: "bg-green-100 text-green-700" },
    { id: "heart", name: "Heart Health", icon: "❤️", color: "bg-red-100 text-red-700" },
    { id: "gut", name: "Digestive Health", icon: "🌿", color: "bg-green-100 text-green-700" },
    { id: "bone", name: "Bone Health", icon: "🦴", color: "bg-stone-100 text-stone-700" },
    { id: "weight", name: "Weight Management", icon: "⚖️", color: "bg-orange-100 text-orange-700" },
  ]

  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const addIngredient = (ingredient: Ingredient) => {
    if (selectedIngredients.find((item) => item.id === ingredient.id)) return

    const recommendedDose = userType ? ingredient.recommendedDose[userType] : Math.round(ingredient.maxDosage * 0.5)

    setSelectedIngredients([
      ...selectedIngredients,
      {
        ...ingredient,
        dosage: recommendedDose,
        form: ingredient.forms[0],
      },
    ])
  }

  const updateDosage = (id: string, dosage: number) => {
    setSelectedIngredients((prev) => prev.map((item) => (item.id === id ? { ...item, dosage } : item)))
  }

  const removeIngredient = (id: string) => {
    setSelectedIngredients((prev) => prev.filter((item) => item.id !== id))
  }

  const totalCost = selectedIngredients.reduce((sum, item) => sum + (item.price * item.dosage) / 100, 0)

  if (showSummary) {
    return (
      <FormulaSummary
        ingredients={selectedIngredients}
        productType={productType}
        totalCost={totalCost}
        onBack={() => setShowSummary(false)}
      />
    )
  }

  if (showHealthProfile) {
    return (
      <HealthProfile
        onComplete={(profile) => {
          setHealthProfile(profile)
          setShowHealthProfile(false)
        }}
        onSkip={() => setShowHealthProfile(false)}
      />
    )
  }

  if (!healthProfile && !userType) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-4">Welcome to Formula Builder</CardTitle>
            <p className="text-stone-600 mb-6">
              Let's create your perfect health formula with personalized recommendations
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setShowHealthProfile(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
            >
              Complete Health Profile (Recommended)
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button onClick={() => setUserType("men")} variant="outline" className="w-full text-lg py-6">
              Quick Start - I'm a Man
            </Button>
            <Button onClick={() => setUserType("women")} variant="outline" className="w-full text-lg py-6">
              Quick Start - I'm a Woman
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-stone-900">Formula Builder</h1>
                <p className="text-sm text-stone-600 capitalize">{productType} Formula</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowAI(true)}>
                <Bot className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                onClick={() => setShowSummary(true)}
                disabled={selectedIngredients.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Review Formula ({selectedIngredients.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Goals */}
            {!selectedGoal && (
              <Card>
                <CardHeader>
                  <CardTitle>What's your main health goal?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {healthGoals.map((goal) => (
                      <Card
                        key={goal.id}
                        className="cursor-pointer hover:shadow-md transition-all"
                        onClick={() => setSelectedGoal(goal.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div
                            className={`w-12 h-12 rounded-full ${goal.color} flex items-center justify-center text-xl mx-auto mb-2`}
                          >
                            {goal.icon}
                          </div>
                          <p className="text-sm font-medium">{goal.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {!selectedGoal && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Popular {userType === "men" ? "Men's" : "Women's"} Formulas
                    <Badge variant="outline">Best Sellers</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {popularFormulas[userType].map((formula) => (
                      <Card key={formula.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-stone-900">{formula.name}</h3>
                                {formula.popular && (
                                  <Badge className="bg-emerald-600 hover:bg-emerald-600">Most Popular</Badge>
                                )}
                              </div>
                              <p className="text-sm text-stone-600 mb-3">{formula.description}</p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {formula.ingredients.slice(0, 3).map((ingredientId) => {
                                  const ingredient = ingredients.find((i) => i.id === ingredientId)
                                  return ingredient ? (
                                    <Badge key={ingredientId} variant="secondary" className="text-xs">
                                      {ingredient.name.split(" ")[0]}
                                    </Badge>
                                  ) : null
                                })}
                                {formula.ingredients.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{formula.ingredients.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-xl font-bold text-emerald-600">€{formula.price}</div>
                              <div className="text-xs text-stone-500">per month</div>
                              <Button
                                className="mt-2"
                                onClick={() => {
                                  // Add all ingredients from the formula
                                  formula.ingredients.forEach((ingredientId) => {
                                    const ingredient = ingredients.find((i) => i.id === ingredientId)
                                    if (ingredient) addIngredient(ingredient)
                                  })
                                }}
                              >
                                Add Stack
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="builder" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="builder">Build Formula</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="evolution">My Progress</TabsTrigger>
                <TabsTrigger value="preview">3D Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="builder">
                {/* Search */}
                <Card>
                  <CardContent className="p-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                      <Input
                        placeholder="Search ingredients (e.g., Vitamin C, Magnesium, Collagen...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Ingredient Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Your Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid w-full grid-cols-7">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
                        <TabsTrigger value="minerals">Minerals</TabsTrigger>
                        <TabsTrigger value="herbs">Herbs</TabsTrigger>
                        <TabsTrigger value="proteins">Proteins</TabsTrigger>
                        <TabsTrigger value="fatty-acids">Omega</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="mt-6">
                        <div className="grid gap-4">
                          {filteredIngredients.map((ingredient) => (
                            <Card key={ingredient.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <h3 className="font-semibold text-stone-900">{ingredient.name}</h3>
                                      <div className="flex space-x-1">
                                        {ingredient.tags.slice(0, 2).map((tag) => (
                                          <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                        <Badge
                                          variant="outline"
                                          className={`text-xs ${
                                            ingredient.source === "animal"
                                              ? "bg-red-50 text-red-700"
                                              : ingredient.source === "plant"
                                                ? "bg-green-50 text-green-700"
                                                : ingredient.source === "vegan"
                                                  ? "bg-green-50 text-green-700"
                                                  : "bg-blue-50 text-blue-700"
                                          }`}
                                        >
                                          {ingredient.source}
                                        </Badge>
                                      </div>
                                    </div>
                                    <p className="text-sm text-stone-600 mb-2">{ingredient.description}</p>
                                    <div className="flex items-center space-x-4 text-xs text-stone-500">
                                      <span>
                                        Recommended: {userType ? ingredient.recommendedDose[userType] : "N/A"}
                                        {ingredient.unit}
                                      </span>
                                      <span>
                                        Max: {ingredient.maxDosage}
                                        {ingredient.unit}
                                      </span>
                                      <span>Forms: {ingredient.forms.join(", ")}</span>
                                      <span>
                                        €{ingredient.price}/100{ingredient.unit}
                                      </span>
                                    </div>
                                  </div>
                                  <Button
                                    onClick={() => addIngredient(ingredient)}
                                    disabled={selectedIngredients.some((item) => item.id === ingredient.id)}
                                    className="ml-4"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community">
                <FormulaCommunity />
              </TabsContent>

              <TabsContent value="evolution">
                <FormulaEvolution currentFormula={selectedIngredients} healthProfile={healthProfile} />
              </TabsContent>

              <TabsContent value="preview">
                <Enhanced3DPreview
                  ingredients={selectedIngredients}
                  formulaName="My Custom Formula"
                  deliveryForm="capsule"
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Selected Ingredients */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Your Formula
                  <Badge variant="outline">{selectedIngredients.length} ingredients</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedIngredients.length === 0 ? (
                  <div className="text-center py-8 text-stone-500">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Start adding ingredients to build your formula</p>
                  </div>
                ) : (
                  <>
                    {selectedIngredients.map((ingredient) => (
                      <div key={ingredient.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-stone-900">{ingredient.name}</h4>
                            <p className="text-xs text-stone-600">{ingredient.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIngredient(ingredient.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="space-y-2">
                            <Label className="text-xs">Form</Label>
                            <Select
                              value={ingredient.form}
                              onValueChange={(value) => {
                                setSelectedIngredients((prev) =>
                                  prev.map((item) => (item.id === ingredient.id ? { ...item, form: value } : item)),
                                )
                              }}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ingredient.forms.map((form) => (
                                  <SelectItem key={form} value={form} className="capitalize">
                                    {form}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span>
                              Dosage: {ingredient.dosage}
                              {ingredient.unit}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                ingredient.dosage <= ingredient.maxDosage * 0.7
                                  ? "bg-green-100 text-green-700"
                                  : ingredient.dosage <= ingredient.maxDosage
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {ingredient.dosage <= ingredient.maxDosage * 0.7
                                ? "Safe"
                                : ingredient.dosage <= ingredient.maxDosage
                                  ? "High"
                                  : "Too High"}
                            </span>
                          </div>

                          <Slider
                            value={[ingredient.dosage]}
                            onValueChange={([value]) => updateDosage(ingredient.id, value)}
                            max={ingredient.maxDosage}
                            min={ingredient.maxDosage * 0.1}
                            step={ingredient.maxDosage * 0.05}
                            className="w-full"
                          />
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Estimated Monthly Cost:</span>
                        <span className="text-xl font-bold text-emerald-600">€{totalCost.toFixed(2)}</span>
                      </div>

                      <Button
                        onClick={() => setShowSummary(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                      >
                        Review & Customize
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AIAssistant
        isOpen={showAI}
        onClose={() => setShowAI(false)}
        onSuggestIngredients={(ingredients) => {
          ingredients.forEach(addIngredient)
          setShowAI(false)
        }}
        productType={productType}
        selectedGoal={selectedGoal}
      />
    </div>
  )
}
