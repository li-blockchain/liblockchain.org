export default function StatsSection() {
  const stats = [
    {
      value: '$100M+',
      label: 'Assets Secured',
      description: 'Total value staked across networks',
      gradient: 'from-brand-cyan-500 to-brand-cyan-600'
    },
    {
      value: '99.9%',
      label: 'Uptime',
      description: 'Validator availability record',
      gradient: 'from-brand-purple-500 to-brand-purple-600'
    },
    {
      value: '2016',
      label: 'Since',
      description: 'Years of blockchain expertise',
      gradient: 'from-brand-cyan-500 to-brand-purple-600'
    }
  ];

  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate-900 mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
            Battle-tested infrastructure securing assets for institutions worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-white to-brand-slate-50 border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-lg transition-all duration-300"
            >
              <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text mb-2`}>
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-brand-slate-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-brand-slate-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
