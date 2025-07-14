import { render, screen, waitFor } from '@testing-library/react';
import { useAuth, AuthProvider } from '@/lib/auth-context';
import { authApi } from '@/lib/api';

// Mock the API
jest.mock('@/lib/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  },
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Test component to use the auth context
const TestComponent = () => {
  const { user, token, login, register, logout, isLoading } = useAuth();
  
  return (
    <div>
      <div data-testid="loading">{isLoading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="user">{user ? user.email : 'No User'}</div>
      <div data-testid="token">{token || 'No Token'}</div>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={() => register('Test User', 'test@example.com', 'password')}>Register</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('Auth Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('AuthProvider', () => {
    it('should provide initial state correctly', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
      expect(screen.getByTestId('token')).toHaveTextContent('No Token');
    });

    it('should load user from localStorage on mount', () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', role: 'user' };
      const mockToken = 'jwt-token';
      
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return mockToken;
        if (key === 'user') return JSON.stringify(mockUser);
        return null;
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
      expect(screen.getByTestId('token')).toHaveTextContent('jwt-token');
    });

    it('should handle login successfully', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', role: 'user' };
      const mockToken = 'jwt-token';
      const mockResponse = { success: true, user: mockUser, token: mockToken };
      
      authApi.login.mockResolvedValue(mockResponse);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByText('Login');
      loginButton.click();

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
        expect(screen.getByTestId('token')).toHaveTextContent('jwt-token');
      });

      expect(authApi.login).toHaveBeenCalledWith('test@example.com', 'password');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', mockToken);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    });

    it('should handle login failure', async () => {
      const mockError = new Error('Login failed');
      authApi.login.mockRejectedValue(mockError);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByText('Login');
      
      await expect(async () => {
        loginButton.click();
        await waitFor(() => {
          expect(authApi.login).toHaveBeenCalled();
        });
      }).rejects.toThrow('Login failed');

      expect(screen.getByTestId('user')).toHaveTextContent('No User');
      expect(screen.getByTestId('token')).toHaveTextContent('No Token');
    });

    it('should handle register successfully', async () => {
      const mockUser = { id: 2, email: 'newuser@example.com', name: 'New User', role: 'user' };
      const mockToken = 'new-jwt-token';
      const mockResponse = { success: true, user: mockUser, token: mockToken };
      
      authApi.register.mockResolvedValue(mockResponse);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = screen.getByText('Register');
      registerButton.click();

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('newuser@example.com');
        expect(screen.getByTestId('token')).toHaveTextContent('new-jwt-token');
      });

      expect(authApi.register).toHaveBeenCalledWith('Test User', 'test@example.com', 'password');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', mockToken);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    });

    it('should handle register failure', async () => {
      const mockError = new Error('Registration failed');
      authApi.register.mockRejectedValue(mockError);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = screen.getByText('Register');
      
      await expect(async () => {
        registerButton.click();
        await waitFor(() => {
          expect(authApi.register).toHaveBeenCalled();
        });
      }).rejects.toThrow('Registration failed');

      expect(screen.getByTestId('user')).toHaveTextContent('No User');
      expect(screen.getByTestId('token')).toHaveTextContent('No Token');
    });

    it('should handle logout correctly', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', role: 'user' };
      const mockToken = 'jwt-token';
      
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return mockToken;
        if (key === 'user') return JSON.stringify(mockUser);
        return null;
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Initially logged in
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
      expect(screen.getByTestId('token')).toHaveTextContent('jwt-token');

      const logoutButton = screen.getByText('Logout');
      logoutButton.click();

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('No User');
        expect(screen.getByTestId('token')).toHaveTextContent('No Token');
      });

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      const TestComponentWithoutProvider = () => {
        const auth = useAuth();
        return <div>{auth.user?.email || 'No User'}</div>;
      };

      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');

      console.error = originalError;
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid JSON in localStorage', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token';
        if (key === 'user') return 'invalid-json';
        return null;
      });

      // Should not throw error, should handle gracefully
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user')).toHaveTextContent('No User');
      expect(screen.getByTestId('token')).toHaveTextContent('valid-token');
    });

    it('should handle localStorage being unavailable', () => {
      const originalLocalStorage = window.localStorage;
      delete window.localStorage;

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user')).toHaveTextContent('No User');
      expect(screen.getByTestId('token')).toHaveTextContent('No Token');

      window.localStorage = originalLocalStorage;
    });

    it('should handle API response without success field', async () => {
      const mockResponse = { error: 'Invalid credentials' };
      authApi.login.mockResolvedValue(mockResponse);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByText('Login');
      
      await expect(async () => {
        loginButton.click();
        await waitFor(() => {
          expect(authApi.login).toHaveBeenCalled();
        });
      }).rejects.toThrow('Invalid credentials');
    });
  });
});
