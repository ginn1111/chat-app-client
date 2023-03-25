const ConversationSkeleton = ({ as = 'div' }) => {
  const Container = as;
  return (
    <Container className="bg-white rounded px-20 py-16">
      <div className="animate-pulse flex items-center gap-20">
        <div className="w-56 h-56 bg-skeleton rounded-cir" />
        <div className="h-24 flex-1 bg-skeleton" />
        <div className="h-24 w-32 bg-skeleton" />
      </div>
      <div className="space-y-12 mt-20 delay-300 animate-pulse">
        <div className="bg-skeleton h-24" />
        <div className="bg-skeleton h-24 w-10/12" />
      </div>
    </Container>
  );
};

export default ConversationSkeleton;
