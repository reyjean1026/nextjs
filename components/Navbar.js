import React, { useState } from 'react'
import Button from './Button'
import Logo from './Logo'
import NavLinks from './NavLinks'

const Navbar = () => {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <div className='bg-white pl-6 py-6 justify-between relative shadow-md'>
            <Logo />
            <div onClick={() => setIsOpen(!isOpen)} className='text-4xl text-black absolute top-6 right-6 cursor-pointer'><ion-icon name={isOpen ? 'close' : 'menu'}></ion-icon>
            </div>
            <ul className={`bg-white pb-12 z-[2] w-full transition-all duration-300 ease-in left-0 absolute pl-7 ${isOpen ? 'top-20 opacity-100' : 'opacity-0 -top-96'}`}>
                <NavLinks />
                <Button />
            </ul>
        </div>
    )
}

export default Navbar
