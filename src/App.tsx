import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MainSection from './MainSection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './Profile'
import Login from './Login'
import Signup from './Signup'

function App() {
  const [hasToken, setHasToken] = React.useState(false)

  React.useEffect(() => {
    document.title = 'Messenger'
    if (localStorage.getItem('token') !== null) {
      setHasToken(true)
    }
  }, [hasToken])

  return (
    <div className="min-h-screen">
      <Navbar hasToken={hasToken} setHasToken={setHasToken} />
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-[300px_2fr] min-h-[calc(100vh-70px)]">
                <Sidebar hasToken={hasToken} />
                <MainSection hasToken={hasToken} />
              </div>
            }
          ></Route>
          <Route path="/profile" element={<Profile hasToken={hasToken} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
