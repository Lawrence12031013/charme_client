import React, { createContext, useContext, useState } from 'react';

export const TypeContext = createContext(); // 導出 MyContext

export const useMyContext = () => {
  return useContext(TypeContext);
};

export const TypeContextProvider = ({ children }) => {
  const [typeData, setTypeData] = useState('order');

  const handleChildData = (data) => {
    setTypeData(data);
  };

  const contextValue = {
    typeData,
    onDataUpdate: handleChildData,
  };

  return (
    <TypeContext.Provider value={contextValue}>
      {children}
    </TypeContext.Provider>
  );
};
