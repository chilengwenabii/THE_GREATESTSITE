'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    // Fetch user data
    fetch('http://localhost:8000/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    })
    .catch(err => console.error('Error fetching user:', err));

    // Fetch projects
    fetch('https://the-greatest-backend-site-1.onrender.com/projects/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setProjects(data.slice(0, 3)); // Show only first 3 projects
      } else {
        setProjects([]); // Set empty array if data is not an array
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching projects:', err);
      setLoading(false);
    });
  }, [router]);



  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background-main)] flex items-center justify-center">
        <div className="text-[var(--text-primary)] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-main)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="bg-[var(--background-header)] backdrop-blur-md p-4 border-b border-[var(--brand-medium-green)] shadow-[var(--shadow-header)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/logos/logo.png" alt="Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-[var(--brand-gold)]">THE GREATEST</h1>
          </div>

          <nav className="flex space-x-6">
            <button
              onClick={() => router.push('/home')}
              className="text-white hover:text-[var(--brand-gold)] transition"
            >
              Home
            </button>
            <button
              onClick={() => router.push('/projects')}
              className="text-white hover:text-[var(--brand-gold)] transition"
            >
              Projects
            </button>
            <button
              onClick={() => router.push('/team')}
              className="text-white hover:text-[var(--brand-gold)] transition"
            >
              Team
            </button>
            <button
              onClick={() => router.push('/announcements')}
              className="text-white hover:text-[var(--brand-gold)] transition"
            >
              Announcements
            </button>
            <button
              onClick={() => router.push('/calendar')}
              className="text-white hover:text-[var(--brand-gold)] transition"
            >
              Calendar
            </button>
          </nav>

          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-[var(--brand-gold)] transition"
            onClick={() => router.push('/profile')}
          >
            <img
              src="/images/userpofile.png"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--brand-gold)] mb-2">
            Welcome back, {user?.full_name || user?.username}!
          </h2>
          <p className="text-gray-300 text-lg">
            Here's what's happening in your workspace today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h3 className="text-lg font-bold text-[var(--brand-gold)] mb-2">Active Projects</h3>
            <p className="text-3xl font-bold">{projects.filter(p => p.status === 'active').length}</p>
          </div>

          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h3 className="text-lg font-bold text-[var(--brand-gold)] mb-2">Completed Tasks</h3>
            <p className="text-3xl font-bold">12</p>
          </div>

          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h3 className="text-lg font-bold text-[var(--brand-gold)] mb-2">Team Members</h3>
            <p className="text-3xl font-bold">8</p>
          </div>

          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h3 className="text-lg font-bold text-[var(--brand-gold)] mb-2">Upcoming Meetings</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[var(--brand-gold)]">Recent Projects</h3>
            <button
              onClick={() => router.push('/projects')}
              className="px-4 py-2 bg-[var(--brand-forest)] text-white rounded-lg hover:bg-[var(--brand-medium-green)] transition"
            >
              View All Projects
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
                  <h4 className="text-xl font-bold text-[var(--brand-gold)] mb-2">{project.title}</h4>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'active' ? 'bg-green-600' :
                      project.status === 'completed' ? 'bg-blue-600' : 'bg-yellow-600'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-lg text-gray-300 mb-4">No projects yet.</p>
                <button
                  onClick={() => router.push('/projects')}
                  className="px-6 py-3 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
                >
                  Create Your First Project
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h3 className="text-xl font-bold text-[var(--brand-gold)] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/projects')}
                className="w-full text-left px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                <img src="/images/upload.png" alt="Upload" className="w-5 h-5 inline mr-2" /> Create New Project
              </button>
              <button
                onClick={() => router.push('/chatt')}
                className="w-full text-left px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                <img src="/images/chatt_icon.png" alt="Chat" className="w-5 h-5 inline mr-2" /> Start a Chat
              </button>
              <button
                onClick={() => router.push('/announcements')}
                className="w-full text-left px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                <img src="/images/announce.png" alt="Announce" className="w-5 h-5 inline mr-2" /> Send Announcement
              </button>
            </div>
          </div>

          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h3 className="text-xl font-bold text-[var(--brand-gold)] mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">New project "Animation Alpha" created</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">Team meeting scheduled for tomorrow</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm">File "design_mockup.pdf" uploaded</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chat Icon */}
      <div
        className="w-16 h-16 fixed bottom-5 right-5 cursor-pointer hover:scale-110 transition bg-transparent rounded-full flex items-center justify-center shadow-[var(--shadow-card)] animate-pulse"
        onClick={() => router.push('/chatt')}
      >
        <img
          src="/images/chatt_icon.png"
          className="w-8 h-8"
          alt="chat"
        />
      </div>
    </div>
  );
}
