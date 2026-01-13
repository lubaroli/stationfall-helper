import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function Card({ children, className = '', onClick, selected }: CardProps) {
  const baseStyles = 'bg-white rounded-xl shadow-sm border';
  const interactiveStyles = onClick
    ? 'cursor-pointer hover:shadow-md transition-shadow'
    : '';
  const selectedStyles = selected
    ? 'border-indigo-500 ring-2 ring-indigo-500'
    : 'border-gray-200';

  return (
    <div
      className={`${baseStyles} ${interactiveStyles} ${selectedStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
