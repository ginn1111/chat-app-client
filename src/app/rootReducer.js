import userReducer from '@features/authentication/userSlice';
import friendReducer from '@features/friend/friendSlice';

const rootReducer = {
  user: userReducer,
  friend: friendReducer,
};

export default rootReducer;
