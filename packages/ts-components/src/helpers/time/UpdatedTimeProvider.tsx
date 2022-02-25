import React, { createContext, useContext } from 'react';

const UpdatedTimeProviderContext = createContext<string | undefined>(undefined);

export const UpdatedTimeProvider: React.FC<{
    updatedTime: string;
}> = ({
    updatedTime,
    children
}) => {

  return (
    <UpdatedTimeProviderContext.Provider value={updatedTime}>
      {children}
    </UpdatedTimeProviderContext.Provider>
  );
};

export const useUpdatedTime = () => {
  const context = useContext(UpdatedTimeProviderContext);

  if (context === undefined) {
    throw new Error('must be used within a UpdatedTimeProvider');
  }

  return context;
};