import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Tile = ({ color, title, subtitle, points, cta }) => (
  <div className="group bg-white text-gray-800 rounded-2xl border border-gray-100 shadow-xl p-6 md:p-7 transition-all duration-500 will-change-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/60">
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} text-white shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      </div>
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-xs text-gray-600 -mt-0.5">{subtitle}</div>
      </div>
    </div>
    <ul className="space-y-2 text-sm text-gray-700 mb-6">
      {points.map((p, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-sky-400/80 group-hover:bg-sky-300 transition-colors"></span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
    <button className="w-full bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200 rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
      {cta} <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </button>
  </div>
);

const TeacherDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();   // ✅ here

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal tiles on view
  useEffect(() => {
    const tiles = document.querySelectorAll(".teacher-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-6");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    tiles.forEach((t, i) => {
      t.style.transitionDelay = `${i * 80}ms`;
      io.observe(t);
    });
    return () => io.disconnect();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-white">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-bold text-indigo-600">
                VidyaAI
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="/teacher"
                className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
              >
                Home
              </a>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold hover:ring-2 hover:ring-indigo-300 transition"
                >
                  T
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                    <a
                      href="/activities"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Your Activities
                    </a>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-2 bg-white shadow-lg">
            <a
              href="/activities"
              className="block text-gray-700 hover:text-indigo-600 text-base"
            >
              Your Activities
            </a>
            <a
              href="/profile"
              className="block text-gray-700 hover:text-indigo-600 text-base"
            >
              Profile
            </a>
            <a
              href="/admin"
              className="block text-gray-700 hover:text-indigo-600 text-base"
            >
              Admin
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-600 hover:text-red-700 text-base"
            >
              Logout
            </button>
            <button className="w-full text-left bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">
              Create activity
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Sahayak Teacher Dashboard
          </h2>
          <p className="text-gray-600 mt-2">
            Tools to engage, assess and support your classroom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="teacher-reveal opacity-0 translate-y-6 transition-all duration-700">
            <Tile
              color="bg-rose-500"
              title="Live Interaction"
              subtitle="Connect in real-time"
              points={["Video calls", "Screen sharing", "Real-time chat", "Interactive tools"]}
              cta="Open Live Interaction"
            />
          </div>
          <div className="teacher-reveal opacity-0 translate-y-6 transition-all duration-700">
            <Tile
              color="bg-indigo-500"
              title="Activity Creator"
              subtitle="Generate engaging content"
              points={["Story generator", "Quiz builder", "Game creator", "Visual aids"]}
              cta="Open Activity Creator"
            />
          </div>
          <div className="teacher-reveal opacity-0 translate-y-6 transition-all duration-700">
            <Tile
              color="bg-sky-500"
              title="Activity Scheduler"
              subtitle="Plan your sessions"
              points={["Calendar view", "Lesson planning", "Reminders", "Time management"]}
              cta="Open Activity Scheduler"
            />
          </div>
          <div className="teacher-reveal opacity-0 translate-y-6 transition-all duration-700">
            <Tile
              color="bg-violet-500"
              title="Analytics & Reports"
              subtitle="Track performance"
              points={["Performance metrics", "Progress tracking", "Custom reports", "Data insights"]}
              cta="Open Analytics & Reports"
            />
          </div>
          <div className="teacher-reveal opacity-0 translate-y-6 transition-all duration-700">
            <Tile
              color="bg-orange-500"
              title="Quizzes & Homework"
              subtitle="Assess efficiently"
              points={["Quiz creation", "Homework tracking", "Auto-grading", "Analytics"]}
              cta="Open Quizzes & Homework"
            />
          </div>
          <div className="teacher-reveal opacity-0 translate-y-6 transition-all duration-700">
            <Tile
              color="bg-emerald-500"
              title="Accessibility Support"
              subtitle="Inclusive tools"
              points={["Visual support", "Audio assistance", "Motor support", "Cognitive aids"]}
              cta="Open Accessibility Support"
            />
          </div>
        </div>
      </main>

      <footer className="mt-16 py-8 text-center text-gray-500">
        <p>© 2024 VidyaAI Teacher</p>
      </footer>
    </div>
  );
};

export default TeacherDashboard;
