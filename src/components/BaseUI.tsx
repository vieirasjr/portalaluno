import React, { useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';

/**
 * Utility to merge tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- BUTTONS ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  isLoading, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  
  const variants = {
    primary: "bg-senac-orange-500 text-white hover:bg-senac-orange-600 focus:ring-senac-orange-500 px-6 py-3 shadow-md hover:shadow-lg hover:shadow-senac-orange-500/20",
    secondary: "bg-senac-blue-500 text-white hover:bg-senac-blue-600 focus:ring-senac-blue-500 px-6 py-3 shadow-md hover:shadow-lg hover:shadow-senac-blue-500/20",
    link: "bg-transparent text-senac-blue-500 hover:underline px-0 py-0",
    icon: "p-2 hover:bg-slate-100 text-slate-500 rounded-full hover:shadow-sm",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)} 
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent mr-2" aria-hidden="true" />
          <span className="sr-only">Carregando...</span>
        </>
      ) : null}
      {children}
    </button>
  );
};

// --- FORMS ---

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className, id, ...props }) => {
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <div className="w-full space-y-1">
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-senac-dark-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
            <i className={`bi bi-${icon}`}></i>
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-all focus:border-senac-blue-500 focus:ring-2 focus:ring-senac-blue-500/20 outline-none",
            icon && "pl-10",
            error && "border-senac-error focus:border-senac-error focus:ring-senac-error/20",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
      </div>
      {error && <p id={`${inputId}-error`} className="text-xs text-senac-error font-medium">{error}</p>}
    </div>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }> = ({ label, error, children, className, id, ...props }) => {
  const selectId = id || `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="w-full space-y-1">
      {label && <label htmlFor={selectId} className="block text-sm font-medium text-senac-dark-700">{label}</label>}
      <select
        id={selectId}
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-all focus:border-senac-blue-500 focus:ring-2 focus:ring-senac-blue-500/20 outline-none appearance-none",
          error && "border-senac-error focus:border-senac-error focus:ring-senac-error/20",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <p id={`${selectId}-error`} className="text-xs text-senac-error font-medium">{error}</p>}
    </div>
  );
};

// --- CARDS ---

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// --- ANIMATIONS ---

interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({ 
  value, 
  duration = 2, 
  decimals = 0, 
  suffix = "",
  className
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals).replace('.', ',') + suffix;
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration,
        ease: "easeOut"
      });
      return controls.stop;
    }
  }, [isInView, value, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
};

// --- STATUS & FEEDBACK ---

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'error' | 'warning' | 'info' }> = ({ children, variant = 'info' }) => {
  const variants = {
    success: "bg-senac-success/10 text-senac-success",
    error: "bg-senac-error/10 text-senac-error",
    warning: "bg-senac-warning/10 text-senac-warning",
    info: "bg-senac-blue-500/10 text-senac-blue-500",
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", variants[variant])}>
      {children}
    </span>
  );
};

export const Alert: React.FC<{ children: React.ReactNode; variant?: 'success' | 'error' | 'warning' | 'info' }> = ({ children, variant = 'info' }) => {
  const variants = {
    success: "bg-senac-success/10 border-senac-success text-senac-success",
    error: "bg-senac-error/10 border-senac-error text-senac-error",
    warning: "bg-senac-warning/10 border-senac-warning text-senac-warning",
    info: "bg-senac-blue-500/10 border-senac-blue-500 text-senac-blue-500",
  };

  return (
    <div className={cn("p-4 rounded-xl border flex items-center gap-3", variants[variant])}>
      <i className={cn("bi", 
        variant === 'success' && "bi-check-circle-fill",
        variant === 'error' && "bi-exclamation-octagon-fill",
        variant === 'warning' && "bi-exclamation-triangle-fill",
        variant === 'info' && "bi-info-circle-fill"
      )}></i>
      <div className="text-sm font-medium">{children}</div>
    </div>
  );
};

export const Loading: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-senac-blue-500"></div>
  </div>
);
