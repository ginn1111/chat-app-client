import React from 'react';
import clsx from 'clsx';

function Checkbox({
  className,
  classChecked,
  isChecked,
  bgChecked = 'bg-primary',
  ...props
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={props.value}
      className={clsx(
        'w-16 h-16 border border-solid relative rounded-sm cursor-pointer',
        className,
        {
          [`${bgChecked} border-transparent`]: props.value,
          'border-gray-200': !props.value,
        }
      )}
    >
      <input
        type="checkbox"
        className="block w-16 h-16 disabled:bg-transparent"
        {...props}
      />
      {props.value && (
        <span
          className={clsx(
            'absolute w-[6px] h-8 border-b-[3px] border-r-[3px] rotate-45 bottom-4 left-4 border-white rounded-[2px]',
            classChecked
          )}
        />
      )}
    </button>
  );
}

export default Checkbox;
