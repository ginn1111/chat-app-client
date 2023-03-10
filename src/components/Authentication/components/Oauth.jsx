import clsx from 'clsx';

const Oauth = ({ icon, className, ...props }) => {
  return (
    <button
      className={clsx(
        'py-8 flex justify-center bg-gray-100 px-16 border border-transparent border-solid hover:border-gray-200 hover:brightness-90 transition-colors flex-1 rounded-sm',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};

export default Oauth;
