import React from 'react'

export default function Login() {
  const [usernameInput, setUsernameInput] = React.useState('')
  const [passwordInput, setPasswordInput] = React.useState('')

  const fetchLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:5000/login`, {
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
        return response.json()
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', usernameInput);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="bg-green-200 h-[calc(100vh-70px)]">
      <h1 className="text-center text-3xl p-8">Login</h1>
      <form action="" onSubmit={e => fetchLogin(e)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="bg-white text-xl px-3 py-2 rounded"
        />
      </form>
    </div>
  )
}
