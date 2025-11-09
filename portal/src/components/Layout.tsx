import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Route as RouteIcon,
  Server,
  Puzzle,
  BarChart3,
  Menu
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Routes', href: '/routes', icon: RouteIcon },
  { name: 'Services', href: '/services', icon: Server },
  { name: 'Plugins', href: '/plugins', icon: Puzzle },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex h-16 items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">Capsule Gateway</h1>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <header className="bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-gray-700">
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Workspace: Default</span>
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
