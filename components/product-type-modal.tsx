"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Pill, Droplets, Sparkles, Heart, Zap, Moon } from "lucide-react"

interface ProductTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (type: string) => void
}

export function ProductTypeModal({ isOpen, onClose, onSelect }: ProductTypeModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const productTypes = [
    {
      id: "supplement",
      name: "Health Supplements",
      description: "Custom vitamins, minerals, and nutritional supplements",
      icon: Pill,
      color: "bg-emerald-100 text-emerald-700",
      features: ["All vitamins A-K", "Essential minerals", "Amino acids", "Herbal extracts"],
      popular: true,
    },
    {
      id: "skincare",
      name: "Skincare Formulas",
      description: "Personalized serums, creams, and treatments",
      icon: Sparkles,
      color: "bg-pink-100 text-pink-700",
      features: ["Active ingredients", "Custom concentrations", "Skin type specific", "Anti-aging compounds"],
      popular: false,
    },
    {
      id: "wellness",
      name: "Wellness Blends",
      description: "Holistic health and lifestyle support",
      icon: Heart,
      color: "bg-red-100 text-red-700",
      features: ["Stress management", "Energy support", "Sleep optimization", "Mood enhancement"],
      popular: false,
    },
    {
      id: "performance",
      name: "Performance Nutrition",
      description: "Athletic and cognitive performance enhancement",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-700",
      features: ["Pre-workout", "Recovery", "Cognitive boost", "Endurance support"],
      popular: false,
    },
    {
      id: "sleep",
      name: "Sleep & Recovery",
      description: "Optimize rest and recovery cycles",
      icon: Moon,
      color: "bg-purple-100 text-purple-700",
      features: ["Sleep quality", "Recovery support", "Stress relief", "Relaxation"],
      popular: false,
    },
    {
      id: "liquid",
      name: "Liquid Formulas",
      description: "Fast-absorbing liquid supplements and tonics",
      icon: Droplets,
      color: "bg-blue-100 text-blue-700",
      features: ["Rapid absorption", "Custom flavoring", "Concentrated doses", "Easy consumption"],
      popular: false,
    },
  ]

  const handleSelect = () => {
    if (selectedType) {
      onSelect(selectedType)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Choose Your Formula Type</DialogTitle>
          <p className="text-stone-600 text-center">Select the type of personalized formula you'd like to create</p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {productTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id

            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected ? "ring-2 ring-emerald-500 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${type.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {type.popular && <Badge className="bg-emerald-600 text-white text-xs">Most Popular</Badge>}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-bold text-stone-900 mb-2">{type.name}</h3>
                      <p className="text-sm text-stone-600 mb-4">{type.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wide">Includes:</h4>
                      <ul className="space-y-1">
                        {type.features.map((feature, index) => (
                          <li key={index} className="text-xs text-stone-600 flex items-center">
                            <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="flex items-center justify-center pt-2">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSelect} disabled={!selectedType} className="bg-emerald-600 hover:bg-emerald-700">
            Continue with {selectedType ? productTypes.find((t) => t.id === selectedType)?.name : "Selection"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center pt-4">
          <p className="text-xs text-stone-500">
            Don't worry, you can always change this later or create multiple formula types
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
