import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Formula validation schemas
export const ingredientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Ingredient name is required'),
  amount: z.number().positive('Amount must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  cost: z.number().positive('Cost must be positive').optional(),
});

export const formulaSchema = z.object({
  name: z.string().min(1, 'Formula name is required').max(100, 'Formula name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required'),
  goals: z.array(z.string()).optional(),
  form: z.enum(['capsule', 'tablet', 'powder', 'liquid']).optional(),
  dosage: z.string().optional(),
  estimatedCost: z.number().positive('Estimated cost must be positive').optional(),
});

// Health profile validation schemas
export const healthProfileSchema = z.object({
  age: z.number().int().min(1, 'Age must be at least 1').max(120, 'Age must be less than 120'),
  gender: z.enum(['male', 'female', 'other']),
  height: z.number().positive('Height must be positive'),
  weight: z.number().positive('Weight must be positive'),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
  healthConditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
});

// Product validation schemas
export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Product name must be less than 100 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters'),
  inStock: z.boolean().default(true),
  stockQuantity: z.number().int().min(0, 'Stock quantity cannot be negative').optional(),
});

// Email validation utility
export const emailSchema = z.string().email('Invalid email address');

// Password validation utility
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Search query validation
export const searchQuerySchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query must be less than 100 characters'),
  category: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(10),
  offset: z.number().int().min(0).default(0),
});

// Common validation utilities
export const positiveIntegerSchema = z.number().int().positive('Must be a positive integer');
export const nonNegativeIntegerSchema = z.number().int().min(0, 'Must be a non-negative integer');
export const slugSchema = z.string().regex(/^[a-z0-9-]+$/, 'Must be a valid slug (lowercase letters, numbers, and hyphens only)');
export const phoneNumberSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');
export const urlSchema = z.string().url('Invalid URL format');

// Type exports
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type IngredientData = z.infer<typeof ingredientSchema>;
export type FormulaData = z.infer<typeof formulaSchema>;
export type HealthProfileData = z.infer<typeof healthProfileSchema>;
export type ProductData = z.infer<typeof productSchema>;
export type SearchQueryData = z.infer<typeof searchQuerySchema>;
