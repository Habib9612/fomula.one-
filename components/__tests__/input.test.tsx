import { renderWithProviders, userEvent, screen } from '../../test/testUtils';
import { Input } from '../ui/input';

describe('Input component', () => {
  it('renders input with placeholder', () => {
    renderWithProviders(
      <Input placeholder="Enter text" />
    );
    
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    renderWithProviders(
      <Input placeholder="Enter text" />
    );
    
    const input = screen.getByPlaceholderText('Enter text');
    await userEvent.type(input, 'Hello World');
    
    expect(input).toHaveValue('Hello World');
  });

  it('can be disabled', () => {
    renderWithProviders(
      <Input placeholder="Enter text" disabled />
    );
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeDisabled();
  });

  it('Input component matches snapshot', () => {
    const { asFragment } = renderWithProviders(
      <Input placeholder="Enter text" />
    );
    
    expect(asFragment()).toMatchSnapshot();
  });
});
