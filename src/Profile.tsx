import React from 'react'

type ProfilePropsType = {
  hasToken: boolean
}

export default function Profile({ hasToken }: ProfilePropsType) {
  const [username, setUsername] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (localStorage.getItem('username') !== null) {
      setUsername(localStorage.getItem('username'))
    }
  }, [hasToken])

  return (
    <div className="bg-orange-100 min-h-[calc(100vh-70px)]">
      {hasToken ? (
        <div>
          <h1 className="text-center text-3xl p-8 font-semibold">Your Profile</h1>
          <p className='text-center text-2xl'>Welcome {username} !</p>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl p-8">You are not logged in!</h1>
        </div>
      )}
    </div>
  )
}
