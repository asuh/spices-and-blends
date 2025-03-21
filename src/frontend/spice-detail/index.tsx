import { useParams } from 'react-router-dom'
import { useGlobalState } from '../../GlobalState';
import type { Spice } from '@/types'

interface RouteParams {
  id: string
}

interface SpiceDetailProps {
  spice?: Spice
}

const SpiceDetails: React.FC<{ spice: Spice }> = ({ spice }) => {
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
  const { spices, loading } = useGlobalState();

  if (loading) {
    return <div>Loading...</div>
  }

  if (spiceProp) {
    return (
      <>
        <h2>{spiceProp.name}</h2>
        <SpiceDetails spice={spiceProp} />
      </>
    );
  }

  const numericId = Number(id);
  const spice = spices.find(s => Number(s.id) === numericId);

  if (!spice) {
    return <div>Spice not found</div>;
  }

  return (
    <>
      <h2>{spice.name}</h2>
      <SpiceDetails spice={spice} />
    </>
  );
};

export default SpiceDetail