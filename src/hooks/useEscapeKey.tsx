import { useEffect, useState } from 'react';

// This hook is used to detect when the escape key is pressed.
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
  });

  return escapePressed;
};
