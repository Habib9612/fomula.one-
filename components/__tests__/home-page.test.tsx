import { renderWithProviders, screen, userEvent } from '../../test/testUtils';
import HomePage from '../../app/page';

// Mock the child components
jest.mock('../../components/animated-hero', () => ({
  AnimatedHero: () => <div data-testid="animated-hero">Animated Hero</div>,
}));

jest.mock('../../components/product-type-modal', () => ({
  ProductTypeModal: ({ isOpen, onClose, onSelect }: any) => (
    <div data-testid="product-type-modal">
      {isOpen && (
        <div>
          <button onClick={onClose}>Close</button>
          <button onClick={() => onSelect('supplement')}>Select Supplement</button>
        </div>
      )}
    </div>
  ),
}));

jest.mock('../../components/formula-builder', () => ({
  FormulaBuilder: ({ productType, onBack }: any) => (
    <div data-testid="formula-builder">
      <p>Formula Builder for {productType}</p>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

describe('HomePage component', () => {
  it('renders the main navigation and branding', () => {
    renderWithProviders(<HomePage />);
    
    expect(screen.getByText('FORMULA.ONE')).toBeInTheDocument();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders hero section with main heading', () => {
    renderWithProviders(<HomePage />);
    
    expect(screen.getByText('Your Health.')).toBeInTheDocument();
    expect(screen.getByText('Your Formula.')).toBeInTheDocument();
  });

  it('opens product type modal when Start Building button is clicked', async () => {
    renderWithProviders(<HomePage />);
    
    await userEvent.click(screen.getByText('Start Building'));
    
    expect(screen.getByTestId('product-type-modal')).toBeInTheDocument();
  });

  it('shows formula builder when product type is selected', async () => {
    renderWithProviders(<HomePage />);
    
    await userEvent.click(screen.getByText('Start Building'));
    await userEvent.click(screen.getByText('Select Supplement'));
    
    expect(screen.getByTestId('formula-builder')).toBeInTheDocument();
    expect(screen.getByText('Formula Builder for supplement')).toBeInTheDocument();
  });

  it('can go back from formula builder to homepage', async () => {
    renderWithProviders(<HomePage />);
    
    await userEvent.click(screen.getByText('Start Building'));
    await userEvent.click(screen.getByText('Select Supplement'));
    await userEvent.click(screen.getByText('Back'));
    
    expect(screen.getByText('Your Health.')).toBeInTheDocument();
    expect(screen.queryByTestId('formula-builder')).not.toBeInTheDocument();
  });

  it('renders how it works section', () => {
    renderWithProviders(<HomePage />);
    
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Choose Your Goal')).toBeInTheDocument();
    expect(screen.getByText('Customize Everything')).toBeInTheDocument();
    expect(screen.getByText('Receive & Enjoy')).toBeInTheDocument();
  });

  it('renders testimonials section', () => {
    renderWithProviders(<HomePage />);
    
    expect(screen.getByText('What Our Users Say')).toBeInTheDocument();
    expect(screen.getByText('Sarah M.')).toBeInTheDocument();
    expect(screen.getByText('Marcus K.')).toBeInTheDocument();
    expect(screen.getByText('Elena R.')).toBeInTheDocument();
  });

  it('renders footer with company links', () => {
    renderWithProviders(<HomePage />);
    
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('© 2024 FORMULA.ONE. All rights reserved.')).toBeInTheDocument();
  });
});
