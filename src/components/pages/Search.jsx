import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { search } from '../../store/search-slice';
import Avatar from '../../assets/img/avatar2.jpeg';
import { getSearchUsers } from '../../store/selectors';

const Search = () => {
  const { state: name } = useLocation();
  const dispatch = useDispatch();
  const users = useSelector(getSearchUsers);

  useEffect(() => {
    const timerId = setTimeout(() => {
      name?.trim().length !== 0 && dispatch(search(name));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [name]);

  return (
    <div className="format-page-size mt-2">
      <ul className="w-full h-max max-h-[80vh] row-span-1 grid grid-cols-5 gap-1 overflow-y-auto overflow-x-hidden px-2 py-1 ">
        {users?.map((user) => {
          return (
            <li
              key={user._id}
              className=" flex h-full py-2 px-2 bg-white shadow-md rounded-md item-hovered "
            >
              <Link
                to={`/wall/${user._id}`}
                className="inline-block text-primary"
              >
                <div className="flex gap-x-2 items-center">
                  <img
                    className="h-8 w-8 rounded-full object-center"
                    src={Avatar}
                    alt="avatar-search"
                  />
                  <span className="font-[500]">{`${user.firstName} ${user.lastName}`}</span>
                </div>
                <span className="ellipsis mt-2">{user.biography}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
