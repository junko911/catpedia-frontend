import React from 'react'
import { Button } from 'reactstrap'

const RecommendedUsers = props => {

  const genUserCard = user => {
    const avatar = user.avatar ? user.avatar : "/images/cat-placeholder.png"
    return (
      <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
        <img
          src={avatar}
          alt={user.username}
          style={
            {
              borderRadius: "50%",
              width: "30px",
              height: "30px",
            }
          }
        />
        {user.username}
        {props.current_user.followers && props.current_user.followers.filter(e => e.id === user.id).length > 0 ?
          <Button color="primary" size="sm" onClick={() => props.unFollowHandler(user)} className="badge badge-primary badge-pill">
            Unfollow
            </Button>
          :
          <Button color="primary" size="sm" onClick={() => props.followHandler(user)} className="badge badge-primary badge-pill">
            Follow
          </Button>
        }
      </li>
    )
  }

  const getUserCards = () => {
    return props.users.map(user => {
      return genUserCard(user)
    })
  }

  return (
    <>
      <div><i className="fas fa-users"></i>   Recommended Users</div>
      <div style={{ height: "200px", overflow: "scroll" }}>
        <ul className="list-group">
          {getUserCards()}
        </ul>
      </div>
    </>
  )
}

export default RecommendedUsers
