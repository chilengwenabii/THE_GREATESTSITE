'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
}

const projects: Project[] = [
  // ANIMATION
  {
    id: '1',
    title: 'Do It Possible',
    category: 'ANIMATION',
    description: 'An inspiring animation project showcasing possibilities.',
    status: 'active'
  },
  {
    id: '2',
    title: 'St. Joseph University',
    category: 'ANIMATION',
    description: 'Educational animation for St. Joseph University.',
    status: 'completed'
  },
  {
    id: '3',
    title: 'My Mysterious Boy',
    category: 'ANIMATION',
    description: 'Mystery-themed animation series.',
    status: 'active'
  },
  {
    id: '4',
    title: 'African Venture',
    category: 'ANIMATION',
    description: 'Adventure animation set in Africa.',
    status: 'planned'
  },
  {
    id: '5',
    title: 'The Greatest Series',
    category: 'ANIMATION',
    description: 'Flagship animation series of THE GREATEST.',
    status: 'active'
  },
  {
    id: '6',
    title: 'Trailer (Showcase)',
    category: 'ANIMATION',
    description: 'Promotional trailer showcasing our work.',
    status: 'completed'
  },
  {
    id: '7',
    title: 'Trade',
    category: 'ANIMATION',
    description: 'Animation project focused on trade themes.',
    status: 'planned'
  },

  // CARTOON
  {
    id: '8',
    title: '[No Name Yet]',
    category: 'CARTOON',
    description: 'Upcoming cartoon project - name to be announced.',
    status: 'planned'
  },

  // GAMES
  {
    id: '9',
    title: 'Makini',
    category: 'GAMES',
    description: 'Educational game for children.',
    status: 'active'
  },
  {
    id: '10',
    title: 'Forest Hunting',
    category: 'GAMES',
    description: 'Adventure hunting game set in the forest.',
    status: 'active'
  },
  {
    id: '11',
    title: 'The Greatest Soccer League',
    category: 'GAMES',
    description: 'Soccer management and simulation game.',
    status: 'planned'
  },

  // AI
  {
    id: '12',
    title: 'The Greatest AI',
    category: 'AI',
    description: 'Advanced AI system development.',
    status: 'active'
  },

  // WEBSITES
  {
    id: '13',
    title: 'Team Website',
    category: 'WEBSITES',
    description: 'Official website for THE GREATEST team.',
    status: 'completed'
  },
  {
    id: '14',
    title: 'Client Website',
    category: 'WEBSITES',
    description: 'Custom website development for clients.',
    status: 'active'
  },

  // AR/VR
  {
    id: '15',
    title: 'Technologies Holographics',
    category: 'AR/VR',
    description: 'Holographic technology development.',
    status: 'planned'
  },

  // AEROSPACE & TECHNOLOGY
  {
    id: '16',
    title: 'Satellite Launch Program',
    category: 'AEROSPACE & TECHNOLOGY',
    description: 'Building and launching THE GREATEST Satellite.',
    status: 'active'
  },
  {
    id: '17',
    title: 'Satellite Launch Base in Tanzania',
    category: 'AEROSPACE & TECHNOLOGY',
    description: 'Establishing satellite launch facility in Tanzania.',
    status: 'planned'
  },
  {
    id: '18',
    title: 'The Greatest Phone Series G1',
    category: 'AEROSPACE & TECHNOLOGY',
    description: 'First generation of THE GREATEST smartphone.',
    status: 'completed'
  },
  {
    id: '19',
    title: 'The Greatest Phone Series G2',
    category: 'AEROSPACE & TECHNOLOGY',
    description: 'Second generation of THE GREATEST smartphone.',
    status: 'active'
  },
  {
    id: '20',
    title: 'The Greatest Phone Series G3',
    category: 'AEROSPACE & TECHNOLOGY',
    description: 'Third generation of THE GREATEST smartphone.',
    status: 'planned'
  }
];

const categories = [
  'ANIMATION',
  'CARTOON',
  'GAMES',
  'AI',
  'WEBSITES',
  'AR/VR',
  'AEROSPACE & TECHNOLOGY'
];

export default function ProjectsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'completed': return 'bg-blue-600';
      case 'planned': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

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
            <button
              onClick={() => router.push('/profile')}
              className="text-white hover:text-[var(--brand-gold)] transition"
            >
              Profile
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
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-[var(--brand-gold)] mb-8">THE GREATEST COMPANY — PROJECTS</h2>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === 'ALL'
                  ? 'bg-[var(--brand-gold)] text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              ALL
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === category
                    ? 'bg-[var(--brand-gold)] text-black'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white hover:scale-105 transition transform"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[var(--brand-gold)]">{project.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-4">{project.description}</p>
              <p className="text-xs text-[var(--brand-gold)] font-semibold">{project.category}</p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => router.push('/chatt')}
                  className="p-2 rounded hover:bg-white/20 transition hover:scale-110"
                >
                  <img
                    src="/images/chatt_icon.png"
                    className="w-6 h-6"
                    alt="chat"
                  />
                </button>
                <div className="flex space-x-2">
                  <button className="p-2 rounded hover:bg-white/20 transition hover:scale-110">
                    <img
                      src="/images/download_icon.png"
                      className="w-6 h-6"
                      alt="download"
                    />
                  </button>
                  <button className="px-3 py-1 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-300">No projects found in this category.</p>
          </div>
        )}
      </div>

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
