import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blueglass px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-soft">
        <Outlet />
      </div>
    </div>
  );
}
