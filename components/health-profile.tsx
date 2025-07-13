"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Activity } from "lucide-react"

interface HealthProfileProps {
  onComplete: (profile: HealthProfile) => void
  onSkip: () => void
}

interface HealthProfile {
  age: number
  gender: "male" | "female"
  weight: number
  height: number
  activityLevel: string
  sleepQuality: number
  energyLevel: number
  stressLevel: number
  skinCondition: number
  primaryGoals: string[]
  healthConditions: string[]
  currentSupplements: string[]
}

export function HealthProfile({ onComplete, onSkip }: HealthProfileProps) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<Partial<HealthProfile>>({
    primaryGoals: [],
    healthConditions: [],
    currentSupplements: [],
  })

  const totalSteps = 4

  const healthGoals = [
    "Better Sleep",
    "More Energy",
    "Muscle Building",
    "Weight Loss",
    "Skin Health",
    "Hair Growth",
    "Stress Management",
    "Focus & Concentration",
    "Immune Support",
    "Heart Health",
    "Bone Health",
    "Digestive Health",
  ]

  const commonConditions = [
    "None",
    "High Blood Pressure",
    "Diabetes",
    "Thyroid Issues",
    "Anxiety/Depression",
    "Digestive Issues",
    "Joint Pain",
    "Insomnia",
    "Allergies",
    "Hormonal Imbalance",
  ]

  const commonSupplements = [
    "None",
    "Multivitamin",
    "Vitamin D",
    "Omega-3",
    "Protein Powder",
    "Magnesium",
    "Probiotics",
    "B-Complex",
    "Iron",
    "Calcium",
  ]

  const toggleArrayItem = (array: string[], item: string, setter: (items: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item))
    } else {
      setter([...array, item])
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(profile as HealthProfile)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Basic Information</h2>
              <p className="text-stone-600">Help us understand your baseline health metrics</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={profile.age || ""}
                  onChange={(e) => setProfile({ ...profile, age: Number.parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Gender</Label>
                <Select
                  value={profile.gender}
                  onValueChange={(value) => setProfile({ ...profile, gender: value as any })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={profile.weight || ""}
                  onChange={(e) => setProfile({ ...profile, weight: Number.parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={profile.height || ""}
                  onChange={(e) => setProfile({ ...profile, height: Number.parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Activity Level</Label>
              <Select
                value={profile.activityLevel}
                onValueChange={(value) => setProfile({ ...profile, activityLevel: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (2x/day or intense training)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Current Wellness State</h2>
              <p className="text-stone-600">Rate your current levels (1-10 scale)</p>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="flex items-center space-x-2">
                    <span>Sleep Quality</span>
                    <Badge variant="outline">{profile.sleepQuality || 5}/10</Badge>
                  </Label>
                </div>
                <Slider
                  value={[profile.sleepQuality || 5]}
                  onValueChange={([value]) => setProfile({ ...profile, sleepQuality: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="flex items-center space-x-2">
                    <span>Energy Level</span>
                    <Badge variant="outline">{profile.energyLevel || 5}/10</Badge>
                  </Label>
                </div>
                <Slider
                  value={[profile.energyLevel || 5]}
                  onValueChange={([value]) => setProfile({ ...profile, energyLevel: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-1">
                  <span>Always Tired</span>
                  <span>Very Energetic</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="flex items-center space-x-2">
                    <span>Stress Level</span>
                    <Badge variant="outline">{profile.stressLevel || 5}/10</Badge>
                  </Label>
                </div>
                <Slider
                  value={[profile.stressLevel || 5]}
                  onValueChange={([value]) => setProfile({ ...profile, stressLevel: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-1">
                  <span>Very Calm</span>
                  <span>Very Stressed</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="flex items-center space-x-2">
                    <span>Skin Condition</span>
                    <Badge variant="outline">{profile.skinCondition || 5}/10</Badge>
                  </Label>
                </div>
                <Slider
                  value={[profile.skinCondition || 5]}
                  onValueChange={([value]) => setProfile({ ...profile, skinCondition: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Health Goals</h2>
              <p className="text-stone-600">Select your primary health objectives (choose up to 4)</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {healthGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={profile.primaryGoals?.includes(goal) ? "default" : "outline"}
                  className={`h-auto p-4 text-left justify-start ${
                    profile.primaryGoals?.includes(goal) ? "bg-emerald-600 hover:bg-emerald-700" : ""
                  }`}
                  onClick={() =>
                    toggleArrayItem(
                      profile.primaryGoals || [],
                      goal,
                      (goals) => setProfile({ ...profile, primaryGoals: goals.slice(0, 4) }), // Limit to 4
                    )
                  }
                  disabled={!profile.primaryGoals?.includes(goal) && (profile.primaryGoals?.length || 0) >= 4}
                >
                  {goal}
                </Button>
              ))}
            </div>

            {(profile.primaryGoals?.length || 0) > 0 && (
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-700">
                  Selected {profile.primaryGoals?.length}/4 goals. We'll prioritize ingredients that support these
                  areas.
                </p>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Health History</h2>
              <p className="text-stone-600">Help us ensure safe recommendations</p>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">Do you have any of these health conditions?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonConditions.map((condition) => (
                  <Button
                    key={condition}
                    variant={profile.healthConditions?.includes(condition) ? "default" : "outline"}
                    size="sm"
                    className={`text-left justify-start ${
                      profile.healthConditions?.includes(condition) ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                    onClick={() =>
                      toggleArrayItem(profile.healthConditions || [], condition, (conditions) =>
                        setProfile({ ...profile, healthConditions: conditions }),
                      )
                    }
                  >
                    {condition}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">What supplements do you currently take?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonSupplements.map((supplement) => (
                  <Button
                    key={supplement}
                    variant={profile.currentSupplements?.includes(supplement) ? "default" : "outline"}
                    size="sm"
                    className={`text-left justify-start ${
                      profile.currentSupplements?.includes(supplement) ? "bg-purple-600 hover:bg-purple-700" : ""
                    }`}
                    onClick={() =>
                      toggleArrayItem(profile.currentSupplements || [], supplement, (supplements) =>
                        setProfile({ ...profile, currentSupplements: supplements }),
                      )
                    }
                  >
                    {supplement}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Health Profile</CardTitle>
                <p className="text-stone-600">
                  Step {step} of {totalSteps}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onSkip} className="text-stone-500">
              Skip for now
            </Button>
          </div>
          <Progress value={(step / totalSteps) * 100} className="w-full" />
        </CardHeader>

        <CardContent className="p-8">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
              Previous
            </Button>
            <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">
              {step === totalSteps ? "Complete Profile" : "Next"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
