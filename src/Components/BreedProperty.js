import React from 'react'

const BreedProperty = props => {
  const width = props.level / 5 * 100
  const propertyLabel = props.propertyName[0].toUpperCase() + props.propertyName.split('_').join(' ').slice(1)
  return (
    <div className="row">
      <div className="col-3">
        <span>{props.emoji}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;{propertyLabel}
      </div>
      <div className="col">
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{ "width": `${width}%` }} aria-valuemin="1" aria-valuemax="5">{props.level}</div>
        </div>
      </div>
    </div>
  )
}


export default BreedProperty
