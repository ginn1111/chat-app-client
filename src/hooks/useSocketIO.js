import { useCallback, useMemo } from 'react';

const useSocketIO = () => {
  const connectHandler = useCallback(
    () => socket?.on('connect', () => console.log('handshake successfully')),
    [socket],
  );

  return { getSocket, onConnect: connectHandler };
};

export default useSocketIO;
