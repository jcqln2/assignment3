import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [deckSize, setDeckSize] = useState(52)

  const drawCard = () => {
    if (deckSize > 0) {
      setDeckSize(prev => prev - 1)
    }
  }

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
        background: 'rgba(255,255,255,0.92)',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '120px',
            height: '160px',
            margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            Deck
          </div>
          <div>{deckSize} cards remaining</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={drawCard}
            disabled={deckSize === 0}
            style={{
              padding: '12px 32px',
              fontSize: '1.1rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Draw Card
          </button>
        </div>
      </div>
    </div>
  )
}

export default App