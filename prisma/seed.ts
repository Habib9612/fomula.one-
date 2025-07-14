const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('password', 10)

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@formula.one' },
    update: {},
    create: {
      email: 'demo@formula.one',
      password: hashedPassword,
      name: 'Demo User',
      role: 'user',
    },
  })

  console.log('Created user:', user)

  // Create health profile for demo user
  const healthProfile = await prisma.healthProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      age: 30,
      gender: 'male',
      height: 180,
      weight: 75,
      activityLevel: 'moderate',
      healthGoals: JSON.stringify(['weight_loss', 'muscle_gain', 'energy_boost']),
      allergies: JSON.stringify(['nuts', 'shellfish']),
      medications: JSON.stringify(['vitamin_d']),
      conditions: JSON.stringify([]),
      dietType: 'omnivore',
      supplementForm: 'capsule',
      budget: 'medium',
    },
  })

  console.log('Created health profile:', healthProfile)

  // Create sample products
  const products = [
    {
      name: 'Premium Whey Protein',
      category: 'protein',
      description: 'High-quality whey protein isolate for muscle building and recovery',
      ingredients: JSON.stringify(['Whey Protein Isolate', 'Natural Flavors', 'Stevia']),
      servingSize: '30g',
      servingsPerContainer: 30,
      price: 49.99,
      rating: 4.8,
      reviews: 1250,
      benefits: JSON.stringify(['Muscle Building', 'Recovery', 'High Protein']),
      allergens: JSON.stringify(['Milk']),
      image: '/products/whey-protein.jpg',
      inStock: true,
    },
    {
      name: 'Omega-3 Fish Oil',
      category: 'supplements',
      description: 'Pure fish oil with EPA and DHA for heart and brain health',
      ingredients: JSON.stringify(['Fish Oil', 'EPA', 'DHA', 'Vitamin E']),
      servingSize: '2 capsules',
      servingsPerContainer: 60,
      price: 29.99,
      rating: 4.6,
      reviews: 890,
      benefits: JSON.stringify(['Heart Health', 'Brain Function', 'Anti-inflammatory']),
      allergens: JSON.stringify(['Fish']),
      image: '/products/omega-3.jpg',
      inStock: true,
    },
    {
      name: 'Multivitamin Complex',
      category: 'vitamins',
      description: 'Complete daily multivitamin with essential nutrients',
      ingredients: JSON.stringify(['Vitamin A', 'Vitamin C', 'Vitamin D3', 'B-Complex', 'Iron', 'Zinc']),
      servingSize: '1 tablet',
      servingsPerContainer: 90,
      price: 24.99,
      rating: 4.5,
      reviews: 2100,
      benefits: JSON.stringify(['Immune Support', 'Energy', 'Overall Health']),
      allergens: JSON.stringify([]),
      image: '/products/multivitamin.jpg',
      inStock: true,
    },
    {
      name: 'Creatine Monohydrate',
      category: 'performance',
      description: 'Pure creatine monohydrate for strength and power',
      ingredients: JSON.stringify(['Creatine Monohydrate']),
      servingSize: '5g',
      servingsPerContainer: 60,
      price: 19.99,
      rating: 4.7,
      reviews: 1580,
      benefits: JSON.stringify(['Strength', 'Power', 'Muscle Volume']),
      allergens: JSON.stringify([]),
      image: '/products/creatine.jpg',
      inStock: true,
    },
  ]

  for (const product of products) {
    // Check if product already exists
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name }
    })
    
    if (!existingProduct) {
      await prisma.product.create({
        data: product,
      })
    }
  }

  console.log('Created products')

  // Create sample formula
  const existingFormula = await prisma.formula.findFirst({
    where: {
      userId: user.id,
      name: 'Morning Energy Boost'
    }
  })

  if (!existingFormula) {
    const formula = await prisma.formula.create({
      data: {
        userId: user.id,
        name: 'Morning Energy Boost',
        description: 'A custom formula designed to increase energy and focus for morning workouts',
        ingredients: JSON.stringify([
          { name: 'Caffeine', amount: 200, unit: 'mg', purpose: 'Energy boost' },
          { name: 'L-Theanine', amount: 100, unit: 'mg', purpose: 'Focus without jitters' },
          { name: 'B-Complex', amount: 50, unit: 'mg', purpose: 'Energy metabolism' },
          { name: 'Vitamin D3', amount: 1000, unit: 'IU', purpose: 'Immune support' }
        ]),
        goals: JSON.stringify(['energy_boost', 'focus', 'workout_performance']),
        form: 'capsule',
        dosage: '2 capsules daily with breakfast',
        estimatedCost: 45.99,
        status: 'active',
      },
    })
    console.log('Created formula:', formula)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
