import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

const mockSetSelectedSidebar = jest.fn();

describe('Sidebar component', () => {
  test('should call setSelectedSidebar passed into onClick prop through handleClick on button click', () => {
    render(
      <Sidebar
        selectedItem={{ category: 'All' }}
        selectedItemTV={{ category: 'All' }}
        selectedSidebar="Home"
        setSelectedSidebar={mockSetSelectedSidebar}
        isCollapsed="false"
        isDetail="false"
        isMobile="false"
        setIsMobile={() => {}}
      />,
      { wrapper: BrowserRouter }
    );
    const linkBtnElement = screen.getByTestId('link-btn-0');
    userEvent.click(linkBtnElement);
    expect(mockSetSelectedSidebar).toHaveBeenCalled();
  });
});
