import React, { useState } from 'react'
import Button from './Button'
import Logo from './Logo'
import NavLinks from './NavLinks'

const Navbar = () => {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <div className='bg-white pl-6 py-6 justify-between relative shadow-md md:flex'>
            <Logo />
            <div onClick={() => setIsOpen(!isOpen)} className='text-4xl text-black absolute top-6 right-6 cursor-pointer md:hidden '><ion-icon name={isOpen ? 'close' : 'menu'}></ion-icon>
            </div>
            <ul className={`bg-white pb-8 z-[2] w-full transition-all duration-300 ease-in left-0 absolute pl-7 md:flex md:j md:items-center md:mr-6 md:pb-0 md:z-auto md:w-auto md:static ${isOpen ? 'top-20 opacity-100' : 'opacity-0 -top-96 md:opacity-100'}`}>
                <NavLinks />
                <Button />
            </ul>
        </div>
    )
}

export default Navbar
