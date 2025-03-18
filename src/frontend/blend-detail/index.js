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

  const blendDetailsList = (blendId, visitedBlends = new Set()) => {
    // If the blend has already been visited, return null
    if (visitedBlends.has(blendId)) {
      return null;
    }

    // Mark the blend as visited
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
      .filter(childBlend => childBlend !== null); // Filter out null values

    return {
      ...blend,
      spicesList,
      childBlendsList
    }
  }

  const blendDetails = blendDetailsList(id);

  const blendList = (blend) => {
    return (
      <div key={blend.id} style={{ marginLeft: '20px' }}>
        <h2>{blend.name}</h2>
        <h3>{blend.description}</h3>
        <h4>Included Spices:</h4>
        <ul>
          {blend.spicesList.map((spice) => (
            <li key={spice.id}>
              {spice.name}
              {spice.price && <span> ({spice.price})</span>}
              {spice.heat && <span> ({spice.heat})</span>}
            </li>
          ))}
        </ul>
        {blend.childBlendsList.length > 0 && (
          <>
            <h4>Child Blends:</h4>
            <ul>
              {blend.childBlendsList.map((childBlend) => (
                <li key={childBlend.id}>
                  {blendList(childBlend)}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
  
  return (
    <>
      <h1>Blend Details</h1>
      {blendDetails ? blendList(blendDetails) : <div>Blend not found</div>}
    </>
  );
};

export default BlendDetail;
