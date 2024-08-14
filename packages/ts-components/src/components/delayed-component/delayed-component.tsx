import React, { useEffect, useState } from 'react';

export const DelayedComponent: React.FC<{
  delay: number;
  initialState: boolean;
  children: any;
}> = ({ delay, initialState, children }) => {
  const [showElement, setShowElement] = useState(initialState);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(!initialState);
    }, delay);
  }, []);
  return <>{showElement ? children : null}</>;
};
