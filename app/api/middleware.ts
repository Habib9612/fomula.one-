import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: number;
    email: string;
    role: string;
  };
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    try {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Authorization header required' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
        
        // Add user info to request
        (request as AuthenticatedRequest).user = {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role
        };
        
        return await handler(request as AuthenticatedRequest);
      } catch (jwtError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

export function validateRequest(schema: any) {
  return (handler: (req: NextRequest, validatedData: any) => Promise<NextResponse>) => {
    return async (request: NextRequest) => {
      try {
        const body = await request.json();
        
        // Basic validation - in a real app, use a library like Zod
        const validatedData = body; // Placeholder for actual validation
        
        return await handler(request, validatedData);
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid request data' },
          { status: 400 }
        );
      }
    };
  };
}

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}