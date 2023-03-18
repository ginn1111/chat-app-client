const FriendSkeleton = ({ as = 'div' }) => {
  const Container = as;
  return (
    <Container className="block px-20 py-16 rounded-[6px] animate-pulse bg-white">
      <div className="flex items-center gap-20">
        <div className="rounded-cir w-56 h-56 flex-shrink-0 bg-slate-400" />
        <div className="flex-[3] bg-slate-400 h-20 rounded-[6px]" />
        <div className="flex-1 bg-slate-400 h-20 rounded-[6px]" />
      </div>
      <div className="h-44 mt-20 bg-slate-400 rounded-[6px]" />
    </Container>
  );
};

export default FriendSkeleton;
