import React from 'react'

type UserType = {
  _id: string
  __v: number
  username: string
  password: string
}

type SidebarPropsType = {
  hasToken: boolean
}

export default function Sidebar({ hasToken }: SidebarPropsType) {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setUsers(data.allUsers)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="min-h-[calc(100vh-70px)] border-r-2 border-black">
      <p className="text-center text-2xl font-bold my-8">Users:</p>
      {users ? (
        <div>
          <ul className="ml-8 list-disc">
            {users.map((user: UserType) => {
              if (hasToken) {
                if (user.username !== localStorage.getItem('username')) {
                  return (
                    <li
                      className="my-2 cursor-pointer"
                      key={user._id}
                      onClick={() =>
                        (window.location.href = `/?user=${user.username}`)
                      }
                    >
                      {user.username}
                    </li>
                  )
                }
              } else {
                return (
                  <li
                    className="my-2 cursor-pointer"
                    key={user._id}
                    onClick={() =>
                      (window.location.href = `/?user=${user.username}`)
                    }
                  >
                    {user.username}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      ) : undefined}
    </div>
  )
}
