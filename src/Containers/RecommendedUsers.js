import React from 'react'

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
      </li>
    )
  }

  const getUserCards = () => {
    return props.users.map(user => {
      console.log(user)
      return genUserCard(user)
    })
  }

  return (
    <>
      <div>Recommended Users</div>
      <div style={{height: "200px", overflow: "scroll"}}>
        <ul class="list-group">
          {getUserCards()}
        </ul>
      </div>
    </>
  )
}

export default RecommendedUsers
