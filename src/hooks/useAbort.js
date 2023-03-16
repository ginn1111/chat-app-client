import { useRef, useEffect } from 'react';

const useAbort = () => {
  const abortControllerRef = useRef({
    controller: new AbortController(),
    isUnmounted: false,
  });

  useEffect(() => {
    return () => {
      let { current } = abortControllerRef;
      if (current.isUnmounted) {
        current.controller.abort();
      } else {
        current.isUnmounted = true;
      }
    };
  }, []);

  return abortControllerRef.current.controller.signal;
};

export default useAbort;
