import { authApi, formulasApi, healthProfileApi } from '@/lib/api';
import { invoke } from '../apiTestUtils';

jest.mock('@/lib/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  },
  formulasApi: {
    getFormulas: jest.fn(),
    createFormula: jest.fn(),
    getFormula: jest.fn(),
    updateFormula: jest.fn(),
    deleteFormula: jest.fn(),
  },
  healthProfileApi: {
    getProfile: jest.fn(),
    createProfile: jest.fn(),
    updateProfile: jest.fn(),
  }
}));

describe('API Utilities', () => {
  describe('Auth API', () => {
    it('should login with valid credentials', async () => {
      const mockResponse = { success: true, token: 'jwt-token', user: { id: 1, email: 'test@example.com' } };
      authApi.login.mockResolvedValue(mockResponse);

      const response = await authApi.login('test@example.com', 'password');
      expect(response).toEqual(mockResponse);
      expect(authApi.login).toHaveBeenCalledWith('test@example.com', 'password');
    });

    it('should register a new user with valid data', async () => {
      const mockResponse = { success: true, token: 'jwt-token', user: { id: 2, email: 'newuser@example.com' } };
      authApi.register.mockResolvedValue(mockResponse);

      const response = await authApi.register('New User', 'newuser@example.com', 'password123');
      expect(response).toEqual(mockResponse);
      expect(authApi.register).toHaveBeenCalledWith('New User', 'newuser@example.com', 'password123');
    });

    it('should logout successfully', async () => {
      const mockResponse = { success: true };
      authApi.logout.mockResolvedValue(mockResponse);

      const response = await authApi.logout();
      expect(response).toEqual(mockResponse);
      expect(authApi.logout).toHaveBeenCalled();
    });
  });

  describe('Formulas API', () => {
    it('should retrieve formulas', async () => {
      const mockFormulas = [{ id: 1, name: 'Formula 1' }, { id: 2, name: 'Formula 2' }];
      formulasApi.getFormulas.mockResolvedValue(mockFormulas);

      const response = await formulasApi.getFormulas();
      expect(response).toEqual(mockFormulas);
      expect(formulasApi.getFormulas).toHaveBeenCalled();
    });

    it('should create a new formula', async () => {
      const mockFormula = { id: 3, name: 'New Formula' };
      formulasApi.createFormula.mockResolvedValue(mockFormula);

      const response = await formulasApi.createFormula({ name: 'New Formula', ingredients: [] });
      expect(response).toEqual(mockFormula);
      expect(formulasApi.createFormula).toHaveBeenCalledWith({ name: 'New Formula', ingredients: [] });
    });

    it('should get a formula by ID', async () => {
      const mockFormula = { id: 1, name: 'Formula 1' };
      formulasApi.getFormula.mockResolvedValue(mockFormula);

      const response = await formulasApi.getFormula('1');
      expect(response).toEqual(mockFormula);
      expect(formulasApi.getFormula).toHaveBeenCalledWith('1');
    });
  });

  describe('Health Profile API', () => {
    it('should retrieve health profile', async () => {
      const mockProfile = { id: 1, userId: 1, data: {} };
      healthProfileApi.getProfile.mockResolvedValue(mockProfile);

      const response = await healthProfileApi.getProfile();
      expect(response).toEqual(mockProfile);
      expect(healthProfileApi.getProfile).toHaveBeenCalled();
    });
  });
});
