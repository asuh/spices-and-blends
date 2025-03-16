import { render, screen } from '@testing-library/react';
import Home from './index';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

test('renders home page', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: [] })
  );
  await act(async () => {
    render(<Home />);
  });
  const homeElement = screen.getByText(/spice/i);
  expect(homeElement).toBeInTheDocument();
});
