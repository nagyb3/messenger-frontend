import React from 'react'

export default function Navbar() {

    function handleSignout() {
        //
    }

    return (
    <div className='h-[70px] border-b-2 border-black bg-orange-800 flex justify-between items-center px-10'>
        <h1 className='text-white text-lg'><a href="/">Messenger</a></h1>
        <ul className='list-none flex lg:gap-28 gap-10 text-white text-lg'>
            <li>
                <a href="/profile">Profile</a>
            </li>
            <li>
                <a onClick={handleSignout} className='cursor-pointer'>Signout</a>
            </li>
        </ul>
    </div>
  )
}
