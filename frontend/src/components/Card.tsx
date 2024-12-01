import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg 
      hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 
      border border-gray-200 dark:border-gray-700 hover-pulse">
      <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
}