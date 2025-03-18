import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalStateContext = createContext();

/**
 * A provider for global state that fetches the list of spices and blends from the API on mount,
 * and stores them in the context.
 *
 * @param {ReactElement} children
 *
 * @returns {ReactElement}
 */
export function GlobalStateProvider({children}) {
  const [spices, setSpices] = useState([]);
  const [blends, setBlends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spicesResponse, blendsResponse] = await Promise.all([
          axios.get('/api/v1/spices'),
          axios.get('/api/v1/blends'),
        ]);
        setSpices(spicesResponse.data);
        setBlends(blendsResponse.data);
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <GlobalStateContext.Provider value={{ spices, blends, loading }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

// Custom hook to use the global state
export function useGlobalState() {
  return useContext(GlobalStateContext);
}