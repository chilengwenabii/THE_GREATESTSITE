'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectComponent from '../../components/project';



interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string;
  roles: string[];
  duties: string[];
}

interface Announcement {
  id: string;
  text: string;
  timestamp: Date;
}

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User>({
    id: '1',
    username: 'THE GREATEST',
    fullName: 'The Greatest',
    email: 'thegreatest@gmail.com',
    phone: '',
    profileImage: '/images/userprofile.png',
    roles: ['Animator', 'Game Developer', 'Data Scientist'],
    duties: ['Lead Animator', 'Project Manager']
  });

  const [editing, setEditing] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentView, setCurrentView] = useState('profile');
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, profileImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleSendAnnouncement = () => {
    if (announcementText.trim()) {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        text: announcementText,
        timestamp: new Date()
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncementText('');
      alert('Announcement sent to group!');
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Fetch user data from API
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const userData = await response.json();
          setUser({
            id: userData.id.toString(),
            username: userData.username,
            fullName: userData.full_name,
            email: userData.email,
            phone: userData.phone || '',
            profileImage: '/images/userprofile.png', // Default image, could be enhanced to fetch from backend
            roles: [], // Backend doesn't have roles/duties, could be added later
            duties: []
          });
          setEditForm({
            username: userData.username || '',
            fullName: userData.full_name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            password: ''
          });
          // Update localStorage with fresh data
          localStorage.setItem('user', JSON.stringify({
            id: userData.id.toString(),
            username: userData.username,
            fullName: userData.full_name,
            email: userData.email,
            phone: userData.phone || '',
            profileImage: '/images/userprofile.png',
            roles: [],
            duties: []
          }));
        } else {
          // Fallback to localStorage if API fails
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setEditForm({
              username: userData.username || '',
              fullName: userData.fullName || '',
              email: userData.email || '',
              phone: userData.phone || '',
              password: ''
            });
          }
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
        // Fallback to localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setEditForm({
            username: userData.username || '',
            fullName: userData.fullName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            password: ''
          });
        }
      }
    };

    // Fetch online users count
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch('/api/online-users');
        const data = await response.json();
        setOnlineUsersCount(data.count);
      } catch (error) {
        console.error('Failed to fetch online users:', error);
      }
    };

    loadUserData();
    fetchOnlineUsers();
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
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

          <img
            src={user.profileImage}
            alt="User Profile"
            className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition"
            onClick={() => router.push('/profile')}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">

        {currentView === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Information */}
            <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
              <h2 className="text-2xl font-bold mb-6 text-[var(--brand-gold)]">Profile Information</h2>

              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white mb-4 cursor-pointer hover:opacity-80 transition"
                  onClick={() => fileInputRef.current?.click()}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition"
                >
                  Change Profile Image
                </button>
              </div>

              {/* Editable Fields */}
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password (leave blank to keep current)</label>
                    <input
                      type="password"
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <strong>Username:</strong> {user.username}
                  </div>
                  <div>
                    <strong>Full Name:</strong> {user.fullName}
                  </div>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {user.phone}
                  </div>
                  <div>
                    <strong>Roles:</strong> {user.roles ? user.roles.join(', ') : ''}
                  </div>
                  <div>
                    <strong>Duties:</strong> {user.duties ? user.duties.join(', ') : ''}
                  </div>
                  <div>
                    <strong>Online Users:</strong> {onlineUsersCount}
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="px-6 py-2 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition mt-4"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-[var(--brand-forest)] text-white rounded-lg hover:bg-[var(--brand-medium-green)] transition mt-4"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

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
              <button
                onClick={handleSendAnnouncement}
                className="w-full px-6 py-3 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
              >
                Send to Group
              </button>

              {/* Recent Announcements */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Recent Announcements</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {announcements.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[var(--brand-gold)] font-bold text-lg mb-2">GOD FIRST</p>
                      <p className="text-white font-semibold">NO EXCUSE</p>
                      <p className="text-[var(--brand-gold)] font-bold text-lg mt-2">ENJOY SUPER HARD WORK</p>
                    </div>
                  ) : (
                    announcements.map((announcement) => (
                      <div key={announcement.id} className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-sm">{announcement.text}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {announcement.timestamp.toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'projects' && <ProjectComponent />}

        {currentView === 'announcements' && (
          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h2 className="text-2xl font-bold mb-6 text-[var(--brand-gold)]">Announcements</h2>
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
                    <p className="text-sm">{announcement.text}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {announcement.timestamp.toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentView === 'calendar' && (
          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] text-white">
            <h2 className="text-2xl font-bold mb-6 text-[var(--brand-gold)]">Calendar</h2>
            <p className="text-gray-400">Calendar view coming soon...</p>
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
