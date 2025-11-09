export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Monitor your API Gateway performance</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Request Volume</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder - integrate with Recharts
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Latency</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder - integrate with Recharts
          </div>
        </div>
      </div>
    </div>
  )
}
