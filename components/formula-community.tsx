"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Star, Search, TrendingUp, Users, Copy } from "lucide-react"

interface CommunityFormula {
  id: string
  name: string
  creator: string
  description: string
  ingredients: string[]
  likes: number
  comments: number
  rating: number
  category: string
  price: number
  isVerified: boolean
  tags: string[]
}

export function FormulaCommunity() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const communityFormulas: CommunityFormula[] = [
    {
      id: "1",
      name: "Dad Energy Stack",
      creator: "Marcus_Fitness",
      description: "Perfect for busy fathers who need sustained energy without crashes. Tested over 6 months.",
      ingredients: ["Creatine 5g", "Vitamin D3 2000 IU", "B-Complex", "Ashwagandha 500mg", "Omega-3 1600mg"],
      likes: 342,
      comments: 89,
      rating: 4.8,
      category: "energy",
      price: 38,
      isVerified: true,
      tags: ["men", "energy", "focus", "tested"],
    },
    {
      id: "2",
      name: "Glow Goddess Formula",
      creator: "SkincareSarah",
      description: "My secret to radiant skin and strong nails. Dermatologist-approved ingredients only.",
      ingredients: ["Collagen 10g", "Biotin 5000mcg", "Vitamin C 1000mg", "Hyaluronic Acid", "Zinc 8mg"],
      likes: 567,
      comments: 134,
      rating: 4.9,
      category: "beauty",
      price: 45,
      isVerified: true,
      tags: ["women", "skin", "anti-aging", "dermatologist"],
    },
    {
      id: "3",
      name: "Student Focus Blend",
      creator: "StudyHacker",
      description: "Optimized for long study sessions and exam prep. No jitters, just clean focus.",
      ingredients: ["L-Theanine 200mg", "Rhodiola 300mg", "B6 10mg", "Magnesium 200mg", "Omega-3 1000mg"],
      likes: 234,
      comments: 67,
      rating: 4.6,
      category: "focus",
      price: 32,
      isVerified: false,
      tags: ["students", "focus", "stress", "budget"],
    },
    {
      id: "4",
      name: "Menopause Support Stack",
      creator: "WellnessWoman50",
      description: "Hormone-balancing formula that helped me through perimenopause. Life-changing results.",
      ingredients: ["Evening Primrose Oil", "Vitamin D3 1000 IU", "Magnesium 400mg", "B-Complex", "Calcium 600mg"],
      likes: 189,
      comments: 45,
      rating: 4.7,
      category: "hormones",
      price: 41,
      isVerified: true,
      tags: ["women", "hormones", "50+", "menopause"],
    },
    {
      id: "5",
      name: "Gym Beast Mode",
      creator: "IronMike_PT",
      description: "Pre and post-workout optimization. Strength gains and recovery in one formula.",
      ingredients: ["Creatine 5g", "Whey Protein 25g", "L-Carnitine 2g", "Turmeric 500mg", "Zinc 15mg"],
      likes: 445,
      comments: 112,
      rating: 4.8,
      category: "fitness",
      price: 52,
      isVerified: true,
      tags: ["men", "fitness", "muscle", "recovery"],
    },
    {
      id: "6",
      name: "Anxiety Relief Natural",
      creator: "CalmMindCoach",
      description: "Gentle, natural approach to managing daily anxiety. No prescription needed.",
      ingredients: ["Ashwagandha 400mg", "L-Theanine 150mg", "Magnesium 300mg", "B6 5mg", "Chamomile Extract"],
      likes: 298,
      comments: 78,
      rating: 4.5,
      category: "mental-health",
      price: 36,
      isVerified: false,
      tags: ["anxiety", "natural", "stress", "gentle"],
    },
  ]

  const categories = [
    { id: "all", name: "All Formulas", count: communityFormulas.length },
    { id: "energy", name: "Energy", count: communityFormulas.filter((f) => f.category === "energy").length },
    { id: "beauty", name: "Beauty", count: communityFormulas.filter((f) => f.category === "beauty").length },
    { id: "focus", name: "Focus", count: communityFormulas.filter((f) => f.category === "focus").length },
    { id: "fitness", name: "Fitness", count: communityFormulas.filter((f) => f.category === "fitness").length },
  ]

  const filteredFormulas = communityFormulas.filter((formula) => {
    const matchesSearch =
      formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formula.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formula.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || formula.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const topFormulas = communityFormulas.sort((a, b) => b.likes - a.likes).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Formula Community</h2>
        <p className="text-xl text-stone-600 mb-6">Discover, share, and remix formulas created by our community</p>

        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-stone-600">12,847 Active Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-sm text-stone-600">45,231 Formulas Shared</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-stone-600">4.7 Avg Rating</span>
          </div>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
            <Input
              placeholder="Search formulas, ingredients, or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={selectedCategory}>
          {/* Top Formulas This Week */}
          {selectedCategory === "all" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Trending This Week</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {topFormulas.map((formula, index) => (
                    <div key={formula.id} className="relative">
                      <Badge
                        className={`absolute -top-2 -left-2 z-10 ${
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-stone-400" : "bg-orange-600"
                        }`}
                      >
                        #{index + 1}
                      </Badge>
                      <Card className="h-full">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-stone-900">{formula.name}</h4>
                            {formula.isVerified && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 mb-2">by {formula.creator}</p>
                          <div className="flex items-center space-x-4 text-xs text-stone-500">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{formula.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{formula.rating}</span>
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Formula Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFormulas.map((formula) => (
              <Card key={formula.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-stone-900">{formula.name}</h3>
                        {formula.isVerified && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-stone-600">by {formula.creator}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">€{formula.price}</div>
                      <div className="text-xs text-stone-500">per month</div>
                    </div>
                  </div>

                  <p className="text-sm text-stone-700 mb-4">{formula.description}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 mb-2">Key Ingredients:</h4>
                      <div className="flex flex-wrap gap-1">
                        {formula.ingredients.slice(0, 3).map((ingredient, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                        {formula.ingredients.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{formula.ingredients.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {formula.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-stone-500">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{formula.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{formula.comments}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{formula.rating}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Copy className="w-3 h-3 mr-1" />
                      Copy Formula
                    </Button>
                    <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      Try Formula
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
