export function itemAnimate(i) {
  return {
    initial: { y: -15, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: i + 0.1 },
  };
}
export function slideInFromLeft() {
  return {
    initial: { x: -1000, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: {
      staggerChildren: 0.5,
      damping: 20,
      stiffness: 100,
      type: 'spring',
    },
  };
}
export function slideInFromRight() {
  return {
    initial: { x: 1000, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: {
      staggerChildren: 0.5,
      damping: 20,
      stiffness: 100,
      type: 'spring',
    },
  };
}
export function fallAnimate() {
  return {
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { stiffness: 100, type: 'spring' },
  };
}
