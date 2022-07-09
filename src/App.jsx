import { Link, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Authentication from './components/pages/Authentication';
import Wall from './components/pages/Wall';
import Profile from './components/pages/Profile';

function App() {
  // return <Authentication />;
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/wall/me" element={<Wall />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
