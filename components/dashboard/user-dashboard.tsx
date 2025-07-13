"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Package,
  TrendingUp,
  Calendar,
  Settings,
  Bell,
  Zap,
  Moon,
  Brain,
  Shield,
  Star,
  Clock,
  CheckCircle,
  Edit,
  Trash2,
  Download,
  Share2,
} from "lucide-react"

interface UserDashboardProps {
  user: any
  onCreateFormula: () => void
}

export function UserDashboard({ user, onCreateFormula }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app this would come from API
  const userStats = {
    formulasCreated: 3,
    daysActive: 45,
    healthScore: 78,
    streakDays: 12,
  }

  const activeFormulas = [
    {
      id: "1",
      name: "Morning Energy Boost",
      status: "active",
      nextDelivery: "2024-01-15",
      ingredients: 6,
      cost: 42.99,
      progress: 85,
      category: "energy",
    },
    {
      id: "2",
      name: "Sleep & Recovery",
      status: "active",
      nextDelivery: "2024-01-20",
      ingredients: 4,
      cost: 38.5,
      progress: 60,
      category: "sleep",
    },
    {
      id: "3",
      name: "Brain Focus Stack",
      status: "paused",
      nextDelivery: null,
      ingredients: 5,
      cost: 45.0,
      progress: 30,
      category: "brain",
    },
  ]

  const healthMetrics = [
    { name: "Energy Level", value: 8.2, change: +0.5, icon: Zap, color: "text-yellow-600" },
    { name: "Sleep Quality", value: 7.8, change: +0.3, icon: Moon, color: "text-purple-600" },
    { name: "Focus Score", value: 7.5, change: +0.8, icon: Brain, color: "text-blue-600" },
    { name: "Immune Health", value: 8.5, change: +0.2, icon: Shield, color: "text-green-600" },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-10",
      formula: "Morning Energy Boost",
      status: "delivered",
      amount: 42.99,
    },
    {
      id: "ORD-002",
      date: "2024-01-05",
      formula: "Sleep & Recovery",
      status: "shipped",
      amount: 38.5,
    },
    {
      id: "ORD-003",
      date: "2023-12-28",
      formula: "Brain Focus Stack",
      status: "delivered",
      amount: 45.0,
    },
  ]

  const recommendations = [
    {
      title: "Add Vitamin D3",
      description: "Based on your location and season, consider adding Vitamin D3 to boost immunity",
      priority: "high",
      formula: "Morning Energy Boost",
    },
    {
      title: "Optimize Sleep Formula",
      description: "Your sleep tracking shows room for improvement. Consider adding Magnesium Glycinate",
      priority: "medium",
      formula: "Sleep & Recovery",
    },
    {
      title: "Reduce Caffeine",
      description: "Your afternoon energy dips suggest caffeine timing optimization",
      priority: "low",
      formula: "Morning Energy Boost",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "energy":
        return Zap
      case "sleep":
        return Moon
      case "brain":
        return Brain
      default:
        return Package
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "energy":
        return "bg-yellow-100 text-yellow-700"
      case "sleep":
        return "bg-purple-100 text-purple-700"
      case "brain":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-stone-100 text-stone-700"
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-stone-900">FORMULA.ONE</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-900">Welcome back, {user.name}!</h1>
              <p className="text-stone-600 mt-1">Here's your health journey overview</p>
            </div>
            <Button onClick={onCreateFormula} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Formula
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600">Formulas Created</p>
                  <p className="text-2xl font-bold text-stone-900">{userStats.formulasCreated}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600">Days Active</p>
                  <p className="text-2xl font-bold text-stone-900">{userStats.daysActive}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600">Health Score</p>
                  <p className="text-2xl font-bold text-stone-900">{userStats.healthScore}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600">Current Streak</p>
                  <p className="text-2xl font-bold text-stone-900">{userStats.streakDays} days</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="formulas">My Formulas</TabsTrigger>
            <TabsTrigger value="health">Health Tracking</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="recommendations">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Active Formulas */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeFormulas
                      .filter((f) => f.status === "active")
                      .map((formula) => {
                        const Icon = getCategoryIcon(formula.category)
                        return (
                          <div key={formula.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(formula.category)}`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-stone-900">{formula.name}</h4>
                                <p className="text-sm text-stone-600">
                                  {formula.ingredients} ingredients • €{formula.cost}/month
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Progress value={formula.progress} className="w-20 h-2" />
                                  <span className="text-xs text-stone-500">{formula.progress}% complete</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-stone-900">Next delivery</p>
                              <p className="text-sm text-stone-600">{formula.nextDelivery}</p>
                            </div>
                          </div>
                        )
                      })}
                  </CardContent>
                </Card>
              </div>

              {/* Health Metrics */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Health Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {healthMetrics.map((metric) => {
                      const Icon = metric.icon
                      return (
                        <div key={metric.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-5 h-5 ${metric.color}`} />
                            <div>
                              <p className="text-sm font-medium text-stone-900">{metric.name}</p>
                              <p className="text-xs text-stone-600">{metric.value}/10</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}>
                              {metric.change > 0 ? "+" : ""}
                              {metric.change}
                            </span>
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="formulas" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-stone-900">My Formulas</h2>
              <Button onClick={onCreateFormula} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </div>

            <div className="grid gap-6">
              {activeFormulas.map((formula) => {
                const Icon = getCategoryIcon(formula.category)
                return (
                  <Card key={formula.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(formula.category)}`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-stone-900">{formula.name}</h3>
                              <Badge variant={formula.status === "active" ? "default" : "secondary"}>
                                {formula.status}
                              </Badge>
                            </div>
                            <p className="text-stone-600 mb-3">
                              {formula.ingredients} ingredients • €{formula.cost}/month
                            </p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Progress value={formula.progress} className="w-32 h-2" />
                                <span className="text-sm text-stone-500">{formula.progress}% complete</span>
                              </div>
                              {formula.nextDelivery && (
                                <div className="flex items-center space-x-1 text-sm text-stone-600">
                                  <Clock className="w-4 h-4" />
                                  <span>Next: {formula.nextDelivery}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {healthMetrics.map((metric) => {
                      const Icon = metric.icon
                      return (
                        <div key={metric.name}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Icon className={`w-5 h-5 ${metric.color}`} />
                              <span className="font-medium text-stone-900">{metric.name}</span>
                            </div>
                            <span className="text-sm font-medium">{metric.value}/10</span>
                          </div>
                          <Progress value={metric.value * 10} className="h-2" />
                          <div className="flex justify-between text-xs text-stone-500 mt-1">
                            <span>Poor</span>
                            <span>Excellent</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Formula Adherence</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">95%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Moon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium">Avg Sleep</span>
                      </div>
                      <span className="text-sm font-bold text-blue-600">7.5 hrs</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm font-medium">Energy Level</span>
                      </div>
                      <span className="text-sm font-bold text-yellow-600">8.2/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-stone-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-stone-900">{order.formula}</h4>
                          <p className="text-sm text-stone-600">
                            Order #{order.id} • {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-stone-900">€{order.amount}</span>
                        <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              rec.priority === "high"
                                ? "bg-red-500"
                                : rec.priority === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div>
                            <h4 className="font-medium text-stone-900">{rec.title}</h4>
                            <p className="text-sm text-stone-600 mt-1">{rec.description}</p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {rec.formula}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
