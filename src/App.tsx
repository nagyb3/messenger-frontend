import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MainSection from './MainSection'

function App() {
  
  React.useEffect(() => {

  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='grid grid-cols-[1fr_2fr] min-h-[calc(100vh-70px)]'>
        <Sidebar/>
        <MainSection />
      </div>
    </div>
  )
}

export default App
