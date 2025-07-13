import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock health profiles database
let healthProfiles = [
  {
    id: 1,
    userId: 1,
    basicInfo: {
      age: 30,
      gender: 'male',
      height: 180, // cm
      weight: 75, // kg
      activityLevel: 'moderate'
    },
    healthGoals: ['weight_loss', 'muscle_gain', 'energy_boost'],
    medicalInfo: {
      allergies: ['nuts', 'shellfish'],
      medications: ['vitamin_d'],
      conditions: []
    },
    preferences: {
      dietType: 'omnivore',
      supplementForm: 'capsule',
      budget: 'medium'
    },
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

    const profile = healthProfiles.find(p => p.userId === decoded.userId);
    if (!profile) {
      return NextResponse.json(
        { error: 'Health profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile
    });

  } catch (error) {
    console.error('Health profile fetch error:', error);
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

    const profileData = await request.json();
    
    // Check if profile already exists
    const existingProfile = healthProfiles.find(p => p.userId === decoded.userId);
    if (existingProfile) {
      return NextResponse.json(
        { error: 'Health profile already exists. Use PUT to update.' },
        { status: 409 }
      );
    }

    const newProfile = {
      id: healthProfiles.length + 1,
      userId: decoded.userId,
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    healthProfiles.push(newProfile);

    return NextResponse.json({
      success: true,
      profile: newProfile
    }, { status: 201 });

  } catch (error) {
    console.error('Health profile creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updateData = await request.json();
    
    const profileIndex = healthProfiles.findIndex(p => p.userId === decoded.userId);
    if (profileIndex === -1) {
      return NextResponse.json(
        { error: 'Health profile not found' },
        { status: 404 }
      );
    }

    // Update profile
    healthProfiles[profileIndex] = {
      ...healthProfiles[profileIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      profile: healthProfiles[profileIndex]
    });

  } catch (error) {
    console.error('Health profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}