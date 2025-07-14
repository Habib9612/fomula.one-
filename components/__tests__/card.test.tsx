import { renderWithProviders } from '../../test/testUtils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

describe('Card component', () => {
  it('renders card with header and content', () => {
    const { container } = renderWithProviders(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );
    
    expect(container.querySelector('.rounded-lg')).toBeInTheDocument();
    expect(container).toHaveTextContent('Test Card');
    expect(container).toHaveTextContent('Test content');
  });

  it('Card component matches snapshot', () => {
    const { asFragment } = renderWithProviders(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );
    
    expect(asFragment()).toMatchSnapshot();
  });
});
