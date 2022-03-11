import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cast from '../Cast';

describe('Cast component', () => {
  describe('when there are no data available', () => {
    test('should render no data message', () => {
      render(<Cast data={[]} />);
      const paragraphElement = screen.getByText(/Sorry, no casts registered/i);
      expect(paragraphElement).toBeInTheDocument();
    });
  });
});
