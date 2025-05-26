import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import './index.css'

function App() {
  return (
    <AppShell userType="ADMIN">
      <Dashboard />
    </AppShell>
  )
}

export default App