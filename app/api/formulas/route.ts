import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock formulas database
let formulas = [
  {
    id: 1,
    userId: 1,
    name: 'Morning Energy Boost',
    description: 'A custom formula designed to increase energy and focus for morning workouts',
    ingredients: [
      { name: 'Caffeine', amount: 200, unit: 'mg', purpose: 'Energy boost' },
      { name: 'L-Theanine', amount: 100, unit: 'mg', purpose: 'Focus without jitters' },
      { name: 'B-Complex', amount: 50, unit: 'mg', purpose: 'Energy metabolism' },
      { name: 'Vitamin D3', amount: 1000, unit: 'IU', purpose: 'Immune support' }
    ],
    goals: ['energy_boost', 'focus', 'workout_performance'],
    form: 'capsule',
    dosage: '2 capsules daily with breakfast',
    estimatedCost: 45.99,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

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

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userFormulas = formulas.filter(f => f.userId === decoded.userId);

    return NextResponse.json({
      success: true,
      formulas: userFormulas
    });

  } catch (error) {
    console.error('Formulas fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
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

    const formulaData = await request.json();
    
    if (!formulaData.name || !formulaData.ingredients || formulaData.ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Formula name and ingredients are required' },
        { status: 400 }
      );
    }

    const newFormula = {
      id: formulas.length + 1,
      userId: decoded.userId,
      ...formulaData,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    formulas.push(newFormula);

    return NextResponse.json({
      success: true,
      formula: newFormula
    }, { status: 201 });

  } catch (error) {
    console.error('Formula creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}