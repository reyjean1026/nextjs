import React from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'

const Navbar = () => {
    return (
        <div className='bg-white pl-6 py-6 justify-between relative shadow-md'>
            <Logo />
            <div className='text-4xl text-black absolute top-6 right-6 cursor-pointer'><ion-icon name="menu-outline"></ion-icon>
            </div>
            <ul>
                <NavLinks/>
            </ul>
        </div>
    )
}

export default Navbar
