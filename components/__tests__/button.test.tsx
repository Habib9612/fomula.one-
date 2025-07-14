import { renderWithProviders } from '../../test/testUtils';
import { Button } from '../ui/button';

it('Button component matches the snapshot', () => {
  const { asFragment } = renderWithProviders(
    <Button>Click Me</Button>
  );
  expect(asFragment()).toMatchSnapshot();
});

