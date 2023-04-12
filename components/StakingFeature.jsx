import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Only 8ETH to start',
    description:
      'Leveraging the Rocketpool protocol you can start staking with as little as 8ETH.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Non-Custodial',
    description:
      'We do not have access to your funds. You are in full control at all times.',
    icon: LockClosedIcon,
  },
  {
    name: 'Personalized Support',
    description:
      'We are a team with years of experience in the Ethereum ecosystem. We are here to help you get the most out of your Ethereum.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Cloud / Location Agnostic',
    description:
      'We can help you run your node from anywhere in the world. We can also help you run your node in the cloud.',
    icon: FingerPrintIcon,
  },
]

export default function StakingFeature() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Optmized Rewards</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We guide and support you to get the most out of your Ethereum
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Help secure the network while earning passive income. We can help you do this without the need to rely on third-party services.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
