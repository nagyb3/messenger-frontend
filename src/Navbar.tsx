import React from 'react'

type NavbarPropsType = {
  hasToken: boolean
  setHasToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({ hasToken, setHasToken }: NavbarPropsType) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  function handleSignout() {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    setHasToken(false)
    window.location.href = "/"
  }

  return (
    <div className="h-[70px] border-b-2 border-black bg-orange-800 flex justify-between items-center px-10">
      <h1 className="text-white text-lg">
        <a href="/">Messenger</a>
      </h1>
      {hasToken ? (
        <ul className="list-none flex lg:gap-28 gap-10 text-white text-lg">
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a onClick={handleSignout} className="cursor-pointer">
              Signout
            </a>
          </li>
        </ul>
      ) : (
        <button className="bg-white px-3 py-2 rounded-lg border-black">
          <a className="text-black text-lg" href="/login">
            Login
          </a>
        </button>
      )}
    </div>
  )
}
