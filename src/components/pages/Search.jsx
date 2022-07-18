import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { search } from '../../store/search-slice';
import Avatar from '../../assets/img/avatar2.jpeg';
import { getSearchUsers, hasLoading } from '../../store/selectors';
import { Skeleton } from '@mui/material';

const SkeletonSearch = () => {
  return (
    <div className="grid grid-cols-5 w-full h-max max-h-[80vh] gap-1 px-2 py-1">
      {[...Array(5)].map((_, index) => {
        return (
          <div key={index}>
            <div className=" flex h-full py-2 px-2 bg-white shadow-md rounded-md flex-col gap-y-2">
              <div className="flex gap-x-2 items-center w-full">
                <Skeleton variant="circular" width="50px" height="50px" />
                <Skeleton variant="text" height="15px" width="50%" />
              </div>
              <div>
                <Skeleton variant="text" height="15px" width="100%" />
                <Skeleton variant="text" height="15px" width="100%" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Search = () => {
  const { state: name } = useLocation();
  const dispatch = useDispatch();
  const users = useSelector(getSearchUsers);
  const isLoading = useSelector(hasLoading);

  useEffect(() => {
    const timerId = setTimeout(() => {
      name?.trim().length !== 0 && dispatch(search(name));
    }, 500);

    return () => clearTimeout(timerId);
  }, [name]);

  return (
    <div className="format-page-size mt-2">
      {isLoading && <SkeletonSearch />}
      {!isLoading && (
        <ul className="w-full h-max max-h-[80vh] row-span-1 grid grid-cols-5 gap-1 overflow-y-auto overflow-x-hidden px-2 py-1 ">
          {users?.length === 0 && (
            <span className="col-span-5 block text-center tracking-[3px] font-[500] text-slate-400">
              User not found!
            </span>
          )}
          {users?.map((user) => {
            return (
              <li key={user._id} className=" flex h-full">
                <Link
                  to={`/wall/${user._id}`}
                  className="text-primary w-full item-hovered py-2 px-2 bg-white shadow-md rounded-md item-hovered"
                >
                  <div className="flex gap-x-2 items-center">
                    <img
                      className="h-8 w-8 rounded-full object-center object-cover"
                      src={user.avatar}
                      alt="avatar-search"
                    />
                    <span className="font-[500] hover:text-white">{`${user.firstName} ${user.lastName}`}</span>
                  </div>
                  <span className="ellipsis mt-2">{user.biography}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Search;
