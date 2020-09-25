import React from 'react'

const BreedCard = props => {

  const getCatsImages = () => {
    return props.cats.map(cat => <img key={cat.id} width="100" alt={cat.id} src={cat.url} />)
  }

  return (
    <div className="breed-card">
      <h2>{props.breed.name}</h2>
      {getCatsImages()}
    </div>
  )
}

export default BreedCard
