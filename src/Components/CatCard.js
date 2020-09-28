import React from 'react'

const CatCard = (props) => {

let breedCheck = () => {
  if (props.breeds.length === 1){
    return props.breeds[0]['name']
    }else{
      return "unknown"
    }
}

let clickHandler = () => {
  props.showModalImage(props.slide)
}

  return( 
    <>
      <img  className="cat_img" src={props.url} onClick={clickHandler}/>
      {/* <h1>Breed: {breedCheck()}</h1> */}
    </>
  )
}

export default CatCard

