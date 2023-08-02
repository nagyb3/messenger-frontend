import React from 'react'

export default function Login() {
  const [usernameInput, setUsernameInput] = React.useState('')
  const [passwordInput, setPasswordInput] = React.useState('')

  const fetchLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/login`, {
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
    <div className="bg-orange-100 h-[calc(100vh-70px)]">
      <h1 className="text-center text-3xl p-8">Login</h1>
      <form action="" onSubmit={e => fetchLogin(e)} className='flex flex-col items-center gap-10'>
        <div className='w-fit'>
          <label htmlFor="username" className='text-lg'>Username:</label>
          <input className='mx-3 p-1 border-[1px] border-black rounded'
            type="text"
            id="username"
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
          />
        </div>
        <div className='w-fit'>
          <label htmlFor="password" className='text-lg'>Password:</label>
          <input className='mx-3 p-1 border-[1px] border-black rounded'
            type="password"
            id="password"
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="bg-white text-xl px-3 py-2 rounded border-[1px] border-black hover:relative hover:top-1"
        />
      </form>
      <p className='text-center mt-8'>Dont have an account yet? <a className='text-blue-900 underline' href="/signup">SIGN UP NOW!</a></p>
    </div>
  )
}
