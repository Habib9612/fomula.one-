import { renderWithProviders, userEvent, screen } from '../../test/testUtils';
import { LoginModal } from '../auth/login-modal';
import { act } from 'react-dom/test-utils';

describe('LoginModal component', () => {
  const setup = (isOpen = true) => {
    const onClose = jest.fn();
    const onSuccess = jest.fn();
    renderWithProviders(
      <LoginModal isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
    );
    return { onClose, onSuccess };
  };

  it('renders with login and signup tabs', () => {
    setup();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('can switch between login and signup tabs', async () => {
    setup();
    await userEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Login'));
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('validates signup form and shows error if passwords do not match', async () => {
    setup();
    await userEvent.click(screen.getByText('Sign Up'));
    await userEvent.type(screen.getByLabelText('Full Name'), 'New User');
    await userEvent.type(screen.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password');
    await userEvent.type(screen.getByLabelText('Confirm Password'), 'differentPassword');
    await userEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(await screen.findByText("Passwords don't match")).toBeInTheDocument();
  });

  it('calls onSuccess on successful login', async () => {
    const { onSuccess } = setup();
    const loginMock = require('../../lib/api').authApi.login;
    loginMock.mockResolvedValueOnce({ success: true, user: { email: 'user@example.com' }, token: '123' });
    await userEvent.type(screen.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await act(async () => {
      expect(onSuccess).toHaveBeenCalledWith({ email: 'user@example.com' });
    });
  });
});

