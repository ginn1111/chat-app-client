const FriendSkeleton = ({ as = 'div' }) => {
  const Container = as;
  return (
    <Container className="block px-20 py-16 rounded animate-pulse bg-white">
      <div className="flex items-center gap-20">
        <div className="rounded-cir w-56 h-56 flex-shrink-0 bg-skeleton" />
        <div className="flex-[3] bg-skeleton h-20" />
        <div className="flex-1 bg-skeleton h-20" />
      </div>
      <div className="h-44 mt-20 bg-skeleton" />
    </Container>
  );
};

export default FriendSkeleton;
