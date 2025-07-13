"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Share2, ShoppingCart, Package, Sparkles, Check } from "lucide-react"

interface SelectedIngredient {
  id: string
  name: string
  description: string
  dosage: number
  unit: string
  form: string
  price: number
}

interface FormulaSummaryProps {
  ingredients: SelectedIngredient[]
  productType: string | null
  totalCost: number
  onBack: () => void
}

export function FormulaSummary({ ingredients, productType, totalCost, onBack }: FormulaSummaryProps) {
  const [formulaName, setFormulaName] = useState("My Custom Formula")
  const [deliveryForm, setDeliveryForm] = useState("capsule")
  const [packaging, setPackaging] = useState("eco-pouch")
  const [subscription, setSubscription] = useState("monthly")
  const [showCheckout, setShowCheckout] = useState(false)

  const packagingOptions = [
    { id: "eco-pouch", name: "Eco Pouch", description: "Recyclable pouch", price: 0 },
    { id: "glass-jar", name: "Glass Jar", description: "Premium glass container", price: 5 },
    { id: "travel-pack", name: "Travel Pack", description: "Individual sachets", price: 3 },
  ]

  const subscriptionOptions = [
    { id: "monthly", name: "Monthly", discount: 0, description: "Delivered every month" },
    { id: "quarterly", name: "Every 3 Months", discount: 10, description: "Save 10%" },
    { id: "one-time", name: "One-Time Purchase", discount: 0, description: "No subscription" },
  ]

  const selectedPackaging = packagingOptions.find((p) => p.id === packaging)
  const selectedSubscription = subscriptionOptions.find((s) => s.id === subscription)
  const discountAmount = (totalCost * (selectedSubscription?.discount || 0)) / 100
  const finalPrice = totalCost + (selectedPackaging?.price || 0) - discountAmount

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Formula Saved!</h2>
            <p className="text-stone-600 mb-6">
              Your custom formula "{formulaName}" has been saved. We'll contact you soon to finalize your order.
            </p>
            <div className="space-y-3">
              <Button onClick={onBack} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Create Another Formula
              </Button>
              <Button variant="outline" className="w-full">
                View My Formulas
              </Button>
            </div>
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
                Back to Builder
              </Button>
              <div>
                <h1 className="text-xl font-bold text-stone-900">Formula Summary</h1>
                <p className="text-sm text-stone-600">Review and customize your formula</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Formula Details */}
            <Card>
              <CardHeader>
                <CardTitle>Formula Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="formula-name">Formula Name</Label>
                  <Input
                    id="formula-name"
                    value={formulaName}
                    onChange={(e) => setFormulaName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Delivery Form</Label>
                    <Select value={deliveryForm} onValueChange={setDeliveryForm}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="capsule">Capsules</SelectItem>
                        <SelectItem value="powder">Powder</SelectItem>
                        <SelectItem value="liquid">Liquid</SelectItem>
                        <SelectItem value="gummy">Gummies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Packaging</Label>
                    <Select value={packaging} onValueChange={setPackaging}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {packagingOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name} {option.price > 0 && `(+€${option.price})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Ingredients ({ingredients.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-900">{ingredient.name}</h4>
                        <p className="text-sm text-stone-600">{ingredient.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-stone-500">
                          <span>
                            Dosage: {ingredient.dosage}
                            {ingredient.unit}
                          </span>
                          <span>Form: {ingredient.form}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">€{((ingredient.price * ingredient.dosage) / 100).toFixed(2)}</div>
                        <div className="text-xs text-stone-500">per month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Label Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Label Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border-2 border-dashed border-stone-300 rounded-lg p-8">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Sparkles className="w-6 h-6 text-emerald-600" />
                      <span className="text-xl font-bold">FORMULA.ONE</span>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900">{formulaName}</h3>
                    <p className="text-stone-600 capitalize">{productType} Formula</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-stone-900">Ingredients per serving:</h4>
                    {ingredients.map((ingredient) => (
                      <div key={ingredient.id} className="flex justify-between text-sm">
                        <span>{ingredient.name}</span>
                        <span>
                          {ingredient.dosage}
                          {ingredient.unit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Form:</span>
                      <span className="capitalize">{deliveryForm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily serving:</span>
                      <span>
                        {deliveryForm === "powder"
                          ? "1 scoop"
                          : deliveryForm === "capsule"
                            ? `${Math.ceil(ingredients.length / 3)} capsules`
                            : "1 serving"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Supply:</span>
                      <span>30 days</span>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 mt-6 pt-4 border-t">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Vegan
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Made in EU
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      No Fillers
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Subscription</Label>
                  <Select value={subscription} onValueChange={setSubscription}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subscriptionOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{option.name}</span>
                            {option.discount > 0 && (
                              <Badge variant="secondary" className="ml-2">
                                -{option.discount}%
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Formula cost:</span>
                    <span>€{totalCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Packaging ({selectedPackaging?.name}):</span>
                    <span>€{(selectedPackaging?.price || 0).toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({selectedSubscription?.discount}%):</span>
                      <span>-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-emerald-600">€{finalPrice.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-stone-500">
                    {subscription === "one-time" ? "One-time purchase" : `Billed ${subscription}`}
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order My Formula
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Package className="w-4 h-4 mr-2" />
                    Save for Later
                  </Button>
                </div>

                <div className="bg-stone-50 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-stone-900 mb-2">What's included:</h4>
                  <ul className="space-y-1 text-sm text-stone-600">
                    <li>• 30-day supply of your custom formula</li>
                    <li>• Detailed ingredient information</li>
                    <li>• Usage instructions</li>
                    <li>• QR code for easy reordering</li>
                    <li>• Free shipping within EU</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
