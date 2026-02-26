// src/App.jsx
import { useState } from 'react'

function Card({ suit, value, isPicked, onClick }) {
  const isRed = suit === '♥' || suit === '♦'
  return (
    <div 
      onClick={onClick}
      style={{
        width: '100px', height: '140px', background: 'white',
        borderRadius: '10px', boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
        padding: '8px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', color: isRed ? '#dc2626' : '#1f2937',
        fontWeight: 'bold', userSelect: 'none',
        border: isPicked ? '3px solid #2563eb' : '1px solid #e5e7eb',
        transform: isPicked ? 'translateY(-8px)' : 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
    >
      <div>{value}{suit}</div>
      <div style={{fontSize: '2.8rem', textAlign: 'center', opacity: 0.18}}>{suit}</div>
      <div style={{textAlign: 'right'}}>{value}{suit}</div>
    </div>
  )
}

// Deck component same as previous commit...

function App() {
  const suits = ['♥','♦','♣','♠']
  const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
  const createDeck = () => 
    suits.flatMap(s => values.map(v => ({suit:s, value:v, id:`${v}-${s}-${Date.now()}-${Math.random()}`})))

  const [deck, setDeck] = useState(createDeck())
  const [hand, setHand] = useState([])
  const [pickedId, setPickedId] = useState(null)

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
    setHand([...hand, ...shuffled.slice(0,n)])
    setDeck(shuffled.slice(n))
    setPickedId(null)
  }

  const reset = () => {
    setDeck(createDeck())
    setHand([])
    setPickedId(null)
  }

  const handleCardClick = (id) => {
    if (pickedId === id) {
      setPickedId(null)
    } else if (pickedId === null) {
      setPickedId(id)
    } else {
      // swap
      const a = hand.findIndex(c => c.id === pickedId)
      const b = hand.findIndex(c => c.id === id)
      const newHand = [...hand]
      ;[newHand[a], newHand[b]] = [newHand[b], newHand[a]]
      setHand(newHand)
      setPickedId(null)
    }
  }

  const toss = () => {
    if (!pickedId) return
    setHand(hand.filter(c => c.id !== pickedId))
    setPickedId(null)
  }

  const regroup = () => {
    setHand([...hand].sort(() => Math.random() - 0.5))
    setPickedId(null)
  }

  // ... Deck component here (same as commit 5) ...

  return (
    <div style={{padding: '24px', minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <h1 style={{textAlign: 'center', color: 'white', marginBottom: '40px'}}>
        Card Deck Manipulator
      </h1>

      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <Deck count={deck.length} onClick={drawOne} />

        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', margin: '32px 0', flexWrap: 'wrap'}}>
          <button onClick={() => dealN(5)}  style={{...}}>Deal 5</button>
          <button onClick={() => dealN(7)}  style={{...}}>Deal 7</button>
          <button onClick={reset}         style={{...}}>Reset</button>
          <button onClick={toss} disabled={!pickedId} style={{background: pickedId ? '#ef4444' : '#9ca3af'}}>Toss</button>
          <button onClick={regroup}       style={{background: '#8b5cf6'}}>Regroup</button>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center',
          padding: '28px', background: 'rgba(255,255,255,0.9)', borderRadius: '16px'}}>
          {hand.length === 0 ? (
            <div style={{color: '#6b7280', padding: '60px 0'}}>No cards yet</div>
          ) : (
            hand.map(c => (
              <Card 
                key={c.id} 
                suit={c.suit} 
                value={c.value}
                isPicked={c.id === pickedId}
                onClick={() => handleCardClick(c.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App