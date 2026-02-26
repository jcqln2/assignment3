// src/App.jsx
import { useState } from 'react'

function Card({ suit, value }) {
  const isRed = suit === '♥' || suit === '♦'
  return (
    <div style={{
      width: '100px',
      height: '140px',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: isRed ? '#dc2626' : '#1f2937',
      fontWeight: 'bold',
      userSelect: 'none'
    }}>
      <div>{value}{suit}</div>
      <div style={{fontSize: '2.8rem', textAlign: 'center', opacity: 0.18}}>
        {suit}
      </div>
      <div style={{textAlign: 'right'}}>{value}{suit}</div>
    </div>
  )
}

function App() {
  const createDeck = () => {
    const suits = ['♥','♦','♣','♠']
    const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    return suits.flatMap(s => values.map(v => ({suit: s, value: v, id: `${v}-${s}-${Math.random()}`})))
  }

  const [deck, setDeck] = useState(createDeck())
  const [hand, setHand] = useState([])

  const drawCard = () => {
    if (!deck.length) return
    const idx = Math.floor(Math.random() * deck.length)
    const card = deck[idx]
    setDeck(deck.filter((_,i) => i !== idx))
    setHand([...hand, card])
  }

  return (
    <div style={{ 
      padding: '24px', minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
        Card Deck Manipulator
      </h1>

      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        {/* Deck area */}
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <div style={{
            width: '130px', height: '170px', margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #1e40af, #60a5fa)',
            borderRadius: '14px', boxShadow: '0 6px 20px rgba(0,0,0,0.35)'
          }} />
          <div style={{color: 'white'}}>{deck.length} cards left</div>
        </div>

        <button 
          onClick={drawCard}
          disabled={!deck.length}
          style={{
            display: 'block',
            margin: '0 auto 48px',
            padding: '14px 48px',
            fontSize: '1.2rem',
            background: deck.length ? '#10b981' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: deck.length ? 'pointer' : 'not-allowed'
          }}
        >
          Draw Card
        </button>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '12px',
          justifyContent: 'center', padding: '24px',
          background: 'rgba(255,255,255,0.88)',
          borderRadius: '16px',
          minHeight: '200px'
        }}>
          {hand.length === 0 ? (
            <div style={{color: '#6b7280', fontSize: '1.2rem', padding: '60px 0'}}>
              Draw some cards...
            </div>
          ) : (
            hand.map(card => (
              <Card key={card.id} suit={card.suit} value={card.value} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App