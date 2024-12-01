import { Activity, Clock, Database, Server, Shield, Zap } from 'lucide-react';
import { Card } from './Card';
import { StatCard } from './StatCard';
import { useEffect, useState } from 'react';

export const chainData = {
  name: "8Bit Chain",
  chainId: "8bit-1",
  rpcEndpoint: "https://rpc.8bitchain.network",
  token: {
    name: "8BIT",
    symbol: "EBIT"
  }
};

export const stats = {
  successfulTx: 1234567,
  failedTx: 2345,
  avgTps: 789,
  runningTime: "234 days",
  validators: 100
};

export function BlockchainInfo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Blockchain", value: chainData.name },
          { title: "Chain ID", value: chainData.chainId },
          { title: "RPC Endpoint", value: chainData.rpcEndpoint },
          { title: "Token", value: `${chainData.token.name} (${chainData.token.symbol})` }
        ].map((item, index) => (
          <div 
            key={index} 
            className="animate-slideIn" 
            style={{ 
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animation: `slideIn 0.5s ease-out ${index * 0.1}s forwards`
            }}
          >
            <Card title={item.title}>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.value}</p>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[
          {
            label: "Successful Transactions",
            value: stats.successfulTx.toLocaleString(),
            icon: <Activity className="w-6 h-6" />
          },
          {
            label: "Failed Transactions",
            value: stats.failedTx.toLocaleString(),
            icon: <Shield className="w-6 h-6" />
          },
          {
            label: "Average TPS",
            value: stats.avgTps,
            icon: <Zap className="w-6 h-6" />
          },
          {
            label: "Running Time",
            value: stats.runningTime,
            icon: <Clock className="w-6 h-6" />
          },
          {
            label: "Active Validators",
            value: stats.validators,
            icon: <Server className="w-6 h-6" />
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="animate-slideIn"
            style={{
              animationDelay: `${(index + 4) * 0.1}s`,
              opacity: 0,
              animation: `slideIn 0.5s ease-out ${(index + 4) * 0.1}s forwards`
            }}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}