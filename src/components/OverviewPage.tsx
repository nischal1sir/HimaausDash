// The "home page" of the dashboard — the stat cards + charts that used to
// live directly inside App.tsx. Pulling it into its own file makes it a
// normal page that the router can send people to at "/".

import StatCard from './StatCard'
import ApplicationsChart from './charts/ApplicationsChart'
import CountryDistribution from './charts/CountryDistribution'
import StatisticsChart from './charts/StatisticsChart'
import { statCards } from '../data'

export default function OverviewPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-4 sm:space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Applications chart + Country distribution */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-[1.4fr_1fr]">
        <ApplicationsChart />
        <CountryDistribution />
      </div>

      {/* Statistics area chart */}
      <StatisticsChart />
    </div>
  )
}
