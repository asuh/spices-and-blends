import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export function GlobalStateProvider({children}) {
  const [spices, setSpices] = useState([]);
  const [blends, setBlends] = useState([]);

  return (
    <GlobalStateContext.Provider value={{spices, setSpices, blends, setBlends}}>
      {children}
    </GlobalStateContext.Provider>
  )
}

// Custom hook to use the global state
export function useGlobalState() {
  return useContext(GlobalStateContext);
}