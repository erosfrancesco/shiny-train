import { useEffect } from 'react';
import { useToastStore } from '@store/uiStore';
import clsx from 'clsx';

export default function Toast() {
  const { message, type, visible, hideToast } = useToastStore();

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(hideToast, 3000);
    return () => window.clearTimeout(timer);
  }, [visible, hideToast]);

  if (!visible) return null;

  const statusStyles = {
    success: clsx('bg-teal-600 dark:bg-teal-700'),
    error: clsx('bg-rose-600 dark:bg-rose-700'),
    info: clsx('bg-blue-600 dark:bg-blue-700')
  };

  return (
    <div className={clsx(
      "pointer-events-none fixed right-4 top-4 z-50 rounded-3xl px-5 py-4 text-sm font-medium text-white shadow-soft",
      statusStyles[type]
    )}>
      {message}
    </div>
  );
}
