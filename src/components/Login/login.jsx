import React from "react";
import loginImage from "./login.jpg";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation aligned with landing theme */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">V</div>
              <span className="text-xl font-bold text-gray-900">VidyaAI</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#help" className="text-gray-700 hover:text-indigo-600 transition-colors">Help</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Split layout */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Brand hero */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 blur-2xl opacity-70" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Welcome back to <span className="text-indigo-600">VidyaAI</span>
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sign in to create local-language lessons, generate smart worksheets, and craft clear explanations tailored to every learner in your classroom.
              </p>
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/10" />
                <img src={loginImage} alt="Teacher using VidyaAI" className="w-full object-cover max-h-80" />
              </div>
              <div className="mt-6 text-sm text-gray-600">
                New to VidyaAI? <Link to="/signup" className="text-indigo-600 font-medium hover:underline">Create an account</Link>
              </div>
            </div>

            {/* Right: Form card */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
                  <p className="text-sm text-gray-600 mt-1">Use your school or email account</p>
                </div>

                <form className="space-y-5">
                  <div>
                    <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700">School ID</label>
                    <input
                      type="text"
                      id="schoolId"
                      placeholder="e.g. VIDYA-1234"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="name@school.edu"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      <a href="#forgot" className="text-sm text-indigo-600 hover:underline">Forgot?</a>
                    </div>
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input id="remember" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me on this device</label>
                  </div>

                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-colors">
                    Sign in
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-3 text-gray-500">or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button type="button" className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition">
                      <span className="text-sm font-medium text-gray-700">Google</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition">
                      <span className="text-sm font-medium text-gray-700">Microsoft</span>
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    By continuing you agree to our <a href="#terms" className="text-indigo-600 hover:underline">Terms</a> and <a href="#privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;