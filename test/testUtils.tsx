import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '@/lib/auth-context';

// Mock localStorage for testing
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock authApi
jest.mock('@/lib/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
  },
}));

// Setup localStorage mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

interface TestProviderProps {
  children: ReactNode;
}

function TestProviders({ children }: TestProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: ReactNode }>;
}

export function renderWithProviders(
  ui: ReactNode,
  options: CustomRenderOptions = {}
) {
  return render(ui, {
    wrapper: TestProviders,
    ...options,
  });
}

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
