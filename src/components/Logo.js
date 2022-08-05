import React from 'react'
import Link from 'next/link';

export default function Logo() {
  return (
    <div>
          <Link href='/'>
          <h1 className='font-bold text-3xl'>Logo</h1>
        </Link>
    </div>
  )
}
