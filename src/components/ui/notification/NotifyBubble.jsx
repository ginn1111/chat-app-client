import { Transition } from '@headlessui/react';
import cx from 'clsx';

const NotifyBubble = ({ bg = 'bg-blue-300', isNotify, className }) => {
  return (
    <Transition
      show={isNotify}
      enter="transition-all duration-300"
      leave="transition-all duration-300"
      enterFrom="opacity-0 scale-0"
      enterTo="opacity-1 scale-1"
      leaveFrom="opacity-1 scale-1"
      leaveTo="opacity-0 scale-0"
      className={cx('w-12 h-12 absolute top-8 right-8 flex z-[100]', className)}
    >
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${bg}`}
      />
      <span className={`relative inline-flex rounded-full h-12 w-12 ${bg}`} />
    </Transition>
  );
};

export default NotifyBubble;
