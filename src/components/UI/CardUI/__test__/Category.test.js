import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Category from '../Category';

describe('Category component', () => {
  test('should render same text passed into category prop', () => {
    render(<Category category="Popular in Movies" />);
    const titleElement = screen.getByText(/popular in movies/i);
    expect(titleElement).toBeInTheDocument();
  });
});
