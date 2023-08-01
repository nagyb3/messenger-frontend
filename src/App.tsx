import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MainSection from './MainSection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './Profile'
import Login from './Login'

function App() {
  const [hasToken, setHasToken] = React.useState(false)

  React.useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setHasToken(true)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar hasToken={hasToken} />
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-[1fr_2fr] min-h-[calc(100vh-70px)]">
                <Sidebar hasToken={hasToken} />
                <MainSection hasToken={hasToken} />
              </div>
            }
          ></Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
