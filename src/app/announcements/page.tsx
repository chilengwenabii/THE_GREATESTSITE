'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Announcement {
  id: string;
  text: string;
  timestamp: Date;
  file?: {
    name: string;
    url: string;
    type: string;
  };
}

export default function Announcements() {
  const router = useRouter();
  const [announcementText, setAnnouncementText] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSendAnnouncement = () => {
    if (announcementText.trim()) {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        text: announcementText,
        timestamp: new Date()
      };
      if (selectedFile) {
        const fileUrl = URL.createObjectURL(selectedFile);
        newAnnouncement.file = {
          name: selectedFile.name,
          url: fileUrl,
          type: selectedFile.type
        };
      }
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncementText('');
      setSelectedFile(null);
      alert('Announcement sent to group!');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Announcement */}
          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h2 className="text-2xl font-bold mb-6 text-[var(--brand-gold)]">Send Announcement</h2>
            <textarea
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Type your announcement here..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] mb-4"
              rows={6}
            />
            <input
              type="file"
              onChange={handleFileSelect}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] mb-4"
            />
            <button
              onClick={handleSendAnnouncement}
              className="w-full px-6 py-3 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
            >
              Send to Group
            </button>
          </div>

          {/* Recent Announcements */}
          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h2 className="text-2xl font-bold mb-6 text-[var(--brand-gold)]">Recent Announcements</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {announcements.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[var(--brand-gold)] font-bold text-xl mb-3">GOD FIRST</p>
                  <p className="text-white font-semibold text-lg">NO EXCUSE</p>
                  <p className="text-[var(--brand-gold)] font-bold text-xl mt-3">ENJOY SUPER HARD WORK</p>
                </div>
              ) : (
                announcements.map((announcement) => (
                  <div key={announcement.id} className="bg-gray-700 p-4 rounded-lg">
                    {announcement.file && (
                      <div className="mb-2">
                        {announcement.file.type.startsWith('image/') ? (
                          <img src={announcement.file.url} alt={announcement.file.name} className="max-w-full h-auto rounded" />
                        ) : (
                          <a href={announcement.file.url} download={announcement.file.name} className="text-blue-400 underline">
                            📎 {announcement.file.name}
                          </a>
                        )}
                      </div>
                    )}
                    <p className="text-sm">{announcement.text}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {announcement.timestamp.toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
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
