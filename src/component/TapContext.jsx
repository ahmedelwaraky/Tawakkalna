import React, { createContext, useContext, useState } from 'react';

// Create a context to manage the state of the current tab
export const TabContext = createContext();

// Custom hook to access the current tab state
// export const useTab = () => useContext(TabContext);


  




// Main component that uses the TabContext
export const TapProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("1");
  
  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabContext.Provider>
  );
};



