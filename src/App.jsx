import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Authentication from './components/pages/Authentication';
import Wall from './components/pages/Wall';
import Profile from './components/pages/Profile';
import Message from './components/pages/Message';
import Search from './components/pages/Search';
import Chat from './components/message/chat/Chat';
import RequireAuth from './components/authentication/RequireAuth';
import Persist from './components/authentication/Persist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="auth" element={<Authentication />} />

        {/* <Route element={<Persist />}> */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Navigate to="/wall/me" />} />
          <Route path="wall/:id" element={<Wall />} />
          <Route path="profile" element={<Profile />} />
          <Route path="message/" element={<Message />}>
            <Route path=":id" element={<Chat />} />
          </Route>
          <Route path="search" element={<Search />} />
        </Route>
        {/* </Route> */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Route>
    </Routes>
  );
}

export default App;
