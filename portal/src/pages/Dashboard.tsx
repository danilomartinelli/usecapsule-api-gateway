import { Activity, Route, Server, Zap } from 'lucide-react'

const stats = [
  { name: 'Total Requests', value: '0', icon: Activity, change: '+0%' },
  { name: 'Active Routes', value: '0', icon: Route, change: '+0%' },
  { name: 'Services', value: '0', icon: Server, change: '+0%' },
  { name: 'Avg Latency', value: '0ms', icon: Zap, change: '-0%' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your API Gateway</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
              1
            </div>
            <span>Create your first service</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
              2
            </div>
            <span>Add routes to your service</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
              3
            </div>
            <span>Configure plugins for authentication and rate limiting</span>
          </div>
        </div>
      </div>
    </div>
  )
}
