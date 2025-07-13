"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Shield, Leaf, Globe, Star } from "lucide-react"
import { AnimatedHero } from "@/components/animated-hero"
import { ProductTypeModal } from "@/components/product-type-modal"
import { FormulaBuilder } from "@/components/formula-builder"

export default function HomePage() {
  const [showProductModal, setShowProductModal] = useState(false)
  const [showBuilder, setShowBuilder] = useState(false)
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null)

  const handleStartFormula = () => {
    setShowProductModal(true)
  }

  const handleProductTypeSelect = (type: string) => {
    setSelectedProductType(type)
    setShowProductModal(false)
    setShowBuilder(true)
  }

  if (showBuilder) {
    return <FormulaBuilder productType={selectedProductType} onBack={() => setShowBuilder(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-stone-900">FORMULA.ONE</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-stone-600 hover:text-stone-900 transition-colors">
                How It Works
              </a>
              <a href="#products" className="text-stone-600 hover:text-stone-900 transition-colors">
                Products
              </a>
              <a href="#about" className="text-stone-600 hover:text-stone-900 transition-colors">
                About
              </a>
              <Button onClick={handleStartFormula} className="bg-emerald-600 hover:bg-emerald-700">
                Start Building
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Premium Personalized Health
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
                  Your Health.
                  <br />
                  <span className="text-emerald-600">Your Formula.</span>
                </h1>
                <p className="text-xl text-stone-600 leading-relaxed">
                  Create fully customized supplements, skincare, and personal care products. Choose your ingredients,
                  set your dosage, pick your form. One product, infinite possibilities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleStartFormula}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6"
                >
                  Build My Formula
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-stone-300 hover:bg-stone-50">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-stone-600">Made in EU</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-stone-600">No Fillers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-stone-600">Eco Packaging</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <AnimatedHero />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">How It Works</h2>
            <p className="text-xl text-stone-600">Three simple steps to your perfect formula</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Goal",
                description: "Select from sleep, focus, skin glow, energy, or create your own custom blend",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Customize Everything",
                description: "Pick ingredients, set dosages, choose your preferred form - powder, capsule, or liquid",
                icon: "⚗️",
              },
              {
                step: "03",
                title: "Receive & Enjoy",
                description: "Get your personalized formula delivered monthly in eco-friendly packaging",
                icon: "📦",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-sm font-bold text-emerald-600 mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-4">{item.title}</h3>
                  <p className="text-stone-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health Goals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Most Popular Ingredients</h2>
            <p className="text-xl text-stone-600">Trusted by thousands of customers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Men's Popular */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">👨</span>
                Most Popular for Men
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Creatine Monohydrate", benefit: "Muscle strength & brain function", dose: "5g daily" },
                  { name: "Whey Protein", benefit: "Muscle building & recovery", dose: "25g daily" },
                  { name: "Ashwagandha", benefit: "Stress relief & testosterone", dose: "500mg daily" },
                  { name: "Vitamin D3", benefit: "Immunity & bone health", dose: "1000 IU daily" },
                  { name: "Zinc", benefit: "Testosterone & immune support", dose: "15mg daily" },
                  { name: "Omega-3", benefit: "Heart & brain health", dose: "1600mg daily" },
                ].map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-stone-900">{ingredient.name}</h4>
                      <p className="text-sm text-stone-600">{ingredient.benefit}</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      {ingredient.dose}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Women's Popular */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">👩</span>
                Most Popular for Women
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Collagen Peptides", benefit: "Skin, hair & nail health", dose: "10g daily" },
                  { name: "Iron Bisglycinate", benefit: "Energy & blood health", dose: "18mg daily" },
                  { name: "Biotin", benefit: "Hair & nail strength", dose: "5000mcg daily" },
                  { name: "Folate", benefit: "Reproductive health", dose: "400mcg daily" },
                  { name: "Vitamin C", benefit: "Immunity & collagen synthesis", dose: "1000mg daily" },
                  { name: "Omega-3", benefit: "Heart & brain health", dose: "1100mg daily" },
                ].map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-stone-900">{ingredient.name}</h4>
                      <p className="text-sm text-stone-600">{ingredient.benefit}</p>
                    </div>
                    <Badge variant="outline" className="bg-pink-100 text-pink-700">
                      {ingredient.dose}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Complete Ingredient Library</h2>
            <p className="text-xl text-stone-600">
              All vitamins, minerals, and supplements - from plant, animal, and synthetic sources
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { title: "All Vitamins A-K", count: "13 vitamins", icon: "🍊", description: "Complete vitamin complex" },
              { title: "Essential Minerals", count: "15+ minerals", icon: "⛰️", description: "From calcium to zinc" },
              {
                title: "Amino Acids & Proteins",
                count: "20+ compounds",
                icon: "🥩",
                description: "Building blocks of life",
              },
              { title: "Herbs & Adaptogens", count: "25+ botanicals", icon: "🌿", description: "Traditional & modern" },
            ].map((category, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{category.title}</h3>
                  <Badge variant="secondary" className="mb-2">
                    {category.count}
                  </Badge>
                  <p className="text-sm text-stone-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="flex justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-stone-600">Plant-Based</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-stone-600">Animal-Derived</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-stone-600">Synthetic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-stone-600">Fermented</span>
              </div>
            </div>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Choose from plant-based, animal-derived, synthetic, and fermented sources. All ingredients are clearly
              labeled so you can make informed choices based on your dietary preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-stone-600">Real results from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                role: "Wellness Enthusiast",
                content: "Finally, a supplement that's exactly what I need. No more taking 10 different pills!",
                rating: 5,
              },
              {
                name: "Marcus K.",
                role: "Fitness Coach",
                content: "The custom recovery formula has been a game-changer for my training routine.",
                rating: 5,
              },
              {
                name: "Elena R.",
                role: "Skincare Lover",
                content: "My personalized serum targets exactly my skin concerns. Love the results!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-stone-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-stone-900">{testimonial.name}</div>
                    <div className="text-sm text-stone-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Perfect Formula?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands who've already personalized their health routine
          </p>
          <Button
            onClick={handleStartFormula}
            size="lg"
            className="bg-white text-emerald-600 hover:bg-stone-50 text-lg px-8 py-6"
          >
            Start Building Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FORMULA.ONE</span>
              </div>
              <p className="text-stone-400">Personalized health products made exactly for you.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-stone-400">
                <li>Supplements</li>
                <li>Skincare</li>
                <li>Hair & Body</li>
                <li>Pre-made Stacks</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-stone-400">
                <li>About Us</li>
                <li>How It Works</li>
                <li>Quality</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-stone-400">
                <li>Help Center</li>
                <li>Shipping</li>
                <li>Returns</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-400">
            <p>&copy; 2024 FORMULA.ONE. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ProductTypeModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSelect={handleProductTypeSelect}
      />
    </div>
  )
}
