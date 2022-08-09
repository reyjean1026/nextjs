import React from 'react'
import { useSession } from "next-auth/react";

const about = () => {

    const { data, status } = useSession()

    if (status === "loading") {
      return <p>Loading...</p>
    }
  
    if (status === "unauthenticated") {
      return <p>Access Denied</p>
    }

  return (
    <section className="mt-10">
        <div className="px-6 h-full text-gray-800">
            <h2 className='text-3xl font-semibold mt-1 mb-12 pb-1'>Welcome</h2>
            <h3 className='text-2xl font-bold'> {JSON.stringify(data?.user, null, 2)}</h3>
        </div>
    </section>
  )
}

export default about