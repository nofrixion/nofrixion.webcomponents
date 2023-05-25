import { useEffect, useState } from 'react';

// This hook is used to detect when the escape key is pressed within a component.
// It adds a listener for the keydown event when the component is mounted,
// and removes the listener when the component is unmounted.
export const useEscapeKey = () => {
  const [escapePressed, setEscapePressed] = useState(false);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setEscapePressed(!escapePressed);
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return escapePressed;
};
