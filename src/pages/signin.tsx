import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import {useRouter} from 'next/router'

const SignIn: NextPage = (props): JSX.Element => {
  
    const [userInfo, setUserInfo] = useState({email: '', password: ''})
    const [error, setError] = useState({isError: false, message: ''})
    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        // validate userinfo
        e.preventDefault()
        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false
        })

        if(res?.ok) {
          alert(true)
          router.push("/about");
        }else{
          // show error message
          alert(false)
          setError({...error, isError: true, message: res?.error as string})
        }

        console.log(res)
    }
    return (
        // <div>
        //     <form onSubmit={handleSubmit}> 
        //         <h1>SIGN IN</h1>
        //         <input value={userInfo.email} onChange = {e=> setUserInfo({...userInfo, email: e.target.value})} type="email" placeholder="john@email.com"/>
        //         <input value={userInfo.password} onChange = {e=> setUserInfo({...userInfo, password: e.target.value})}   type="password" placeholder="*****"/>
        //         <input type="submit" value="Login"/>
        //     </form>

        // </div>
        <section >
  <div className="px-6 h-full text-gray-800 mt-10">
    <div className="flex xl:justify-center lg:justify-between justify-center items-start flex-wrap h-full g-6">
      <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image"
        />
      </div>
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0">Please Sign-in</p>
          </div>

    
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={userInfo.email} onChange = {e=> setUserInfo({...userInfo, email: e.target.value})} 
              placeholder="Email address"
            />
          </div>

        
          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={userInfo.password} onChange = {e=> setUserInfo({...userInfo, password: e.target.value})} 
              placeholder="Password"
            />
          </div>


          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button>
            { error.isError &&
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              <span className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"> {error.message} </span>
            </p>}
       
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
        
    )
}

export default SignIn