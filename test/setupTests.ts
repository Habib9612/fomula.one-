import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';

process.env.JWT_SECRET = 'test-secret-key';
jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => '/'
}));

afterEach(() => jest.resetModules());
