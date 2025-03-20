import { createContext, useContext, useState, useEffect } from "react";
import type { GlobalState, Spice, Blend } from "./types";
import axios from "axios";

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

const GlobalStateContext = createContext<GlobalState & { setBlends: React.Dispatch<React.SetStateAction<Blend[]>> } | undefined>(undefined);

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
  const [spices, setSpices] = useState<Spice[]>([]);
  const [blends, setBlends] = useState<Blend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spicesResponse, blendsResponse] = await Promise.all([
          axios.get<Spice[]>('/api/v1/spices'),
          axios.get<Blend[]>('/api/v1/blends'),
        ]);
        setSpices(spicesResponse.data);
        setBlends(blendsResponse.data);
      } catch (error: unknown) {
        // To prevent error.message from being undefined, check if error is an instance of Error
        if (error instanceof Error) {
          console.error("Error: ", error.message);
        } else {
          console.error("Error: ", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <GlobalStateContext.Provider value={{ spices, blends, loading, setBlends }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}