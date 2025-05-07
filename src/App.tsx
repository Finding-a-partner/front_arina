import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/UserPage';
import ProtectedRoute from './components/ProtectedRoute';
import EventsPage from './pages/EventsPage';
import FriendsPage from './pages/FriendsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/login" element={
          // <ProtectedRoute>
          //   <ProfilePage />
          // </ProtectedRoute>
          <LoginPage/>
        } />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
      </Routes>
    </Router>
  );
}

export default App;