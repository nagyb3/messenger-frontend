import React from 'react'

export default function Signup() {
  const [usernameInput, setUsernameInput] = React.useState('')
  const [passwordInput, setPasswordInput] = React.useState('')

  const fetchSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/login'
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="bg-green-200 h-[calc(100vh-70px)]">
      <h1 className="text-center text-3xl p-8">Signup</h1>
      <form
        action=""
        onSubmit={(e) => fetchSignup(e)}
        className="flex flex-col items-center gap-10"
      >
        <div className="w-fit">
          <label htmlFor="username" className="text-lg">
            Username:
          </label>
          <input
            className="mx-3 p-1 border-[1px] border-black rounded"
            type="text"
            id="username"
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
          />
        </div>
        <div className="w-fit">
          <label htmlFor="password" className="text-lg">
            Password:
          </label>
          <input
            className="mx-3 p-1 border-[1px] border-black rounded"
            type="password"
            id="password"
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
          />
        </div>
        <input
          type="submit"
          value="Signup"
          className="bg-white text-xl px-3 py-2 rounded border-[1px] border-black hover:relative hover:top-1"
        />
      </form>
    </div>
  )
}
