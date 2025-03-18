import { render, screen } from '@testing-library/react';
import BlendDetail from './index';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { GlobalStateProvider } from '../../GlobalState';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1, // Simulate blend ID 1
  }),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders blend detail page', async () => {
  mockedAxios.get.mockImplementation((url) => {
    if (url === '/api/v1/spices') {
      return Promise.resolve({
        status: 200,
        data: [
          { id: 1, name: 'Cinnamon', color: 'brown', price: '$', heat: 1 },
          { id: 2, name: 'Paprika', color: 'red', price: '$$', heat: 3 },
        ],
      });
    }

    if (url === '/api/v1/blends') {
      return Promise.resolve({
        status: 200,
        data: [
          {
            id: 1,
            name: 'Tasty Blend',
            description: 'A tasty blend of spices',
            spices: [1, 2],
            blends: [],
          },
        ],
      });
    }

    return Promise.reject(new Error('Unknown URL'));
  });

  await act(async () => {
    render(
      <GlobalStateProvider>
        <BlendDetail />
      </GlobalStateProvider>
    );
  });

  // Check that the blend name is rendered as an <h2>
  expect(screen.getByRole('heading', { name: /Tasty Blend/i, level: 2 })).toBeInTheDocument();

  // Check that the description is rendered
  expect(screen.getByText(/A tasty blend of spices/i)).toBeInTheDocument();
});
