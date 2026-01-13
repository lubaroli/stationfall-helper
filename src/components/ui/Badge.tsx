import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'beginner' | 'middle' | 'high' | 'experienced' | 'human' | 'robot' | 'data' | 'human-robot';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'beginner', size = 'sm' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const variants = {
    beginner: 'bg-green-100 text-green-800',
    middle: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    experienced: 'bg-red-100 text-red-800',
    human: 'bg-blue-100 text-blue-800',
    robot: 'bg-purple-100 text-purple-800',
    data: 'bg-cyan-100 text-cyan-800',
    'human-robot': 'bg-indigo-100 text-indigo-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
