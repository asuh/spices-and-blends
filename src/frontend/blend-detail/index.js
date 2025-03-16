// get blend API is at /api/v1/blends/:id
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useGlobalState } from '../../GlobalState';

const BlendDetail = () => {
  const { id } = useParams();
  const { spices: globalSpices, blends: globalBlends } = useGlobalState();
  const [blend, setBlend] = useState(null);
  const [resolvedSpices, setResolvedSpices] = useState([]);
  const [error, setError] = useState(null);

  /* load blends when the page loads */
  useEffect(() => {
    const blendFromState = globalBlends.find((blend) => blend.id === Number.parseInt(id));
    if (blendFromState) {
      setBlend(blendFromState);
    } else {
      axios.get(`/api/v1/blends/${id}`).then((response) => {
        setBlend(response.data);
      })
      .catch((error) => {
        setError(error);
      });
    }
  }, [id, globalBlends]);

  /* load spices when the page loads */
  useEffect(() => {
    if (blend?.spices.length > 0) {
      const resolved = blend.spices.map((spiceId) => {
        const spice = globalSpices.find((spice) => spice.id === spiceId);
        console.log({spice});
        return spice || { id: spiceId, name: `Unknown spice (ID: ${spiceId})` };
      });
      setResolvedSpices(resolved);
    }
  }, [blend, globalSpices]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!blend) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blend.name}</h2>
      <h3>Included Spices:</h3>
      <ul>
        {resolvedSpices.map((spice) => (
          <li key={spice.id}>
            {spice.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlendDetail;
