import React from 'react'

const BreedCard = props => {

  const getCatsImages = () => {
    return props.cats.map(cat => <img key={cat.id} width="100" alt={cat.id} src={cat.url} />)
  }

  return (
    <div className="breed-card">
      <h2>{props.breed.name}</h2>
      <i>Origin: {props.breed.origin}</i>
      {getCatsImages()}
      <h4>📝Description</h4>
      <p>{props.breed.description}</p>
      <div className="details">
        <span>🧒🏻 Child friendly: {props.breed.child_friendly}</span>
        <span>🐶 Dog friendly: {props.breed.dog_friendly}</span>
        <span>⚡️ Energy level: {props.breed.energy_level}</span>
        <span>✏️ Intelligence: {props.breed.intelligence}</span>
        <span>🐑 Shedding level: {props.breed.shedding_level}</span>
        <span>🗣 Social needs: {props.breed.social_needs}</span>
        <span>🦸🏻 Stranger friendly: {props.breed.stranger_friendly}</span>
        <span>🚫 hypoallergenic: {props.breed.hypoallergenic}</span>
      </div>
    </div>
  )
}

export default BreedCard
