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

// Mock dashboard data
function generateDashboardStats(userId: number) {
  return {
    overview: {
      activeFormulas: 3,
      totalSupplements: 12,
      monthlySpend: 127.50,
      healthScore: 85
    },
    recentActivity: [
      {
        id: 1,
        type: 'formula_created',
        title: 'Created new formula: Morning Energy Boost',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        icon: 'formula'
      },
      {
        id: 2,
        type: 'supplement_ordered',
        title: 'Ordered Omega-3 Fish Oil',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        icon: 'shopping'
      },
      {
        id: 3,
        type: 'health_profile_updated',
        title: 'Updated health goals',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        icon: 'profile'
      }
    ],
    healthMetrics: {
      energy: { current: 8, target: 9, trend: 'up' },
      sleep: { current: 7, target: 8, trend: 'stable' },
      mood: { current: 8, target: 8, trend: 'up' },
      focus: { current: 7, target: 9, trend: 'up' }
    },
    supplementProgress: [
      {
        name: 'Vitamin D3',
        taken: 28,
        total: 30,
        percentage: 93,
        nextDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'Omega-3',
        taken: 25,
        total: 30,
        percentage: 83,
        nextDue: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'Multivitamin',
        taken: 30,
        total: 30,
        percentage: 100,
        nextDue: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
      }
    ],
    weeklyProgress: [
      { day: 'Mon', completed: 95 },
      { day: 'Tue', completed: 100 },
      { day: 'Wed', completed: 85 },
      { day: 'Thu', completed: 90 },
      { day: 'Fri', completed: 100 },
      { day: 'Sat', completed: 75 },
      { day: 'Sun', completed: 80 }
    ]
  };
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

    const stats = generateDashboardStats(decoded.userId);

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}