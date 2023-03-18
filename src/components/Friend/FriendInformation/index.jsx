import { useParams } from 'react-router-dom';

const FriendInformation = () => {
  const { id: userId } = useParams();
  return <div>Friend Information {userId}</div>;
};

export default FriendInformation;
