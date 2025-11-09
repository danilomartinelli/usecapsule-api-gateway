import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Routes from './pages/Routes'
import Services from './pages/Services'
import Plugins from './pages/Plugins'
import Analytics from './pages/Analytics'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="routes" element={<Routes />} />
          <Route path="services" element={<Services />} />
          <Route path="plugins" element={<Plugins />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
