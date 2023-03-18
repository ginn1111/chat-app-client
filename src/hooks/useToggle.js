import { useCallback, useState } from 'react';

const useToggle = (initToggle) => {
  const [isOpen, setToggle] = useState(initToggle ?? false);

  const close = useCallback(() => {
    setToggle(false);
  });

  const toggle = useCallback(() => {
    setToggle((isOpen) => !isOpen);
  }, []);

  const open = useCallback(() => {
    setToggle(true);
  });

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useToggle;
