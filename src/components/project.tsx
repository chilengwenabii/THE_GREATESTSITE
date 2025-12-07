'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  document: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Visualization',
    description: '3D visualizations for internal projects.',
    document: '/documents/visualization.pdf'
  },
  {
    id: '2',
    title: 'Animation',
    description: 'Full animation workflow documentation.',
    document: '/documents/animation.pdf'
  },
  {
    id: '3',
    title: 'Game Development',
    description: 'THE GREATEST game system design files.',
    document: '/documents/games.pdf'
  },
  {
    id: '4',
    title: 'Satellite',
    description: 'Space & satellite docs.',
    document: '/documents/satellite.pdf'
  }
];

interface WorkCardProps {
  title: string;
  description: string;
  document: string;
}

function WorkCard({ title, description, document }: WorkCardProps) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(document)
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, [document]);

  return (
    <div className="w-72 bg-gradient-to-b from-[#365314] to-[#1E3A0F] p-6 rounded-2xl border border-[var(--card-border)] shadow-[var(--shadow-card)] text-white flex flex-col hover:scale-105 hover:shadow-[var(--shadow-hover)] hover:bg-[var(--card-hover)] transition-all duration-300">
      <h3 className="text-xl font-bold text-[var(--brand-gold)]">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{description}</p>

      <div className="flex justify-between items-center mt-auto">
        {/* Comment icon */}
        <button className="p-2 rounded hover:bg-white/20 transition hover:scale-110">
          <img
            src="/images/chatt_icon.png"
            className="w-8 h-8"
            alt="chat"
          />
        </button>

        {/* Download icon */}
        {exists === false ? (
          <span className="text-xs text-[var(--text-muted)]">Not uploaded</span>
        ) : (
          exists === true && (
            <a
              href={document}
              download
              className="p-2 rounded hover:bg-white/20 transition hover:scale-110"
            >
              <img
                src="/images/download_icon.png"
                className="w-7 h-7"
                alt="download"
              />
            </a>
          )
        )}
      </div>
    </div>
  );
}

export default function ProjectComponent() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Simulate fetching projects from any location (API, local storage, etc.)
    // For now, using mock data. In a real app, this could be an API call.
    setProjects(mockProjects);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Current Works</h2>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {projects.map((project) => (
          <WorkCard
            key={project.id}
            title={project.title}
            description={project.description}
            document={project.document}
          />
        ))}
      </div>
    </div>
  );
}
