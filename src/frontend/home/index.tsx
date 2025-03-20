import './index.css';
import { useState } from 'react';
import { useGlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';

function Home() {
  const { spices, blends } = useGlobalState();
  const [searchString, updateSearchString] = useState('')

  const filteredSpices = spices.filter((spice) =>
    spice.name.toLowerCase().includes(searchString.toLowerCase())
  );
  
  const filteredBlends = blends.filter((blend) =>
    blend.name.toLowerCase().includes(searchString.toLowerCase())
  );

  return (
    <main className="main" id="main">
      <h1>Home</h1>
      <search className="form-control">
        <label htmlFor="search">Search for spices</label>
        <input 
          placeholder="Search spices and blends..."
          id="search"
          type="search"
          value={searchString}
          onChange={(e) => {updateSearchString(e.target.value)}}
        />
      </search>
      <article aria-live="polite">
        {filteredSpices.length > 0 && (
          <section className="spice-list">
            <h2>Spice List</h2>
            <ul className="spice-list">
              {spices
                .filter(spice => 
                  spice.name.toLowerCase().includes(searchString.toLowerCase())
                )
                .map((spice) => (
                <li key={spice.id} className="spice">
                  <Link to={`/spices/${spice.id}`}>{spice.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {filteredBlends.length > 0 && (
          <section className="blend-list">
            <h2>Blend List</h2>
            <ul>
              {blends
                .filter(blend => 
                  blend.name.toLowerCase().includes(searchString.toLowerCase())
                )
                .map((blend) => (
                <li key={blend.id} className="blend">
                  <Link to={`/blends/${blend.id}`}>{blend.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}

export default Home;
