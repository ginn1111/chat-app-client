import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { refreshToken } from '../../services/authentication';
import { getLocal } from '../../services/localServices';
import { getUser } from '../../services/user';
import { convertData, setToken, setUser } from '../../store/authen-slice';
import { getToken } from '../../store/selectors';
import CircleLoading from '../ui/loading/CircleLoading';

const Persist = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = getLocal('userId');
    const verifyRefreshToken = async () => {
      try {
        const { data } = await refreshToken(userId);
        dispatch(setToken(data.accessToken));
        const { data: userData } = await getUser(userId);
        dispatch(setUser(convertData(userData)));
      } catch (error) {
        console.log('persis error', error);
      } finally {
        setIsLoading(false);
      }
    };
    !token && userId ? verifyRefreshToken() : setIsLoading(false);
  }, [dispatch, token]);

  const switchPageAnimate = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div {...switchPageAnimate}>
            <CircleLoading />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isLoading && (
          <motion.div {...switchPageAnimate}>
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Persist;
