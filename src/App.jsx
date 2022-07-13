import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, hasLogged } from './store/selectors';
import { getUserInformation } from './store/authen-slice';

import Layout from './components/layout/Layout';
import Authentication from './components/pages/Authentication';
import Wall from './components/pages/Wall';
import Profile from './components/pages/Profile';
import Message from './components/pages/Message';
import Search from './components/pages/Search';
import Chat from './components/message/chat/Chat';

function App() {
  const token = useSelector(getToken);
  const isLogged = useSelector(hasLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogged) dispatch(getUserInformation());
  }, [isLogged, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to={'/profile'} /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/wall/:id"
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
        <Route
          path="/auth"
          element={!token ? <Authentication /> : <Navigate to="/wall/me" />}
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Layout>
  );
}

export default App;
