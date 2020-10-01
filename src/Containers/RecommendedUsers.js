import React from 'react'

const RecommendedUsers = props => {

  const genUserCard = user => {
    const avator = user.avator ? user.avator : "/images/cat-placeholder.png"

    return (
      <li>
        <img
          src={avator}
          alt={user.username}
          style={
            {
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              margin: "10px"
            }
          }
        />
        <strong>{user.username}</strong>
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
      <ul style={{listStyleType: "none"}}>{getUserCards()}</ul>
    </>
  )
}

export default RecommendedUsers
