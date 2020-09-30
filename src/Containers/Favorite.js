import React from 'react'
import { Button } from 'reactstrap'

const Favorite = props => {

  const getAllUsers = () => {
    return props.users.map(user => {
      return (
        <li key={user.id}>
          {user.username}
          <Button color="primary" size="sm">Follow</Button>
        </li>
      )
    })
  }

  const getFollowings = () => {
    if (props.current_user.followers) {
      if (props.current_user.followers.length === 0) {
        return <p>You are not following anyone yet.</p>
      } else {
        return props.current_user.followers.map(user => {
          return (
            <li key={user.id}>
              {user.username}
            </li>
          )
        })
      }
    }
    return null
  }
  // debugger
  // console.log(typeOf props.current_user.followeds)
  const getFollowers = () => {
    if (props.current_user.followeds) {
      if (props.current_user.followeds === 0) {
        return <p>You are not followed by anyone yet.</p>
      } else {
        return props.current_user.followeds.map(user => {
          return (
            <li key={user.id}>
              {user.username}
            </li>
          )
        })
      }
    }
    return null
  }

  return (
    <>
      { Object.keys(props.current_user).length !== 0 ?
        <>
          <div>Users</div>
          <ul>{getAllUsers()}</ul>
          <div>Following</div>
          <ul>{getFollowings()}</ul>
          <div>Followers</div>
          <ul>{getFollowers()}</ul>
        </>
        :
          <h3>Please signup or login!</h3>
        }
    </>
  )
}

export default Favorite
