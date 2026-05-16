import { Link, NavLink } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuthStore } from '@store/authStore';
import { signOut } from '@services/authService';
import { useToastStore } from '@store/uiStore';
import { HeartPulse, SearchIcon, ClipboardPlusIcon } from 'lucide-react';


const publicNavItems = [
  { label: 'Home', to: '/' },
  { label: 'Cerca', to: '/search', icon: SearchIcon },
  { label: 'Risorse', to: '/risorse', icon: ClipboardPlusIcon },
];

const privateNavItems = [{ label: 'Dashboard', to: '/dashboard' }];

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const showToast = useToastStore((state) => state.showToast);

  const roleLabel = useMemo(() => {
    if (!user) return null;
    return user.role === 'professional' ? 'Pro' : user.role === 'association' ? 'Association' : 'Client';
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      showToast('Unable to sign out', 'error');
      return;
    }
    showToast('Signed out successfully', 'success');
    window.location.href = '/auth';
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">

        <Link to="/" className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
          <HeartPulse className="h-6 w-6 text-teal-500" />
          CareLink
        </Link>

        <nav className="hidden gap-4 md:flex">
          {publicNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <div className="inline-flex items-center gap-1">
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </div>
            </NavLink>
          ))}
          {user &&
            privateNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden rounded-full bg-blueglass px-3 py-2 text-sm text-slate-700 md:inline-flex">
                {roleLabel}
              </span>
              <button onClick={handleSignOut} className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
                Sign out
              </button>
            </>
          ) : (
            <Link to="/auth" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
