import React, { useState, useEffect } from 'react'
import Card from './Card'
import './styles/App.css'
function App() {
  const [characters, setCharacters] = useState([])
  const [clicked, setClicked] = useState(new Set())
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    fetch('https://akabab.github.io/superhero-api/api/all.json')
      .then(res => res.json())
      .then(data => {
        const picks = [30, 107, 149, 157, 226, 313, 332, 346, 414, 579, 620, 659]
        const twelve = data.filter(c => picks.includes(c.id))
        setCharacters(twelve)
      })
  }, [])

  function handleCardClick(id) {
    if (clicked.has(id)) {
      // already clicked — reset
      setBestScore(prev => Math.max(prev, score))
      setScore(0)
      setClicked(new Set())
    } else {
      // new click — increment and record
      setClicked(prev => new Set([...prev, id]))
      setScore(prev => prev + 1)
    }
    // shuffle cards after every click
    setCharacters(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  return (
    <div>
      <div className="game-header">
        <h1>Hero Memory</h1>
        <p>Click each hero once — don't repeat yourself</p>
      </div>
      <div className="scoreboard">
        <div className="scoreboard-item">
          <span className="scoreboard-label">Score</span>
          <span className="scoreboard-value">{score}</span>
        </div>
        <div className="scoreboard-item">
          <span className="scoreboard-label">Best</span>
          <span className="scoreboard-value">{bestScore}</span>
        </div>
      </div>
      <div className="card-grid">
        {characters.map(character => (
          <Card key={character.id} character={character} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  )
}
export default App