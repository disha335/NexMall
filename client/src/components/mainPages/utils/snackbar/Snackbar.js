import React, { useEffect, useState } from 'react';
import './snackbar.css'; 

const Snackbar = ({ message, severity = 'info', isOpen, onClose }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose(); // Optional callback
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!visible) return null;

  return (
    <div className={`snackbar snackbar-${severity}`}>
      {message}
    </div>
  );
};

export default Snackbar;
