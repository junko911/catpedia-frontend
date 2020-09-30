import React from 'react'
import { Button } from 'reactstrap'

const Favorite = props => {

  const getUsers = () => {
    return props.users.map(user => {
      return (
        <li key={user.id}>
          {user.username}
          <Button color="primary" size="sm">Follow</Button>
        </li>
      )
    })
  }

  return (
    <>
      <div>Favorite</div>
      <ul>{getUsers()}</ul>
    </>
  )
}

export default Favorite
