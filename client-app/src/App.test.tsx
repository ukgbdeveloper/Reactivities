import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Simple Header/i);
  expect(linkElement).toBeInTheDocument();
});

test('header div with content is present', () => {
  render(<App />);
  const headerDiv = screen.getAllByRole('header');
  expect(headerDiv).toHaveLength(1);
});
