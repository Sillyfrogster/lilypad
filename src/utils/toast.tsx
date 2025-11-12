
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

/**
 * Minimal toast system with context. Call `useToast().show('message')`
 * to display a floating notification in the bottom-right.
 */
interface Toast {
  id: number
  message: string
}

interface ToastContextValue {
  show: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((message: string) => {
    const id = Date.now()
    setToasts(t => [...t, { id, message }])
    // Auto-remove
    setTimeout(() => {
      setToasts(t => t.filter(x => x.id != id))
    }, 2500)
  }, [])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 space-y-2 z-50">
        {toasts.map(t => (
          <div
            key={t.id}
            className="px-4 py-3 rounded-xl glass text-thistle-200 text-sm shadow-2xl border border-thistle-300/40 animate-[slideIn_0.3s_ease]"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
