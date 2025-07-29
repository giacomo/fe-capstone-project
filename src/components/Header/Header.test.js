import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import Nav from '../Nav/Nav';
import { MemoryRouter } from 'react-router';


describe('Header Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render header with logo and navigation component', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const logo = screen.getByAltText('Little Lemon Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveClass('header-logo');

        const nav = screen.getByTestId('nav');
        expect(nav).toBeInTheDocument();
    });
});