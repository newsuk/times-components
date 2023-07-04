import React, { useEffect } from 'react';

export const DelayedExit: React.FC<{ delay: number, initialState: boolean, children: any}> = ({ delay, initialState, children }) => {
  const [showElement, setShowElement] = React.useState(initialState)

  useEffect(()=>{
    setTimeout(function() {
      setShowElement(false)
         }, delay);
       },
   [])
   return (
    <>
    { showElement ? (
      children
    ) : null}
    </>
   )
}