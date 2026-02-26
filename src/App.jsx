// src/App.jsx
import { useState } from 'react'

function Card({ suit, value }) {
  const isRed = suit === '♥' || suit === '♦'
  return (
    <div style={{
      width: '100px', height: '140px', background: 'white',
      borderRadius: '10px', boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
      padding: '8px', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', color: isRed ? '#dc2626' : '#1f2937',
      fontWeight: 'bold', userSelect: 'none'
    }}>
      <div>{value}{suit}</div>
      <div style={{fontSize: '2.8rem', textAlign: 'center', opacity: 0.18}}>{suit}</div>
      <div style={{textAlign: 'right'}}>{value}{suit}</div>
    </div>
  )
}

function Deck({ count, onClick }) {
  return (
    <div 
      onClick={count > 0 ? onClick : undefined}
      style={{
        width: '130px', height: '170px', margin: '0 auto 16px',
        background: count > 0 ? 'linear-gradient(135deg, #1e40af, #60a5fa)' : '#e5e7eb',
        borderRadius: '14px', boxShadow: count > 0 ? '0 6px 20px rgba(0,0,0,0.35)' : 'none',
        cursor: count > 0 ? 'pointer' : 'default',
        position: 'relative'
      }}
    >
      {count > 0 ? (
        <div style={{position: 'absolute', bottom: '-28px', left: '50%', transform: 'translateX(-50%)',
          background: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.9rem', color: '#4b5563',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)'}}>
          {count} cards
        </div>
      ) : (
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#6b7280', fontSize: '1rem'}}>Empty</div>
      )}
    </div>
  )
}

function App() {
  const suits = ['♥','♦','♣','♠']
  const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

  const createDeck = () => 
    suits.flatMap(s => values.map(v => ({suit: s, value: v, id: `${v}-${s}-${Date.now()}-${Math.random()}`})))

  const [deck, setDeck] = useState(createDeck())
  const [hand, setHand] = useState([])

  const drawOne = () => {
    if (!deck.length) return
    const idx = Math.floor(Math.random() * deck.length)
    const card = deck[idx]
    setDeck(deck.filter((_,i)=>i!==idx))
    setHand([...hand, card])
  }

  const dealN = (n) => {
    if (deck.length < n) return
    const shuffled = [...deck].sort(() => Math.random() - 0.5)
    const dealt = shuffled.slice(0, n)
    setDeck(shuffled.slice(n))
    setHand([...hand, ...dealt])
  }

  const reset = () => {
    setDeck(createDeck())
    setHand([])
  }

  return (
    <div style={{padding: '24px', minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <h1 style={{textAlign: 'center', color: 'white', marginBottom: '40px'}}>
        Card Deck Manipulator
      </h1>

      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <Deck count={deck.length} onClick={drawOne} />

        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', margin: '32px 0', flexWrap: 'wrap'}}>
          <button onClick={() => dealN(5)}  style={{padding:'12px 28px', background:'#10b981', color:'white', border:'none', borderRadius:'10px'}}>Deal 5</button>
          <button onClick={() => dealN(7)}  style={{padding:'12px 28px', background:'#10b981', color:'white', border:'none', borderRadius:'10px'}}>Deal 7</button>
          <button onClick={reset}         style={{padding:'12px 28px', background:'#6366f1', color:'white', border:'none', borderRadius:'10px'}}>Reset</button>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center',
          padding: '28px', background: 'rgba(255,255,255,0.9)', borderRadius: '16px'}}>
          {hand.length === 0 ? (
            <div style={{color: '#6b7280', padding: '60px 0'}}>No cards yet</div>
          ) : (
            hand.map(c => <Card key={c.id} suit={c.suit} value={c.value} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default App