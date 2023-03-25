import { useAbort, useToggle } from '@hooks';
import axios from 'axios';
import { ErrorCode } from '@constants/error';
import { useState } from 'react';

const useAPI = ({
  requestFn,
  config: _config = {},
  onError: _onError = () => {},
  onSuccess: _onSuccess = () => {},
} = {}) => {
  const {
    isOpen: isLoading,
    open: openLoading,
    close: closeLoading,
  } = useToggle();

  const [data, setData] = useState();
  const [error, setError] = useState();

  const abortSignal = useAbort();

  const requestDecorator = (fn) => {
    return async (
      { onError = _onError, onSuccess = _onSuccess, ...arg } = {},
      config = _config
    ) => {
      openLoading();
      try {
        const response = await fn(
          { ...arg },
          { signal: abortSignal, ...config }
        );
        onSuccess(response);
        setData(response);
      } catch (error) {
        if (!axios.isCancel(error)) {
          const errorCode =
            error?.response?.status ?? ErrorCode.SOME_THING_WENT_WRONG;
          onError(errorCode);
        }
        setError(error);
      } finally {
        closeLoading();
      }
    };
  };

  return {
    requestFn: requestDecorator(requestFn),
    isLoading,
    data,
    error,
  };
};

export default useAPI;
