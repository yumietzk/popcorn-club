import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleBtn from '../ToggleBtn';

const mockSetIsToggleOpen = jest.fn();

describe('ToggleBtn component', () => {
  test('should call setIsToggleOpen passed into onClick prop on button click', () => {
    render(
      <ToggleBtn condition="true" setIsToggleOpen={mockSetIsToggleOpen} />
    );
    const btnElement = screen.getByRole('button');
    userEvent.click(btnElement);
    expect(mockSetIsToggleOpen).toHaveBeenCalled();
  });
});
