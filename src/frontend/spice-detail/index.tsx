import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Spice } from '@/types'

interface SpiceDetailProps {
  spice?: Spice;
}

interface RouteParams {
  id: string
}

const SpiceDetails: React.FC<SpiceDetailProps> = ({ spice }) => {
  if (!spice) return null;

  return (
    <ul>
      <li>Spice Color: {spice.color}</li>
      <li>Spice Cost: {spice.price}</li>
      <li>Spice Heat: {spice.heat}</li>
    </ul>
  )
}

const SpiceDetail: React.FC<SpiceDetailProps> = ({ spice: spiceProp }) => {
  const { id } = useParams<RouteParams>();
  const [spice, setSpice] = useState<Spice | null>(spiceProp || null);
  const [loading, setLoading] = useState<boolean>(!spiceProp);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!spiceProp) {
      const controller = new AbortController();
      const fetchSpice = async () => {
        setLoading(true);
        setError('');
        try {
          const { data } = await axios.get<Spice>(`/api/v1/spices/${id}`, {
            signal: controller.signal,
          });
          setSpice(data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              console.log('Fetch aborted');
            } else {
              console.error('Error fetching spice:', error.message);
              setError('Failed to load spice details. Please try again.');
            }
          } else {
            console.error('Unknown error:', error);
            setError('An unknown error occurred.');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchSpice();

      return () => controller.abort();
    }
  }, [id, spiceProp]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!spice) {
    return <div>Spice not found</div>
  }

  return (
    <>
      <h2>{spice.name}</h2>
      <SpiceDetails spice={spice} />
    </>
  )
}

export default SpiceDetail