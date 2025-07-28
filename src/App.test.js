import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('react-router', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

// Mock components used in App.js
jest.mock('./components/Header/Header', () => {
  return function MockHeader() { return <header data-testid="mock-header">Header</header>; };
});

jest.mock('./components/Footer/Footer', () => {
  return function MockFooter() { return <footer data-testid="mock-footer">Footer</footer>; };
});

jest.mock('./pages/HomePage', () => {
  return function MockHomePage() { return <div data-testid="mock-homepage">Home Page</div>; };
});

jest.mock('./pages/BookingPage', () => {
  return function MockBookingPage() { return <div data-testid="mock-booking">Booking Page</div>; };
});

jest.mock('./pages/NotFoundPage', () => {
  return function MockNotFoundPage() { return <div data-testid="mock-notfound">Not Found Page</div>; };
});


test('renders app without crashing', () => {
  render(<App />);
  expect(document.body).toBeInTheDocument();
});
