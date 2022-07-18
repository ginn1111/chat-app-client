import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/authen-slice';

const withUpdateUser = (WrappedComponent, fnValid) => {
  return (props) => {
    const dispatch = useDispatch();
    const [isUpdate, setIsUpdate] = useState(null);

    const childRef = useRef();

    useEffect(() => {
      childRef.current?.setDefaultValue();
    }, []);

    function resetHandler() {
      childRef.current?.setDefaultValue();
      setIsUpdate(false);
    }

    function showUpdateHandler() {
      childRef.current?.focus();
      setIsUpdate(true);
    }

    function onUpdateHandler() {
      const { userData } = childRef.current;
      const userKeys = Object.keys(userData);
      const userDataUpdate = userKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key.replace(/(Ref)/, '')]: userData[key].current.value,
        }),
        {},
      );

      if (!childRef.current?.checkValid()) {
        return;
      }
      setIsUpdate(false);
      dispatch(
        updateUser({
          ...userDataUpdate,
        }),
      );
    }

    return (
      <WrappedComponent
        {...props}
        ref={childRef}
        onUpdate={onUpdateHandler}
        isUpdate={isUpdate}
        onShowUpdate={showUpdateHandler}
        onReset={resetHandler}
      />
    );
  };
};

export default withUpdateUser;
