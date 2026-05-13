import { useEffect } from 'react';
import { useToastStore } from '../store/uiStore';

export default function Toast() {
  const { message, type, visible, hideToast } = useToastStore();

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(hideToast, 3000);
    return () => window.clearTimeout(timer);
  }, [visible, hideToast]);

  if (!visible) return null;

  const statusStyles = {
    success: 'bg-teal-600',
    error: 'bg-rose-600',
    info: 'bg-blue-600'
  };

  return (
    <div className={`pointer-events-none fixed right-4 top-4 z-50 rounded-3xl px-5 py-4 text-sm font-medium text-white shadow-soft ${statusStyles[type]}`}>
      {message}
    </div>
  );
}
