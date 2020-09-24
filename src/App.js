import React from 'react'
import './App.css';

class App extends React.Component {

componentDidMount(){


  fetch('http://localhost:3000/api/v1/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: "sylviawoods",
      password: "whatscooking",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/4/49/Syvia_of_Sylvia%27s_reaturant_N.Y.C_%28cropped%29.jpg"
    }
  })
})
  .then(r => r.json())
  .then(console.log)
}

  render() {
    return <h1>App</h1>
  }
}

export default App
