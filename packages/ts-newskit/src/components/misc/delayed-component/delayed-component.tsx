import React, { useEffect, useState } from 'react';

export const DelayedComponent: React.FC<{
  delay: number;
  initialState: boolean;
  children: any;
  setUpdate: (arg0: boolean) => void;
}> = ({ delay, initialState, children, setUpdate }) => {
  const [showElement, setShowElement] = useState(initialState);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(!initialState);
      setUpdate(false);
    }, delay);
  }, []);
  return <>{showElement ? children : null}</>;
};
