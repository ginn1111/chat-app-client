import { Transition } from '@headlessui/react';

const Fade = ({ children, ...props }) => {
  return (
    <Transition
      enter="transition-opacity duration-300"
      leave="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leaveFrom="opacity-1"
      leaveTo="opacity-0"
      show={props.show}
      {...props}
    >
      {children}
    </Transition>
  );
};

export default Fade;
