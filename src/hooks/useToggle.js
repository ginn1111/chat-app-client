const { useState } = require('react');

const useToggle = ({ initial }) => {
  const [isOpen, setIsOpen] = useState(initial);
  return {
    isOpen,
    toggle: () => setIsOpen((isOpen) => !isOpen),
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
  };
};

export default useToggle;
