import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({});

    const removeToast = useCallback((id) => {
        // Marca como saliendo para animación
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
            delete timersRef.current[id];
        }, 300); // duración de la animación de salida
    }, []);

    const addToast = useCallback((message, type = 'success', duration = 4000) => {
        // Evitar duplicados: si ya existe un toast con mismo mensaje y tipo, reinicia su timer
        setToasts(prev => {
            const existing = prev.find(t => t.message === message && t.type === type);
            if (existing) {
                // Reiniciar timer del existente
                if (timersRef.current[existing.id]) {
                    clearTimeout(timersRef.current[existing.id]);
                }
                timersRef.current[existing.id] = setTimeout(() => removeToast(existing.id), duration);
                // "Pulsar" el toast existente para feedback visual
                return prev.map(t => t.id === existing.id ? { ...t, pulse: (t.pulse || 0) + 1 } : t);
            }

            const id = Date.now() + Math.random();
            timersRef.current[id] = setTimeout(() => removeToast(id), duration);
            return [...prev, { id, message, type, exiting: false, pulse: 0 }];
        });
    }, [removeToast]);

    const success = useCallback((message) => addToast(message, 'success'), [addToast]);
    const error = useCallback((message) => addToast(message, 'error'), [addToast]);
    const info = useCallback((message) => addToast(message, 'info'), [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, success, error, info }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            min-w-[300px] max-w-[380px] px-4 py-3 rounded-lg shadow-xl
                            flex items-center gap-3 pointer-events-auto
                            ${toast.exiting ? 'animate-toast-out' : 'animate-toast-in'}
                            ${toast.type === 'success' ? 'bg-caborca-cafe text-white' : ''}
                            ${toast.type === 'error' ? 'bg-red-600 text-white' : ''}
                            ${toast.type === 'info' ? 'bg-blue-600 text-white' : ''}
                        `}
                        style={{ animationFillMode: 'forwards' }}
                    >
                        {/* Icono */}
                        {toast.type === 'success' && (
                            <svg className="w-5 h-5 flex-shrink-0 bg-white text-caborca-cafe rounded-full p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {toast.type === 'error' && (
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        {toast.type === 'info' && (
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}

                        {/* Mensaje */}
                        <p className="font-medium text-sm flex-1">{toast.message}</p>

                        {/* Botón cerrar */}
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity ml-2"
                            aria-label="Cerrar"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
