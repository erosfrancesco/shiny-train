import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail } from '@services/authService';
import { useToastStore } from '@store/uiStore';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await signUpWithEmail(email, password);
    setLoading(false);
    if (error) {
      showToast(error.message, 'error');
      return;
    }
    showToast('Account creato! Continua alla dashboard.', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="space-y-8 text-slate-900">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Registrazione cliente</p>
        <h1 className="mt-4 text-3xl font-semibold">Crea il tuo account CareLink</h1>
        <p className="mt-2 text-sm text-slate-500">Registrati per richiedere appuntamenti con professionisti sanitari affidabili.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <label className="block text-sm font-medium text-slate-700">Nome completo</label>
        <input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <label className="block text-sm font-medium text-slate-700">Città</label>
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          required
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <label className="block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <button type="submit" disabled={loading} className="w-full rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Creazione account...' : 'Crea account'}
        </button>
      </form>
      <p className="text-center text-sm text-slate-500">
        Interessato a offrire servizi? <Link to="/auth/register/professional" className="font-semibold text-brand-600 hover:text-brand-700">Registrati come professionista</Link>
      </p>
    </div>
  );
}
