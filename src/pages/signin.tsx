import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import MyBtn from "../components/Mybutton";

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState({ isError: false, message: "" });
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate userinfo
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      // show error message
      setError({ ...error, isError: true, message: res?.error as string });
    }

    console.log(res);
  };
  return (
    <div className="w-full h-[85vh] relative container py-20 mt-20 px-3">
      <div className="max-w-[500px] mx-auto sm:border rounded-md sm:shadow-lg p-4">
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <h1 className="text-4xl font-bold text-gray-600 text-center mb-4">
            Sign In
          </h1>
        </div>
        {error.isError && (
          <p className="text-sm font-semibold my-2 text-center">
            <span className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
              {" "}
              {error.message}{" "}
            </span>
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="bg-gray-100 w-full p-3 rounded-md mb-6"
              type="email"
              placeholder="Enter email"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <input
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              className="bg-gray-100 w-full p-3  rounded-md mb-6"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <div className="text-center lg:text-left">
            <button
              type="submit" className="w-32">
              <MyBtn textContent={"Sign-in"} />
            </button>
         
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
