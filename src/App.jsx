import { useState } from 'react';

function Card({ suit, value, isPicked, onClick }) {
  const isRed = suit === '♥' || suit === '♦';
  
  return (
    <div 
      className={`card ${isRed ? 'red' : 'black'} ${isPicked ? 'picked' : ''}`}
      onClick={onClick}
      style={{
        width: '100px',
        height: '140px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        margin: '8px',
        border: isPicked ? '3px solid #2563eb' : '1px solid #e5e7eb',
        transform: isPicked ? 'translateY(-6px)' : 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: '700',
        lineHeight: '1',
        color: isRed ? '#dc2626' : '#1f2937',
      }}>
        <div style={{ fontSize: '18px' }}>{value}</div>
        <div style={{ fontSize: '16px', marginTop: '2px' }}>{suit}</div>
      </div>
      
      <div style={{
        fontSize: '48px',
        opacity: '0.2',
        color: isRed ? '#dc2626' : '#1f2937',
      }}>
        {suit}
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: '700',
        lineHeight: '1',
        transform: 'rotate(180deg)',
        color: isRed ? '#dc2626' : '#1f2937',
      }}>
        <div style={{ fontSize: '18px' }}>{value}</div>
        <div style={{ fontSize: '16px', marginTop: '2px' }}>{suit}</div>
      </div>
    </div>
  );
}

// Deck Component
function Deck({ hasCards, onDeckClick, remainingCount }) {
  return (
    <div 
      className={`deck ${hasCards ? 'clickable' : 'empty'}`}
      onClick={hasCards ? onDeckClick : undefined}
      style={{
        width: '120px',
        height: '160px',
        borderRadius: '8px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px auto',
        cursor: hasCards ? 'pointer' : 'default',
        background: hasCards ? 'transparent' : '#f3f4f6',
        border: hasCards ? 'none' : '2px dashed #9ca3af',
      }}
    >
      {hasCards ? (
        <>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '80%',
              height: '80%',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
            }}></div>
          </div>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            borderRadius: '8px',
            transform: 'translate(-2px, -2px)',
            opacity: '0.8',
            zIndex: -1,
          }}></div>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            borderRadius: '8px',
            transform: 'translate(-4px, -4px)',
            opacity: '0.6',
            zIndex: -2,
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            background: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
            {remainingCount} cards
          </div>
        </>
      ) : (
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#6b7280',
          textAlign: 'center',
          padding: '20px',
          lineHeight: '1.4',
        }}>
          no cards remaining
        </div>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  // Initialize a standard 52-card deck
  const createDeck = () => {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value, id: `${value}-${suit}-${Date.now()}-${Math.random()}` });
      }
    }
    
    return deck;
  };

  const [availableDeck, setAvailableDeck] = useState(createDeck());
  const [selectedCards, setSelectedCards] = useState([]);
  const [pickedCardId, setPickedCardId] = useState(null);

  // Draw a random card from the deck
  const drawCard = () => {
    if (availableDeck.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * availableDeck.length);
    const drawnCard = availableDeck[randomIndex];
    
    setAvailableDeck(availableDeck.filter((_, index) => index !== randomIndex));
    setSelectedCards([...selectedCards, drawnCard]);
  };

  // Deal a specific number of cards
  const dealCards = (count) => {
    const newDeck = [...availableDeck, ...selectedCards];
    const shuffled = [...newDeck].sort(() => Math.random() - 0.5);
    const dealt = shuffled.slice(0, count);
    const remaining = shuffled.slice(count);
    
    setAvailableDeck(remaining);
    setSelectedCards(dealt);
    setPickedCardId(null);
  };

  // Reset all cards back to deck
  const resetCards = () => {
    setAvailableDeck(createDeck());
    setSelectedCards([]);
    setPickedCardId(null);
  };

  // Handle card click - either pick or swap
  const handleCardClick = (cardId) => {
    if (pickedCardId === cardId) {
      setPickedCardId(null);
    } else if (pickedCardId === null) {
      setPickedCardId(cardId);
    } else {
      const pickedIndex = selectedCards.findIndex(card => card.id === pickedCardId);
      const clickedIndex = selectedCards.findIndex(card => card.id === cardId);
      
      const newCards = [...selectedCards];
      [newCards[pickedIndex], newCards[clickedIndex]] = [newCards[clickedIndex], newCards[pickedIndex]];
      
      setSelectedCards(newCards);
      setPickedCardId(null);
    }
  };

  // Toss the picked card
  const tossCard = () => {
    if (pickedCardId === null) return;
    
    setSelectedCards(selectedCards.filter(card => card.id !== pickedCardId));
    setPickedCardId(null);
  };

  // Regroup (shuffle) selected cards
  const regroupCards = () => {
    const shuffled = [...selectedCards].sort(() => Math.random() - 0.5);
    setSelectedCards(shuffled);
    setPickedCardId(null);
  };

  // Create a wildcard
  const createWildcard = () => {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    
    const wildcard = {
      suit: randomSuit,
      value: randomValue,
      id: `wildcard-${Date.now()}-${Math.random()}`
    };
    
    setSelectedCards([...selectedCards, wildcard]);
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'white',
  };

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <h1 style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '2.5rem',
        marginBottom: '30px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
      }}>
        Card Deck Manipulator
      </h1>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}>
        <Deck 
          hasCards={availableDeck.length > 0} 
          onDeckClick={drawCard}
          remainingCount={availableDeck.length}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '30px',
          padding: '20px',
          background: '#f9fafb',
          borderRadius: '12px',
        }}>
          <button 
            onClick={() => dealCards(5)} 
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            }}
          >
            Deal 5
          </button>
          <button 
            onClick={() => dealCards(7)} 
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            }}
          >
            Deal 7
          </button>
          <button 
            onClick={resetCards} 
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            }}
          >
            Reset
          </button>
          <button 
            onClick={tossCard} 
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              opacity: pickedCardId === null ? 0.5 : 1,
              cursor: pickedCardId === null ? 'not-allowed' : 'pointer',
            }}
            disabled={pickedCardId === null}
          >
            Toss
          </button>
          <button 
            onClick={createWildcard} 
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            }}
          >
            Wildcard
          </button>
          <button 
            onClick={regroupCards} 
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            }}
          >
            Regroup
          </button>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '4px',
          minHeight: '160px',
          padding: '20px',
          background: '#f3f4f6',
          borderRadius: '12px',
          border: '2px dashed #d1d5db',
        }}>
          {selectedCards.length === 0 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              color: '#9ca3af',
              fontSize: '18px',
              fontWeight: '500',
            }}>
              No cards selected
            </div>
          ) : (
            selectedCards.map(card => (
              <Card
                key={card.id}
                suit={card.suit}
                value={card.value}
                isPicked={card.id === pickedCardId}
                onClick={() => handleCardClick(card.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
