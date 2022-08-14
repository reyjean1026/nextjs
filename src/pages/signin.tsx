import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

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
      alert(true);
      router.push("/about");
    } else {
      // show error message
      alert(false);
      setError({ ...error, isError: true, message: res?.error as string });
    }

    console.log(res);
  };
  return (
    <div className="w-full h-[90vh] relative container mx-auto py-20 mt-5 px-3">
      <div className="max-w-[500px] mx-auto sm:border rounded-md sm:shadow-lg p-4">
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <h1 className="text-4xl font-bold text-gray-600 text-center mb-8">
            Sign In
          </h1>
        </div>
        {error.isError && (
          <p className="text-sm font-semibold mt-2 pt-1 mb-0">
            <span className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
              {" "}
              {error.message}{" "}
            </span>
          </p>
        )}
        <form>
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
            {/* <button
              type="submit"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button> */}
            <button
              onClick={handleSubmit}
              className="px-8 py-2 border hover:bg-sky-700 "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
