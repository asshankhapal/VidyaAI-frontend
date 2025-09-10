import React from "react";
import loginImage from "./login.jpg";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black text-white flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-2">
          <img src={loginImage} alt="Sahayak" className="h-10 w-10" />
          <span className="text-xl font-bold">Sahayak</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#features" className="hover:text-gray-300"> Features </a>
          <a href="#demo" className="hover:text-gray-300"> Demo </a>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"> Try Free </button>
        </nav>
      </header>

      <div className="flex flex-1 items-center justify-center px-8">
        <div className="hidden md:flex w-1/2 justify-center">
          <img
            src={loginImage} 
            alt="Login Illustration"
            className="max-w-md"
          />
        </div>

        <div className="w-full max-w-sm md:w-1/2">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="schoolId"
                  className="block text-sm font-medium text-gray-700"
                >
                  School Id
                </label>
                <input
                  type="text"
                  id="schoolId"
                  placeholder="Enter school id"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="email"
                  id="name"
                  placeholder="name@mail.com"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-gray-600"> 
                  I agree the{" "}
                  <a href="#terms" className="text-blue-600 underline">
                    Terms and Conditions
                  </a>.
                </label>
              </div>

              <button type="submit"
                className="w-full bg-purple-200 hover:bg-purple-300 text-black font-semibold py-2 rounded-lg shadow-md"> LOGIN </button>

              <p className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <a href="#signup" className="text-blue-600 font-medium"> Sign Up </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;