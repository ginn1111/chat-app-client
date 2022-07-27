import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const withModal = (WrappedComponent, ChildComponent) => {
  return (props) => {
    const [isShow, setIsShow] = useState(false);

    const openModalHandler = useCallback(() => {
      setIsShow(true);
    }, []);

    const closeModalHandler = useCallback(() => {
      setIsShow(false);
    }, []);

    const modal = useMemo(
      () => ({
        openModal: openModalHandler,
        closeModal: closeModalHandler,
      }),
      [openModalHandler, closeModalHandler],
    );

    return (
      <>
        {ReactDOM.createPortal(
          <>
            {/* Backdrop */}
            <AnimatePresence>
              {isShow && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2, backgroundColor: '#000000' }}
                  transition={{ duration: 0.5 }}
                  className="fixed w-screen h-screen z-[99] mt-[-70px]"
                  exit={{ opacity: 0 }}
                  onClick={closeModalHandler}
                ></motion.div>
              )}
            </AnimatePresence>
            {/* Modal */}
            <AnimatePresence>
              {isShow && (
                <motion.div
                  initial={{ y: '-100vh', x: '-50%' }}
                  whileInView={{ y: '-50%', x: '-50%' }}
                  animate={{ y: '-40%' }}
                  exit={{ y: '-100vh' }}
                  transition={{ stiffness: 200, damping: 15, type: 'spring' }}
                  className="fixed top-[50%] left-[50%] w-[50%] lg:w-[30%] xl:w-[30%] z-[100]"
                >
                  <ChildComponent onClose={closeModalHandler} />
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.getElementById('modal'),
        )}
        <WrappedComponent {...props} modal={modal} />
      </>
    );
  };
};

export default withModal;
