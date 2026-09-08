import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect } from 'vitest';
import Counter from './Counter';

test('increments the count when the button is clicked', async () => {
  const user = userEvent.setup();     // set up the simulated user
  render(<Counter />);

  // Before clicking: count is 0
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  // Simulate a click
  const button = screen.getByRole('button');
  await user.click(button);

  // After clicking: count is 1
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});