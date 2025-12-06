import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserStore } from './stores/userStore';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import RemindersPage from './pages/RemindersPage';
import SettingsPage from './pages/SettingsPage';
import CalendarPage from './pages/CalendarPage';
import MessagesPage from './pages/MessagesPage';
import CallPage from './pages/CallPage';
import EntertainmentPage from './pages/EntertainmentPage';
import EmergencyPage from './pages/EmergencyPage';

function App() {
  const { isLoggedIn, accessibilitySettings, updateAccessibilitySettings } = useUserStore();

  // Apply accessibility settings on app load
  useEffect(() => {
    updateAccessibilitySettings(accessibilitySettings);
  }, []);

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;