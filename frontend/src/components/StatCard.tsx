interface StatCardProps {
  label: string;
  value: string | number;
  icon: JSX.Element;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl 
      shadow-lg hover:shadow-xl transition-all duration-300 
      border border-gray-200 dark:border-gray-700 hover-pulse">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
          <p className="text-2xl font-semibold mt-1 bg-gradient-to-r from-cyan-500 to-blue-500 
            dark:from-cyan-400 dark:to-blue-400 text-transparent bg-clip-text">
            {value}
          </p>
        </div>
        <div className="text-cyan-500 dark:text-cyan-400 animate-float">{icon}</div>
      </div>
    </div>
  );
}