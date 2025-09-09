import React from "react";

function SignupPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">V</div>
              <span className="text-xl font-bold text-gray-900">VidyaAI</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
              <a href="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">Login</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Intro copy */}
            <div className="order-2 lg:order-1">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 blur-2xl opacity-70" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Create your <span className="text-indigo-600">VidyaAI</span> account
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Personalize your teaching experience. Choose your language, add your background, and start generating local-language lessons and smart worksheets.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3"><span className="text-indigo-600 mt-1">▸</span> Multilingual support for diverse classrooms</li>
                <li className="flex items-start gap-3"><span className="text-indigo-600 mt-1">▸</span> Age- and grade-aware content generation</li>
                <li className="flex items-start gap-3"><span className="text-indigo-600 mt-1">▸</span> Ready-to-print worksheets and visuals</li>
              </ul>
            </div>

            {/* Right: Signup form */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Sign up</h2>
                  <p className="text-sm text-gray-600 mt-1">It only takes a minute</p>
                </div>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Language */}
                  <div className="sm:col-span-2">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Preferred language</label>
                    <select id="language" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">Select language</option>
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                      <option>Gujarati</option>
                      <option>Tamil</option>
                      <option>Telugu</option>
                      <option>Bengali</option>
                      <option>Kannada</option>
                      <option>Malayalam</option>
                      <option>Punjabi</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                    <input id="name" type="text" placeholder="Your name" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>

                  {/* Education */}
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
                    <input id="education" type="text" placeholder="e.g. B.Ed, M.Sc" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>

                  {/* Age */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input id="age" type="number" min="18" placeholder="e.g. 28" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>

                  {/* Grade */}
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
                    <select id="grade" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">Select grade</option>
                      <option>Pre-Primary</option>
                      <option>Grade 1</option>
                      <option>Grade 2</option>
                      <option>Grade 3</option>
                      <option>Grade 4</option>
                      <option>Grade 5</option>
                      <option>Grade 6</option>
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div className="sm:col-span-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password" type="password" placeholder="Create a strong password" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>

                  <div className="sm:col-span-2 flex items-start">
                    <input id="terms" type="checkbox" className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">I agree to the <a href="#terms" className="text-indigo-600 hover:underline">Terms</a> and <a href="#privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>.</label>
                  </div>

                  <div className="sm:col-span-2 space-y-3">
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-colors">Create account</button>
                    <p className="text-sm text-gray-600 text-center">Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Sign in</a></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
