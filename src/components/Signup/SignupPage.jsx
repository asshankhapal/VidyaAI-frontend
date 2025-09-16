import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    lang: "",
    education: "",
    age: "",
    grade: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!formData.terms) {
      setErrors({ terms: "You must accept the terms to continue" });
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          lang: formData.lang,
          education: formData.education,
          age: formData.age,
          grade: formData.grade,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        // Handle validation errors from backend
        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert("Error: " + JSON.stringify(data));
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                V
              </div>
              <span className="text-xl font-bold text-gray-900">VidyaAI</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Home
              </a>
              <a href="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Login
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Intro */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 blur-2xl opacity-70" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Create your <span className="text-indigo-600">VidyaAI</span> account
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Personalize your teaching experience. Choose your language, add
                your background, and start generating local-language lessons and
                smart worksheets.
              </p>
            </div>

            {/* Right: Signup form */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Sign up</h2>
                  <p className="text-sm text-gray-600 mt-1">It only takes a minute</p>
                </div>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-5" onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="sm:col-span-2">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                  </div>

                  {/* Language */}
                  <div className="sm:col-span-2">
                    <label htmlFor="lang" className="block text-sm font-medium text-gray-700">
                      Preferred language
                    </label>
                    <select
                      id="lang"
                      value={formData.lang}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 bg-white shadow-sm"
                    >
                      <option value="">Select language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Gujarati">Gujarati</option>
                    </select>
                    {errors.lang && <p className="mt-1 text-sm text-red-600">{errors.lang}</p>}
                  </div>

                  {/* First name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      placeholder="First name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
                  </div>

                  {/* Last name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      id="last_name"
                      type="text"
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Education */}
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                      Education
                    </label>
                    <input
                      id="education"
                      type="text"
                      placeholder="e.g. B.Ed, M.Sc"
                      value={formData.education}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education}</p>}
                  </div>

                  {/* Age */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      id="age"
                      type="number"
                      min="18"
                      placeholder="e.g. 28"
                      value={formData.age}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                  </div>

                  {/* Grade */}
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                      Grade
                    </label>
                    <select
                      id="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 bg-white shadow-sm"
                    >
                      <option value="">Select grade</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                    {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
                  </div>

                  {/* Password */}
                  <div className="sm:col-span-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  {/* Terms */}
                  <div className="sm:col-span-2 flex items-start">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the{" "}
                      <a href="#terms" className="text-indigo-600 hover:underline">Terms</a> and{" "}
                      <a href="#privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                    </label>
                  </div>
                  {errors.terms && <p className="sm:col-span-2 mt-1 text-sm text-red-600">{errors.terms}</p>}

                  {/* Submit */}
                  <div className="sm:col-span-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-colors"
                    >
                      Create account
                    </button>
                    <p className="text-sm text-gray-600 text-center">
                      Already have an account?{" "}
                      <a href="/login" className="text-indigo-600 hover:underline">Sign in</a>
                    </p>
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