import { renderWithProviders, screen } from '../../test/testUtils';
import { UserDashboard } from '../dashboard/user-dashboard';

describe('UserDashboard component', () = {
  const user = {
    id: 1,
    name: 'Tester',
    email: 'tester@example.com',
    avatar: '',
  };

  it('renders welcome message', () = {
    renderWithProviders(
      UserDashboard user={user} onCreateFormula={jest.fn()} /
    );
    expect(screen.getByText('Welcome back, Tester!')).toBeInTheDocument();
  });

  it('displays the number of formulas created', () = {
    renderWithProviders(
      UserDashboard user={user} onCreateFormula={jest.fn()} /
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows active formulas', () = {
    renderWithProviders(
      UserDashboard user={user} onCreateFormula={jest.fn()} /
    );
    expect(screen.getByText('Morning Energy Boost')).toBeInTheDocument();
  });
});

