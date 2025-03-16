import { render, screen } from '@testing-library/react';
import SpiceDetail from './index';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1,
  }),
}));

jest.mock('axios');

test('renders spice detail page', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: [] })
  );

  await act(async () => {
    render(<SpiceDetail />);
  });
  const detailElement = screen.getByText(/Spice Detail Page/i);
  expect(detailElement).toBeInTheDocument();
});
