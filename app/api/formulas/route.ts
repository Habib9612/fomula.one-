import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

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

    const userFormulas = await db.formula.findMany({
      where: { userId: decoded.userId }
    });

    // Parse JSON fields for response
    const formattedFormulas = userFormulas.map(formula => ({
      ...formula,
      ingredients: JSON.parse(formula.ingredients as string),
      goals: JSON.parse(formula.goals as string)
    }));

    return NextResponse.json({
      success: true,
      formulas: formattedFormulas
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

    const newFormula = await db.formula.create({
      data: {
        userId: decoded.userId,
        name: formulaData.name,
        description: formulaData.description,
        ingredients: JSON.stringify(formulaData.ingredients),
        goals: JSON.stringify(formulaData.goals || []),
        form: formulaData.form,
        dosage: formulaData.dosage,
        estimatedCost: formulaData.estimatedCost,
        status: 'active'
      }
    });

    // Format response
    const formattedFormula = {
      ...newFormula,
      ingredients: JSON.parse(newFormula.ingredients as string),
      goals: JSON.parse(newFormula.goals as string)
    };

    return NextResponse.json({
      success: true,
      formula: formattedFormula
    }, { status: 201 });

  } catch (error) {
    console.error('Formula creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}