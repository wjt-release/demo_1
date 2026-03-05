import { Navigate, Route, Routes } from 'react-router-dom'
import HelpPage from './pages/HelpPage'
import ScenePage from './pages/ScenePage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ScenePage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
