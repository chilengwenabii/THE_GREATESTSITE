import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies or headers
    const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Forward the request to the backend
    const backendUrl = process.env.BACKEND_URL || 'https://the-greatest-backend-site-1.onrender.com';
    const response = await fetch(`${backendUrl}/users/online-count`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch online users count');
    }

    const data = await response.json();
    return NextResponse.json({ count: data.online_users });
  } catch (error) {
    console.error('Error fetching online users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
