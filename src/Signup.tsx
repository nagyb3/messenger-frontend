import React from 'react'

export default function Signup() {
  const [usernameInput, setUsernameInput] = React.useState('')
  const [passwordInput, setPasswordInput] = React.useState('')
  const [passwordConfirmInput, setPasswordConfirmInput] = React.useState('')
  const [emailInput, setEmailInput] = React.useState('')
  const [usernameErrorState, setUsernameErrorState] = React.useState<null | string>(null)
  const [passwordErrorState, setPasswordErrorState] = React.useState<null | string>(null)

  const fetchSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (passwordInput !== passwordConfirmInput) {
      setPasswordErrorState('The two password have to be equal!')
      return
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
          email: emailInput,
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
  }

  React.useEffect(() => {
    if (usernameInput !== '') {
      fetch(`${import.meta.env.VITE_API_URL}/users/exists/${usernameInput}`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.exists === true) {
            setUsernameErrorState('Username already exists!')
          } else {
            setUsernameErrorState('')
          }
        })
    } else {
      setUsernameErrorState('')
    }
  }, [usernameInput])

  return (
    <div className="bg-orange-100 h-[calc(100vh-70px)]">
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
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <input
            className="mx-3 p-1 border-[1px] border-black rounded"
            type="email"
            id="email"
            onChange={(e) => setEmailInput(e.target.value)}
            value={emailInput}
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
        <div className="w-fit">
          <label htmlFor="repeat-password" className="text-lg">
            Repeat password:
          </label>
          <input
            className="mx-3 p-1 border-[1px] border-black rounded"
            type="password"
            id="repeat-password"
            onChange={(e) => setPasswordConfirmInput(e.target.value)}
            value={passwordConfirmInput}
          />
          <p className="text-center text-red-600 mt-6 text-lg">{usernameErrorState}</p>
          <p className="text-center text-red-600 mt-6 text-lg">{passwordErrorState}</p>
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
