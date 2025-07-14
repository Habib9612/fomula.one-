import { invoke } from './apiTestUtils';
import { POST as loginHandler } from '../app/api/auth/login/route';
import { POST as registerHandler } from '../app/api/auth/register/route';

// Mock the database
jest.mock('../lib/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('API Routes', () => {
  describe('Auth Routes', () => {
    it('should handle login with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        name: 'Test User',
        role: 'user',
      };

      const { db } = require('../lib/db');
      db.user.findUnique.mockResolvedValue(mockUser);

      const res = await invoke(loginHandler, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.user).toBeDefined();
      expect(data.token).toBeDefined();
    });

    it('should handle registration with valid data', async () => {
      const mockUser = {
        id: 1,
        email: 'newuser@example.com',
        password: '$2a$10$hashedpassword',
        name: 'New User',
        role: 'user',
      };

      const { db } = require('../lib/db');
      db.user.findUnique.mockResolvedValue(null); // User doesn't exist
      db.user.create.mockResolvedValue(mockUser);

      const res = await invoke(registerHandler, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123',
        }),
      });

      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.user).toBeDefined();
      expect(data.token).toBeDefined();
    });

    it('should reject login with invalid credentials', async () => {
      const { db } = require('../lib/db');
      db.user.findUnique.mockResolvedValue(null);

      const res = await invoke(loginHandler, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        }),
      });

      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data.error).toBe('Invalid credentials');
    });
  });
});
