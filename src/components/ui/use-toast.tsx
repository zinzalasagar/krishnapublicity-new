// src/components/ui/use-toast.tsx
import { createContext, useCallback, useContext, ReactNode } from "react";

interface ToastContextType {
  toast: (message: { title: string; description: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useCallback(
    ({ title, description }: { title: string; description: string }) => {
      alert(`${title}: ${description}`); // Replace with actual toast logic if using a library
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
