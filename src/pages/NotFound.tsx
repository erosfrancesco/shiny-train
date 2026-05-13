import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-soft">
      <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Page not found</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900">404</h1>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist, but you can still explore the app.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
        Back to home
      </Link>
    </div>
  );
}
