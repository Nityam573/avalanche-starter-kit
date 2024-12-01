import { Database } from 'lucide-react';
import { BlockchainInfo } from './components/BlockchainInfo';
import { WalletConnect } from './components/WalletConnect';
import { Hero } from './components/Hero';
import { NetworkVisual } from './components/NetworkVisual';
import { ThemeToggle } from './components/ThemeToggle';

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 
              dark:from-cyan-400 dark:to-blue-400 text-transparent bg-clip-text">
              8Bit Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
        
        <Hero />
        <BlockchainInfo />
        <NetworkVisual />
      </div>
    </div>
  );
}

export default App;