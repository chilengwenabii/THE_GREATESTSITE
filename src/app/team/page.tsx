'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TeamMember {
  id: string;
  fullName: string;
  roles: string[];
  skills: string[];
  projectsCompleted: string[];
  dateJoined: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    fullName: 'Chilengwe Sichalwe',
    roles: ['Game Developer', 'Data Scientist', 'Animator'],
    skills: ['Game Development', 'Data Analysis', 'Animation'],
    projectsCompleted: ['Animation Alpha', 'Data Visualization Project'],
    dateJoined: '2023-01-15'
  },
  {
    id: '2',
    fullName: 'Zakia Mfinanga',
    roles: ['Python Developer'],
    skills: ['Python', 'Backend Development'],
    projectsCompleted: ['API Development', 'Automation Scripts'],
    dateJoined: '2023-02-20'
  },
  {
    id: '3',
    fullName: 'Mariam Ngoi',
    roles: ['Full Stack Developer', 'Cyber Security'],
    skills: ['Full Stack Development', 'Cyber Security', 'Network Security'],
    projectsCompleted: ['Secure Web App', 'Penetration Testing'],
    dateJoined: '2023-03-10'
  },
  {
    id: '4',
    fullName: 'Josebert Fredy',
    roles: ['Sound Engineer', 'Graphic Designer'],
    skills: ['Audio Engineering', 'Graphic Design', 'UI/UX'],
    projectsCompleted: ['Game Soundtrack', 'Brand Identity Design'],
    dateJoined: '2023-04-05'
  },
  {
    id: '5',
    fullName: 'Kundi Thomas',
    roles: ['Mobile Developer', 'Modeling'],
    skills: ['Mobile Development', '3D Modeling', 'Unity'],
    projectsCompleted: ['Mobile Game App', '3D Character Models'],
    dateJoined: '2023-05-12'
  },
  {
    id: '6',
    fullName: 'Clara Conrad',
    roles: ['Market Strategist', 'Graphics Designer', 'Developer'],
    skills: ['Marketing Strategy', 'Graphic Design', 'Web Development'],
    projectsCompleted: ['Marketing Campaign', 'Website Redesign'],
    dateJoined: '2023-06-18'
  },
  {
    id: '7',
    fullName: 'Evance Mosha',
    roles: ['Animator', 'Developer'],
    skills: ['Animation', 'Frontend Development', 'JavaScript'],
    projectsCompleted: ['Animated Short Film', 'Interactive Web Animation'],
    dateJoined: '2023-07-22'
  },
  {
    id: '8',
    fullName: 'Method Mkoma',
    roles: ['Full Stack Developer', 'Modeling'],
    skills: ['Full Stack Development', '3D Modeling', 'Database Design'],
    projectsCompleted: ['E-commerce Platform', '3D Product Models'],
    dateJoined: '2023-08-30'
  },
  {
    id: '9',
    fullName: 'Lukas Siyame',
    roles: ['Developer', 'Graphics'],
    skills: ['Software Development', 'Graphic Design', 'Python'],
    projectsCompleted: ['Desktop Application', 'Logo Design'],
    dateJoined: '2023-09-14'
  },
  {
    id: '10',
    fullName: 'Asifiwe',
    roles: ['Cybersecurity', 'Networker'],
    skills: ['Cybersecurity', 'Network Administration', 'Ethical Hacking'],
    projectsCompleted: ['Network Security Audit', 'Firewall Configuration'],
    dateJoined: '2023-10-08'
  },
  {
    id: '11',
    fullName: 'Davis Bubelwa',
    roles: ['Machine Learning Engineer', 'Full Stack Developer'],
    skills: ['Machine Learning', 'Full Stack Development', 'Python', 'AI'],
    projectsCompleted: ['ML Prediction Model', 'AI Dashboard'],
    dateJoined: '2023-11-25'
  },
  {
    id: '12',
    fullName: 'Daudi Sospiter',
    roles: ['Database Analytics'],
    skills: ['Database Management', 'Data Analytics', 'SQL'],
    projectsCompleted: ['Data Warehouse', 'Analytics Dashboard'],
    dateJoined: '2023-12-03'
  }
];

export default function TeamPage() {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
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
        <h2 className="text-3xl font-bold text-[var(--brand-gold)] mb-8">Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white cursor-pointer hover:scale-105 transition transform"
              onClick={() => handleMemberClick(member)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[var(--brand-gold)]">{member.fullName}</h3>
                <div
                  className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/chatt');
                  }}
                >
                  <img
                    src="/images/chatt_icon.png"
                    alt="Chat"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2">Roles: {member.roles.join(', ')}</p>
              <p className="text-sm text-gray-300">Joined: {new Date(member.dateJoined).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--card-team-bg)] p-8 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-[var(--brand-gold)]">{selectedMember.fullName}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <strong>Roles:</strong> {selectedMember.roles.join(', ')}
              </div>
              <div>
                <strong>Skills:</strong> {selectedMember.skills.join(', ')}
              </div>
              <div>
                <strong>Projects Completed:</strong>
                <ul className="list-disc list-inside mt-2">
                  {selectedMember.projectsCompleted.map((project, index) => (
                    <li key={index}>{project}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Date Joined:</strong> {new Date(selectedMember.dateJoined).toLocaleDateString()}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => router.push('/chatt')}
                className="px-4 py-2 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}

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
