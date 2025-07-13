import { NextRequest, NextResponse } from 'next/server';

// Mock products database (same as in route.ts)
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
    inStock: true,
    nutritionFacts: {
      calories: 120,
      protein: 25,
      carbs: 2,
      fat: 1,
      sugar: 1
    },
    detailedDescription: 'Our premium whey protein isolate is sourced from grass-fed cows and contains all essential amino acids. Perfect for post-workout recovery and muscle building.',
    usage: 'Mix 1 scoop with 8-10 oz of water or milk. Consume within 30 minutes after workout for optimal results.'
  }
  // Add other products with detailed info as needed
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}