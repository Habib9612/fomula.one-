import { z } from 'zod';
import { loginSchema, registerSchema, formulaSchema, healthProfileSchema } from '@/lib/validations';

describe('Validation Schemas', () => {
  describe('Auth Schemas', () => {
    it('should validate login schema correctly', () => {
      const data = { email: 'test@example.com', password: 'password123' };
      expect(() => loginSchema.parse(data)).not.toThrow();
    });

    it('should throw error for invalid email in login schema', () => {
      const data = { email: 'invalid-email', password: 'password123' };
      expect(() => loginSchema.parse(data)).toThrow('Invalid email address');
    });

    it('should validate register schema correctly with matching passwords', () => {
      const data = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
      expect(() => registerSchema.parse(data)).not.toThrow();
    });

    it('should throw error for non-matching passwords in register schema', () => {
      const data = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password456',
      };
      expect(() => registerSchema.parse(data)).toThrow('Passwords do not match');
    });
  });

  describe('Formula Schema', () => {
    it('should validate formula schema correctly', () => {
      const data = {
        name: 'Energy Formula',
        ingredients: [
          { id: '1', name: 'Caffeine', amount: 100, unit: 'mg' },
        ],
        estimatedCost: 10.5,
      };
      expect(() => formulaSchema.parse(data)).not.toThrow();
    });

    it('should throw error if ingredient is missing in formula', () => {
      const data = {
        name: 'Energy Formula',
        ingredients: [],
      };
      expect(() => formulaSchema.parse(data)).toThrow('At least one ingredient is required');
    });
  });

  describe('Health Profile Schema', () => {
    it('should validate health profile schema correctly', () => {
      const data = {
        age: 30,
        gender: 'male',
        height: 175,
        weight: 70,
        activityLevel: 'moderately_active',
      };
      expect(() => healthProfileSchema.parse(data)).not.toThrow();
    });

    it('should throw error if age is out of range', () => {
      const data = {
        age: 0, // Invalid age
        gender: 'male',
        height: 175,
        weight: 70,
        activityLevel: 'moderately_active',
      };
      expect(() => healthProfileSchema.parse(data)).toThrow('Age must be at least 1');
    });
  });
});

