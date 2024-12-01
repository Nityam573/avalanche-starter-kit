import { Bitcoin, Blocks } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl 
      bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
      dark:from-cyan-400/10 dark:to-blue-400/10 
      p-8 animate-fadeIn hover-pulse">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 animate-float">
        <Blocks className="h-48 w-48 text-cyan-500/20 dark:text-cyan-400/20" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 animate-float" 
        style={{ animationDelay: '1s' }}>
        <Bitcoin className="h-48 w-48 text-blue-500/20 dark:text-blue-400/20" />
      </div>
      <div className="relative">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white 
          bg-gradient-to-r from-cyan-500 to-blue-500 
          dark:from-cyan-400 dark:to-blue-400 text-transparent bg-clip-text">
          Welcome to 8Bit Chain Analytics
        </h2>
        <p className="max-w-2xl text-lg text-gray-700 dark:text-gray-200">
          Explore real-time blockchain metrics, network performance, and validator statistics. 
          Our advanced analytics platform provides comprehensive insights into the 8Bit ecosystem.
        </p>
      </div>
    </div>
  );
}