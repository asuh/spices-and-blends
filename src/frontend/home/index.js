import './index.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [spices, setSpices] = useState([]);
  const [blends, setBlends] = useState([]);
  const [searchString, updateSearchString] = useState('')

  // load spices when the page loads
  useEffect(() => {
    axios.get('/api/v1/spices').then((response) => {
      setSpices(response.data);
    });
    axios.get('/api/v1/blends').then((response) => {
      setBlends(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h4>Spice List</h4>
      <div>
        <input value={searchString} onChange={(e) => {updateSearchString(e.target.value)}}/>
      </div>
      {spices.filter(spice => spice.name.toLowerCase().includes(searchString.toLowerCase())).map((spice) => (
        <div key={spice.id}>
          <Link to={`/spices/${spice.id}`}>{spice.name}</Link>
        </div>
      ))}
      <h4>Blend List</h4>
      {blends.filter(blend => blend.name.toLowerCase().includes(searchString.toLowerCase())).map((blend) => (
        <div key={blend.id}>
          <Link to={`/blends/${blend.id}`}>{blend.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
