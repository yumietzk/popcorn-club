import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reviews from '../Reviews';

describe('Reviews component', () => {
  describe('when there are no data available', () => {
    test('should render no data message', () => {
      render(<Reviews data={[]} />);
      const paragraphElement = screen.getByText(/Sorry, no reviews/i);
      expect(paragraphElement).toBeInTheDocument();
    });
  });
});
