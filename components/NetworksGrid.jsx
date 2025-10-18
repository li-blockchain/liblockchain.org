export default function NetworksGrid() {
  const networks = [
    {
      name: 'Lido',
      icon: '⟠',
      color: 'from-brand-cyan-500 to-brand-cyan-600',
      description: 'Liquid Staking Protocol'
    },
    {
      name: 'Rocketpool',
      icon: '🚀',
      color: 'from-brand-purple-500 to-brand-purple-600',
      description: 'Decentralized Staking'
    },
    {
      name: 'Native Staking',
      icon: '⟠',
      color: 'from-brand-pink-500 to-brand-pink-600',
      description: 'Direct Ethereum Validators'
    },
  ];

  return (
    <div className="bg-brand-slate-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate-900 mb-4">
            Powering Ethereum Staking Protocols
          </h2>
          <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
            White label infrastructure for liquid staking and native validators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {networks.map((network, index) => (
            <div
              key={index}
              className="group relative bg-white border border-brand-slate-200 rounded-xl p-6 hover:border-brand-cyan-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className={`text-5xl mb-3 bg-gradient-to-r ${network.color} text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-300`}>
                  {network.icon}
                </div>
                <div className="text-lg font-semibold text-brand-slate-900">
                  {network.name}
                </div>
                <div className="text-sm text-brand-slate-500 mt-1">
                  {network.description}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/5 to-brand-purple-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
