import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const createDeck = () => {
    const suits = ['♥','♦','♣','♠']
    const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    return suits.flatMap(suit => values.map(val => ({suit, value: val})))
  }

  const [deck, setDeck] = useState(createDeck())
  const [drawn, setDrawn] = useState([])

  const drawCard = () => {
    if (deck.length === 0) return
    const idx = Math.floor(Math.random() * deck.length)
    const [card] = deck.splice(idx, 1)
    setDrawn([...drawn, card])
    setDeck([...deck])
  }

  return (
    <div style={{ 
      padding: '20px', minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '32px' }}>
        Card Deck Manipulator
      </h1>

      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        {/* Deck */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '120px', height: '168px', margin: '0 auto',
            background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
            borderRadius: '12px', boxShadow: '0 6px 16px rgba(0,0,0,0.4)'
          }} />
          <div style={{color: 'white', marginTop: '12px'}}>
            {deck.length} cards
          </div>
        </div>

        <button 
          onClick={drawCard}
          disabled={deck.length === 0}
          style={{
            display: 'block',
            margin: '0 auto 40px',
            padding: '14px 40px',
            fontSize: '1.15rem',
            background: deck.length ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: deck.length ? 'pointer' : 'not-allowed'
          }}
        >
          Draw Card
        </button>

        {/* Drawn cards */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          minHeight: '180px',
          padding: '20px',
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '16px'
        }}>
          {drawn.length === 0 ? (
            <div style={{color: '#6b7280', padding: '40px 0'}}>
              No cards drawn yet
            </div>
          ) : (
            drawn.map((card, i) => (
              <div key={i} style={{
                width: '90px',
                height: '130px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '8px',
                color: ['♥','♦'].includes(card.suit) ? '#dc2626' : '#111827'
              }}>
                <div>{card.value}{card.suit}</div>
                <div style={{fontSize: '2.4rem', textAlign: 'center', opacity: 0.15}}>
                  {card.suit}
                </div>
                <div style={{textAlign: 'right'}}>{card.value}{card.suit}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App