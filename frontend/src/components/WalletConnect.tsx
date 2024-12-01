import { Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WalletConnect() {
  const [account, setAccount] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };

    checkConnection();
  }, []);

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 
        dark:from-cyan-600 dark:to-blue-600 text-white px-6 py-2 rounded-lg 
        shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 
        animate-glow disabled:opacity-75 disabled:cursor-not-allowed"
    >
      <Wallet className="w-5 h-5 animate-float" />
      {account ? (
        <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
      ) : (
        <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
      )}
    </button>
  );
}