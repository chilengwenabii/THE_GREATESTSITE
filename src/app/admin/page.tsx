'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/home');
      return;
    }

    setUser(parsedUser);
  }, [router]);

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Users</h2>
            <p className="text-gray-600">Manage all users, roles, and permissions</p>
          </Link>

          <Link href="/admin/projects" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Projects</h2>
            <p className="text-gray-600">Oversee all projects in the system</p>
          </Link>

          <Link href="/admin/tasks" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Tasks</h2>
            <p className="text-gray-600">Monitor and manage all tasks</p>
          </Link>

          <Link href="/admin/announcements" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Announcements</h2>
            <p className="text-gray-600">Create and manage system announcements</p>
          </Link>

          <Link href="/admin/files" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Files</h2>
            <p className="text-gray-600">View and manage uploaded files</p>
          </Link>

          <Link href="/dashboard/analytics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Analytics</h2>
            <p className="text-gray-600">View system analytics and reports</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
