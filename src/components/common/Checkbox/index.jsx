import React from 'react';
import clsx from 'clsx';
import colors from '@/themes/colors';

function Checkbox({
  className,
  classChecked,
  isChecked,
  bgChecked = colors.primary,
}) {
  return (
    <button
      className={clsx(
        'w-16 h-16 border border-solid relative rounded-sm cursor-pointer',
        className,
        {
          'bg-primary': isChecked,
          'border-transparent': isChecked,
          'border-gray-200': !isChecked,
        }
      )}
    >
      <input
        type="checkbox"
        className="hidden"
      />
      {isChecked && (
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
