import React from 'react'

const Card = ({ character, onClick }) => {
    return (
        <div className="card" onClick={() => onClick(character.id)}>
            <img src={character.images.md} alt={character.name} />
            <p>{character.name}</p>
        </div>
    )
}

export default Card