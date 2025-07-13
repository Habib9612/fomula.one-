import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
  } catch {
    return null;
  }
}

// Mock AI recommendation engine
function generateRecommendations(userProfile: any, healthGoals: string[]) {
  const baseRecommendations = [
    {
      ingredient: 'Vitamin D3',
      amount: 1000,
      unit: 'IU',
      reason: 'Essential for immune function and bone health',
      confidence: 0.95,
      category: 'vitamins'
    },
    {
      ingredient: 'Omega-3 (EPA/DHA)',
      amount: 1000,
      unit: 'mg',
      reason: 'Supports heart health and reduces inflammation',
      confidence: 0.90,
      category: 'supplements'
    },
    {
      ingredient: 'Magnesium',
      amount: 400,
      unit: 'mg',
      reason: 'Important for muscle function and sleep quality',
      confidence: 0.85,
      category: 'minerals'
    }
  ];

  // Add goal-specific recommendations
  if (healthGoals.includes('weight_loss')) {
    baseRecommendations.push({
      ingredient: 'Green Tea Extract',
      amount: 500,
      unit: 'mg',
      reason: 'May boost metabolism and support weight management',
      confidence: 0.75,
      category: 'supplements'
    });
  }

  if (healthGoals.includes('muscle_gain')) {
    baseRecommendations.push({
      ingredient: 'Whey Protein',
      amount: 25,
      unit: 'g',
      reason: 'High-quality protein for muscle building and recovery',
      confidence: 0.92,
      category: 'protein'
    });
    baseRecommendations.push({
      ingredient: 'Creatine Monohydrate',
      amount: 5,
      unit: 'g',
      reason: 'Enhances strength and power output during workouts',
      confidence: 0.88,
      category: 'performance'
    });
  }

  if (healthGoals.includes('energy_boost')) {
    baseRecommendations.push({
      ingredient: 'B-Complex',
      amount: 50,
      unit: 'mg',
      reason: 'Essential for energy metabolism and nervous system function',
      confidence: 0.87,
      category: 'vitamins'
    });
  }

  return baseRecommendations;
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userProfile, healthGoals, preferences } = await request.json();

    if (!healthGoals || healthGoals.length === 0) {
      return NextResponse.json(
        { error: 'Health goals are required for recommendations' },
        { status: 400 }
      );
    }

    // Generate AI recommendations
    const recommendations = generateRecommendations(userProfile, healthGoals);

    // Filter based on allergies if provided
    let filteredRecommendations = recommendations;
    if (userProfile?.allergies && userProfile.allergies.length > 0) {
      // In a real implementation, you'd have a database of ingredient-allergy mappings
      filteredRecommendations = recommendations.filter(rec => {
        // Simple example: avoid whey if lactose intolerant
        if (userProfile.allergies.includes('lactose') && rec.ingredient.includes('Whey')) {
          return false;
        }
        return true;
      });
    }

    return NextResponse.json({
      success: true,
      recommendations: filteredRecommendations,
      metadata: {
        generatedAt: new Date().toISOString(),
        basedOn: {
          goals: healthGoals,
          profileFactors: userProfile ? Object.keys(userProfile) : [],
          totalRecommendations: filteredRecommendations.length
        }
      }
    });

  } catch (error) {
    console.error('AI recommendations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}