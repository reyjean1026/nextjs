import React from 'react'
import Link from 'next/link'

export default function NavLinks({onClick}) {
    // Defining link name and path
    const links =
        [{ 'name': 'About', 'path': '/about' },
        { 'name': 'Services', 'path': '/services' },
        { 'name': 'Reviews', 'path': '/reviews' },
        { 'name': 'Pricing', 'path': '/pricing' },]
    // Getting links and looping them through li
    const listItems = links.map((link) =>
            <li  onClick={onClick}  key={link.name} className='text-black text-lg font-medium hover:text-cyan-400 duration-300 mt-4 cursor-pointer border p-3 md:ml-8 md:mb-0 mb-6 md:mt-0 md:p-0 md:border-none'>
                <Link href={link.path}>
                <a>{link.name}</a>
            </Link>
           </li>
    );
    return (
        <div className='md:flex'>
            {listItems}
        </div>
    )
}
