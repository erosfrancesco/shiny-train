import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Toast from '@components/Toast';
import { ThemeProvider } from '@hooks/useTheme';

export default function AppLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <Toast />
      </div>
    </ThemeProvider>
  );
}
