import { Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './pages/Home';
import SearchResultsPage from './pages/SearchResults';
import ProfilePage from './pages/Profile';
import DashboardPage from './pages/Dashboard';
import Resources from './pages/Resources';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfessionalRegisterPage from './pages/ProfessionalRegister';
import NotFoundPage from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register/professional" element={<ProfessionalRegisterPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/profiles/:id" element={<ProfilePage />} />
        <Route path="/risorse" element={<Resources />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
