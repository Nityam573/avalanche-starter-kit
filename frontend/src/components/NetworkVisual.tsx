import { stats } from './BlockchainInfo';

export function NetworkVisual() {
  return (
    <div className="relative h-48 mb-12 overflow-hidden rounded-2xl 
      bg-gradient-to-r from-cyan-500 to-blue-500 
      dark:from-cyan-600 dark:to-blue-600 
      p-8 animate-glow hover-pulse">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(50%)'
        }}></div>
      </div>
      <div className="relative z-10 flex h-full flex-col justify-center">
        <h3 className="text-2xl font-bold text-white mb-2 animate-fadeIn">
          Decentralized Network
        </h3>
        <p className="text-white/90 animate-slideIn" style={{ animationDelay: '0.2s' }}>
          Powered by {stats.validators} validators across the globe, ensuring network security and reliability
        </p>
      </div>
    </div>
  );
}