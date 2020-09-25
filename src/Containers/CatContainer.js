import React from 'react'

class CatContainer extends React.Component {

  componentDidMount(){
    let token = localStorage.getItem("token")
    fetch("http://localhost:3000/cats", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      }}
    )
    .then(r => r.json())
    .then(console.log)
  }


  render() {
    return <div>CatContainer</div>
  }
}

export default CatContainer
