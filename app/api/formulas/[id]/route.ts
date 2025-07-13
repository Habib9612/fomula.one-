import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock formulas database (same as in route.ts)
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formulaId = parseInt(params.id);
    const formula = formulas.find(f => f.id === formulaId && f.userId === decoded.userId);

    if (!formula) {
      return NextResponse.json(
        { error: 'Formula not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      formula
    });

  } catch (error) {
    console.error('Formula fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formulaId = parseInt(params.id);
    const formulaIndex = formulas.findIndex(f => f.id === formulaId && f.userId === decoded.userId);

    if (formulaIndex === -1) {
      return NextResponse.json(
        { error: 'Formula not found' },
        { status: 404 }
      );
    }

    const updateData = await request.json();

    // Update formula
    formulas[formulaIndex] = {
      ...formulas[formulaIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      formula: formulas[formulaIndex]
    });

  } catch (error) {
    console.error('Formula update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formulaId = parseInt(params.id);
    const formulaIndex = formulas.findIndex(f => f.id === formulaId && f.userId === decoded.userId);

    if (formulaIndex === -1) {
      return NextResponse.json(
        { error: 'Formula not found' },
        { status: 404 }
      );
    }

    // Remove formula
    formulas.splice(formulaIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Formula deleted successfully'
    });

  } catch (error) {
    console.error('Formula deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}