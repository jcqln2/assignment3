import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      padding: '20px', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        Card Deck Manipulator
      </h1>
      
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
      }}>
        <p style={{ textAlign: 'center', color: '#4b5563' }}>
          Card game interface coming soon...
        </p>
      </div>
    </div>
  )
}

export default App