import { useState } from "react";
import { useGlobalState } from "../../GlobalState";
import type { Blend, NewBlend } from "../../types";
import axios from "axios";
import './index.css';

const AddBlendForm: React.FC = () => {
  const { setBlends } = useGlobalState();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [spiceIds, setSpiceIds] = useState<string>('');
  const [childBlendIds, setChildBlendIds] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) setError('Please enter a blend name.');

    // Parse spice IDs and child blend IDs
    const parsedSpiceIds = spiceIds
      .split(',')
      .map((id) => Number(id.trim()))
      .filter((id) => !Number.isNaN(id));
    const parsedChildBlendIds = childBlendIds
      .split(',')
      .map((id) => Number(id.trim()))
      .filter((id) => !Number.isNaN(id));
    
    const newBlend: NewBlend = {
      name,
      description,
      spices: parsedSpiceIds,
      blends: parsedChildBlendIds,
    };

    try {
      const { data } = await axios.post<Blend>('/api/v1/blends', newBlend);
      setBlends((prev) => [...prev, data]);
      setName('');
      setDescription('');
      setSpiceIds('');
      setChildBlendIds('');
      setError(null);
      setSuccess('Blend added successfully!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding blend:', error.message);
        setError(`Failed to add blend. ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        setError('An unknown error occurred.');
      }
    }
  }
  
  return (
    <main className="main">
      <h1>Add a New Blend</h1>

      <form className="add-blend-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add Blend</legend>

          <div className="form-control">
            <label htmlFor="name">Blend Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a blend name"
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description:</label>
            <textarea
              value={description}
              required
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter blend description"
            />
          </div>
          <div className="form-control">
            <label htmlFor="spices">Spices:</label>
            <input 
              type="text"
              name="spices"
              value={spiceIds}
              required
              onChange={(e) => setSpiceIds(e.target.value)}
              placeholder="e.g. 1, 2, 3"
            />
          </div>
          <div className="form-control">
            <label htmlFor="child-blends">Child Blends:</label>
            <input 
              type="text"
              name="child-blends"
              value={childBlendIds}
              required
              onChange={(e) => setChildBlendIds(e.target.value)}
              placeholder="e.g., 0, 1"
            />
          </div>
        </fieldset>
        <button type="submit">Add Blend</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </main>
  );
};

export default AddBlendForm;