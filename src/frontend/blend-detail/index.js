// get blend API is at /api/v1/blends/:id
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../../GlobalState';

const BlendDetail = () => {
  const { id } = useParams(); // blend ID from the URL
  const { spices, blends } = useGlobalState();

  const blend = blends.find(blend => blend.id === id);

  if (!blend) {
    return <div>Blend not found</div>;
  }

  /* TODO: debug the data types and write some type checks somewhere in app */
  const spicesList = blend.spices.map((spiceId) => {
    const spice = spices.find(spice => Number(spice.id) === Number(spiceId));
    return spice || { id: spiceId, name: `Unknown Spice (ID: ${spiceId})` };
  });
  
  return (
    <div>
      <h2>{blend.name}</h2>
      <h3>{blend.description}</h3>
      <h4>Included Spices:</h4>
      <ul>
        {spicesList.map((spice) => (
          <li key={spice.id}>
            {spice.name}
            {spice.price && <span> ({spice.price})</span>}
            {spice.heat && <span> ({spice.heat})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlendDetail;
