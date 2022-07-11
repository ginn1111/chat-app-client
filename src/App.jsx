import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from './store/selectors';
import { setUser } from './store/authen-slice';

import Layout from './components/layout/Layout';
import Authentication from './components/pages/Authentication';
import Wall from './components/pages/Wall';
import Profile from './components/pages/Profile';
import Message from './components/pages/Message';
import Search from './components/pages/Search';
import Chat from './components/message/chat/Chat';

function App() {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
      navigate('/wall/me');
    }
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Authentication />} />
        <Route
          path="/wall/me"
          element={token ? <Wall /> : <Navigate to="/auth" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/message/"
          element={token ? <Message /> : <Navigate to="/auth" />}
        >
          <Route path=":id" element={<Chat />} />
        </Route>
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  );
}

export default App;
