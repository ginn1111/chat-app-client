import { shallowEqual } from 'react-redux';
import { defaultMemoize, createSelectorCreator } from 'reselect';
import rootReducer from './rootReducer';

const myCreateSelector = createSelectorCreator(defaultMemoize, shallowEqual);

/*
 * rootReducer = {user: userReducer, ...}
 * -> SliceName = {USER: 'user', ...}
 * */
export const SliceName = Object.keys(rootReducer).reduce(
  (acc, name) => ({ ...acc, [name.toUpperCase()]: name }),
  {}
);

// GLOBAL STATE FROM ROOT REDUCER
const userSelector = (state) => state.user;

export const loadingStatusGeneratorSelector = (sliceName) =>
  myCreateSelector(
    (state) => state[sliceName],
    (slice) => slice.loadingStatus
  );

// USER SLICE
export const userInformationSelector = myCreateSelector(
  userSelector,
  (user) => user.information
);

export const userIdSelector = myCreateSelector(
  userInformationSelector,
  (information) => information.id
);

export const accessTokenSelector = myCreateSelector(
  userSelector,
  (user) => user.accessToken
);

export const friendListSelector = myCreateSelector(
  userSelector,
  (user) => user.information.friendList
);

export const friendRequestSelector = myCreateSelector(
  userSelector,
  (user) => user.information.friendRequest
);

export const friendResponseSelector = myCreateSelector(
  userSelector,
  (user) => user.information.friendResponse
);
