import { useState } from 'react';

export const useRadioInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function onChangeValueHandler(event) {
    console.log(event.target.value);
    setValue(event.target.value);
  }

  return { value, onChange: onChangeValueHandler };
};

const useInput = (validateFunction) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const isValid = validateFunction?.(value) ?? true;
  const isInValid = !isValid && isFocus;

  function onChangeHandler(event) {
    setIsFocus(true);
    setValue(event.target.value);
  }

  function onBlurHandler() {
    setIsFocus(true);
  }

  function resetHandler() {
    setValue('');
  }

  return {
    state: {
      value,
      isValid,
      isInValid,
    },
    actions: {
      onChange: onChangeHandler,
      onBlur: onBlurHandler,
      reset: resetHandler,
    },
  };
};

export default useInput;
