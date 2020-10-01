import React from 'react'
import { Button } from 'reactstrap'

const RecommendedUsers = props => {

  const genUserCard = user => {
    const avator = user.avator ? user.avator : "/images/cat-placeholder.png"

    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <img
          src={avator}
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
      <div>Recommended Users</div>
      <div style={{ height: "200px", overflow: "scroll" }}>
        <ul class="list-group">
          {getUserCards()}
        </ul>
      </div>
    </>
  )
}

export default RecommendedUsers
