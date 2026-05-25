import { useEffect } from 'react';

const HiddenAdminTrigger = ({ onTrigger }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (onTrigger) onTrigger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTrigger]);

  // Behavior-only component — renders nothing
  return null;
};

export default HiddenAdminTrigger;