import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SpiceDetails = ({ spice }) => {
  return (
    <ul>
      <li>Spice Name: {spice.name}</li>
      <li>Spice Color: {spice.color}</li>
      <li>Spice Cost: {spice.price}</li>
      <li>Spice Heat: {spice.heat}</li>
    </ul>
  )
}

const SpiceDetail = ({ spice: spiceProp }) => {

  const { id } = useParams()
  const [spice, setSpice] = useState(spiceProp || null);
  const [loading, setLoading] = useState(!spiceProp);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!spiceProp) {
      const controller = new AbortController();
      const fetchSpice = async () => {
        setLoading(true);
        setError('');
        try {
          const { data } = await axios.get(`/api/v1/spices/${id}`, {
            signal: controller.signal,
          });
          setSpice(data);
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.error('Error fetching spice:', error);
            setError('Failed to load spice details. Please try again.');
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
      <h2>Spice Detail Page</h2>
      <SpiceDetails spice={spice} />
    </>
  )
}

export default SpiceDetail