// get blend API is at /api/v1/blends/:id
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../../GlobalState';
import SpiceDetail from '../spice-detail';

interface RouteParams {
  id: string;
}

const BlendDetail = () => {
  const { id } = useParams<RouteParams>(); // blend ID from the URL
  const blendId = Number(id);
  const { spices, blends } = useGlobalState();

  const blendDetailsList = (blendId: number, visitedBlends = new Set()) => {
    // If the blend has already been visited, mark it as visited
    if (visitedBlends.has(blendId)) return null;
    visitedBlends.add(blendId);

    // Find the blend by ID
    const blend = blends.find(blend => Number(blend.id) === Number(blendId));
    if (!blend) return null;

    /* TODO: debug the data types and write some type checks somewhere in app */
    // Get the spices for the blend
    const spicesList = blend.spices.map((spiceId) => {
      const spice = spices.find(spice => Number(spice.id) === Number(spiceId));
      return spice || { id: spiceId, name: `Unknown Spice (ID: ${spiceId})` };
    });

    // Recursive call to get child blends
    const childBlendsList = blend.blends
      .map((childBlendId) => blendDetailsList(childBlendId, visitedBlends))
      .filter(childBlend => childBlend !== null);

    return (
      <div key={blend.id} style={{ marginLeft: '20px' }}>
        <h2>{blend.name}</h2>
        <h3>{blend.description}</h3>
        <h4>Included Spices:</h4>
        <ul>
          {spicesList.map((spice) => (
            <li key={spice.id}>
              <SpiceDetail spice={spice} />
            </li>
          ))}
        </ul>
        {childBlendsList.length > 0 && (
          <>
            <h4>Child Blends:</h4>
            {childBlendsList}
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <h1>Blend Details</h1>
      {blendDetailsList(blendId)}
    </>
  );
};

export default BlendDetail;
