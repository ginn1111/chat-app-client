import { Transition } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import BoxesLoading from '../ui/loading/BoxesLoading';
import {
  persistentThunk,
  resetAction,
} from '@features/authentication/userSlice';
import { loadingStatusGeneratorSelector, SliceName } from '@app/selectors';
import { LoadingStatus } from '@features/constants';

const Persistent = () => {
  const [isPersist, setIsPersist] = useState(true);
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    loadingStatusGeneratorSelector(SliceName.USER)
  );
  const abortRef = useRef();

  const isSuccess = loadingStatus.status === LoadingStatus.FULFILLED;
  const isRejected = loadingStatus.status === LoadingStatus.REJECTED;

  useEffect(() => {
    abortRef.current = dispatch(persistentThunk());

    return () => {
      abortRef.current && abortRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (isSuccess || isRejected) {
      setIsPersist(false);
      dispatch(resetAction());
    }
  }, [isSuccess, isRejected]);

  // Reset when component unmount
  useEffect(() => () => dispatch(resetAction()), []);

  return (
    <>
      <Transition
        appear
        show={isPersist}
        enter="transition-opacity duration-300"
        leave="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-1"
        leaveFrom="opacity-1"
        leaveTo="opacity-0"
        className="h-screen flex items-center justify-center"
      >
        <BoxesLoading />
      </Transition>
      {!isPersist && <Outlet />}
    </>
  );
};

export default Persistent;
