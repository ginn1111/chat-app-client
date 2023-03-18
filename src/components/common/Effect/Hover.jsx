import cx from 'clsx';

export const PrimaryHover = ({ children, className, as = 'div' }) => {
  const Container = as;
  return (
    <Container className={cx('hover:primary-hover', className)}>
      {children}
    </Container>
  );
};
