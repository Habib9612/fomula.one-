import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock products database
const products = [
  {
    id: 1,
    name: 'Premium Whey Protein',
    category: 'protein',
    description: 'High-quality whey protein isolate for muscle building and recovery',
    ingredients: ['Whey Protein Isolate', 'Natural Flavors', 'Stevia'],
    servingSize: '30g',
    servingsPerContainer: 30,
    price: 49.99,
    rating: 4.8,
    reviews: 1250,
    benefits: ['Muscle Building', 'Recovery', 'High Protein'],
    allergens: ['Milk'],
    image: '/products/whey-protein.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Omega-3 Fish Oil',
    category: 'supplements',
    description: 'Pure fish oil with EPA and DHA for heart and brain health',
    ingredients: ['Fish Oil', 'EPA', 'DHA', 'Vitamin E'],
    servingSize: '2 capsules',
    servingsPerContainer: 60,
    price: 29.99,
    rating: 4.6,
    reviews: 890,
    benefits: ['Heart Health', 'Brain Function', 'Anti-inflammatory'],
    allergens: ['Fish'],
    image: '/products/omega-3.jpg',
    inStock: true
  },
  {
    id: 3,
    name: 'Multivitamin Complex',
    category: 'vitamins',
    description: 'Complete daily multivitamin with essential nutrients',
    ingredients: ['Vitamin A', 'Vitamin C', 'Vitamin D3', 'B-Complex', 'Iron', 'Zinc'],
    servingSize: '1 tablet',
    servingsPerContainer: 90,
    price: 24.99,
    rating: 4.5,
    reviews: 2100,
    benefits: ['Immune Support', 'Energy', 'Overall Health'],
    allergens: [],
    image: '/products/multivitamin.jpg',
    inStock: true
  },
  {
    id: 4,
    name: 'Creatine Monohydrate',
    category: 'performance',
    description: 'Pure creatine monohydrate for strength and power',
    ingredients: ['Creatine Monohydrate'],
    servingSize: '5g',
    servingsPerContainer: 60,
    price: 19.99,
    rating: 4.7,
    reviews: 1580,
    benefits: ['Strength', 'Power', 'Muscle Volume'],
    allergens: [],
    image: '/products/creatine.jpg',
    inStock: true
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
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredProducts = [...products];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.benefits.some(b => b.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      products: paginatedProducts,
      total: filteredProducts.length,
      hasMore: offset + limit < filteredProducts.length
    });

  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}