import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '@constants';

const useIndicator = (indicatorRef, liItemRef) => {
  const location = useLocation();
  let idxPath = NAV_ITEMS.findIndex(
    (navItem) => navItem.to === location.pathname
  );
  idxPath = idxPath === -1 ? 0 : idxPath;

  useEffect(() => {
    indicatorRef.current.style.top = liItemRef.current.offsetTop + 'px';
    indicatorRef.current.style.height = liItemRef.current.clientHeight + 'px';
  }, []);

  return idxPath;
};

export default useIndicator;
