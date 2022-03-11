import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contents from '../Contents';

describe('Contents component', () => {
  describe('when there are no data available', () => {
    test('should render no data message', () => {
      render(<Contents data={[]} />);
      const paragraphElement = screen.getByText(/sorry, no data/i);
      expect(paragraphElement).toBeInTheDocument();
    });
  });
});
