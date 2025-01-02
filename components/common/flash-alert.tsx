"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

import { Alert } from "@nextui-org/react";

type ColorType =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

type VariantType = "flat" | "solid" | "faded" | "bordered";

interface AlertItem {
  id: string;
  title: string;
  description: string;
  color: ColorType;
  variant: VariantType;
  duration: number;
  isLeaving?: boolean;
  isEntering?: boolean;
}

interface AlertContextType {
  showAlert: (params: {
    title: string;
    description?: string;
    color?: ColorType;
    variant?: VariantType;
    duration?: number;
  }) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Provider Component
export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const showAlert = useCallback(
    ({
      title,
      description = "",
      color = "default",
      variant = "flat",
      duration = 3000,
    }: {
      title: string;
      description?: string;
      color?: ColorType;
      variant?: VariantType;
      duration?: number;
    }) => {
      const id = Math.random().toString(36).substring(2, 11);
      setAlerts((prev) => [
        {
          id,
          title,
          description,
          color,
          variant,
          duration,
          isEntering: true,
          isLeaving: false,
        },
        ...prev,
      ]);

      // Remove entering state after animation
      setTimeout(() => {
        setAlerts((prev) =>
          prev.map((alert) =>
            alert.id === id ? { ...alert, isEntering: false } : alert
          )
        );
      }, 15);
    },
    []
  );

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => {
      const alertToUpdate = prev.find((alert) => alert.id === id);
      if (!alertToUpdate) return prev;

      return prev.map((alert) =>
        alert.id === id ? { ...alert, isLeaving: true } : alert
      );
    });

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 500);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 min-w-[320px] max-w-[90vw]">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`
            transform transition-all duration-500 ease-in-out
            ${
              alert.isLeaving
                ? "opacity-0 -translate-y-3"
                : alert.isEntering
                ? "opacity-0 -translate-y-3"
                : "opacity-100 translate-y-0"
            }
          `}
          >
            <AlertContent alert={alert} onRemove={removeAlert} />
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

// Alert Content Component
const AlertContent: React.FC<{
  alert: AlertItem;
  onRemove: (id: string) => void;
}> = ({ alert, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(alert.id);
    }, alert.duration);

    return () => clearTimeout(timer);
  }, [alert.duration, alert.id, onRemove]);

  return (
    <Alert
      color={alert.color}
      onClose={() => onRemove(alert.id)}
      title={alert.title}
      description={alert.description}
      variant={alert.variant}
    />
  );
};

// Custom Hook
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
