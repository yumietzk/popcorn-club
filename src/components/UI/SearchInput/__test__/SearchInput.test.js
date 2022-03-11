import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SearchInput from '../SearchInput';

describe('SearchInput component', () => {
  test('should render input element', () => {
    render(<SearchInput />, { wrapper: BrowserRouter });
    const inputElement = screen.getByPlaceholderText(/Search.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test('should be able to type in input', () => {
    render(<SearchInput />, { wrapper: BrowserRouter });

    const inputElement = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(inputElement, { target: { value: 'Office' } });
    expect(inputElement.value).toBe('Office');
  });

  test('should have empty input when button is clicked', () => {
    render(<SearchInput />, { wrapper: BrowserRouter });

    const inputElement = screen.getByPlaceholderText(/Search.../i);
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: 'Office' } });
    fireEvent.click(buttonElement);

    expect(inputElement.value).toBe('');
  });
});
