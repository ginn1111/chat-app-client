import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WallAvatar from '../../components/wall/WallAvatar';
import Biography from '../wall/Biography';
import Friend from '../wall/Friend';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  getFriendInformation,
  getFriendStatus,
  getStatus,
} from '../../store/selectors';
import { getFriend, resetStatus } from '../../store/friend-slice';
import ProcessBar from '../ui/loading/ProcessBar';

const Wall = () => {
  const user = useSelector(getUser);
  const [
    { firstName, lastName, dob, slogan, join, friendList },
    setInformationOfWall,
  ] = useState(user);

  const friend = useSelector(getFriendInformation);
  const navigate = useNavigate();

  const status = useSelector(getFriendStatus);
  const userStatus = useSelector(getStatus);
  const { id } = useParams();
  const dispatch = useDispatch();

  const isOwn = id === user.id || id === 'me';
  const showProcessBar =
    status === 'get-friend/pending' ||
    userStatus === 'get-user/pending' ||
    status === 'send-add-friend/pending';

  const isFriend = useMemo(() => {
    return user.friendList?.some((friend) => friend._id === id);
  }, [user.friendList, id]);

  const isPending = useMemo(() => {
    return user.friendRequest?.some((friendId) => friendId === id);
  }, [user.friendRequest, id]);

  useEffect(() => {
    if (status === 'get-friend/success') {
      setInformationOfWall(friend);
      dispatch(resetStatus());
    }
    if (status === 'get-friend/failed' || status === 'get-list-friend/failed') {
      navigate(`/wall/me`);
      dispatch(resetStatus());
    }
  }, [status, friend, dispatch, navigate]);

  useEffect(() => {
    if (userStatus === 'get-user/success' && isOwn) {
      setInformationOfWall(user);
    }
  }, [userStatus, isOwn, user]);

  useEffect(() => {
    if (!isOwn) {
      dispatch(getFriend(id));
    }
  }, [id, isOwn, dispatch]);

  return (
    <>
      <ProcessBar isShow={showProcessBar} />
      <div className="format-page-size flex items-center flex-col mt-[-10px]">
        <WallAvatar
          fullName={`${firstName} ${lastName}`}
          avatar=""
          isOwn={isOwn}
          isFriend={isFriend}
          isPending={isPending}
        />
        <section className="text-slate-600 mt-[150px] flex items-start gap-x-5 w-full h-full pb-5">
          <Biography join={join} slogan={slogan} dob={dob} />
          <Friend friendList={friendList} />
        </section>
      </div>
    </>
  );
};

export default Wall;
