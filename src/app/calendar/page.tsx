'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  time: string;
  type: 'meeting' | 'deadline' | 'launch' | 'reminder';
}

export default function CalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Launch Our Game',
      date: '2024-12-21',
      description: 'Official launch of our new game project',
      time: '10:00 AM',
      type: 'launch'
    },
    {
      id: '2',
      title: 'Team Meeting',
      date: '2024-12-15',
      description: 'Weekly team sync meeting',
      time: '2:00 PM',
      type: 'meeting'
    }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    time: '',
    type: 'meeting'
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setFullYear(newDate.getFullYear() - 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDateDoubleClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      time: '',
      type: 'meeting',
      date: date.toISOString().split('T')[0]
    });
    setShowEventModal(true);
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const handleSaveEvent = () => {
    if (!selectedDate) return;

    const eventData: Event = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      title: newEvent.title || '',
      description: newEvent.description || '',
      time: newEvent.time || '',
      type: newEvent.type || 'meeting',
      date: selectedDate.toISOString().split('T')[0]
    };

    if (editingEvent) {
      setEvents(prev => prev.map(event =>
        event.id === editingEvent.id ? eventData : event
      ));
    } else {
      setEvents(prev => [...prev, eventData]);
    }

    setShowEventModal(false);
    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      time: '',
      type: 'meeting'
    });
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-[var(--background-main)] text-[var(--text-primary)]">
      {/* Header - Same as Home Page */}
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

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateYear('prev')}
                  className="text-[var(--brand-gold)] hover:text-yellow-400 text-2xl"
                >
                  «
                </button>
                <h2 className="text-2xl font-bold text-[var(--brand-gold)]">
                  {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateYear('next')}
                  className="text-[var(--brand-gold)] hover:text-yellow-400 text-2xl"
                >
                  »
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="text-[var(--brand-gold)] hover:text-yellow-400 text-xl"
                >
                  ‹
                </button>
                <h3 className="text-xl font-semibold text-white">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="text-[var(--brand-gold)] hover:text-yellow-400 text-xl"
                >
                  ›
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-[var(--brand-gold)] font-semibold py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((date, index) => (
                  <div
                    key={index}
                    className={`min-h-[80px] p-2 border border-gray-600 rounded-lg cursor-pointer transition ${
                      date
                        ? selectedDate && date.toDateString() === selectedDate.toDateString()
                          ? 'bg-[var(--brand-gold)] text-black'
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-transparent'
                    }`}
                    onClick={() => date && handleDateClick(date)}
                    onDoubleClick={() => date && handleDateDoubleClick(date)}
                  >
                    {date && (
                      <>
                        <div className="text-sm font-semibold mb-1">
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {getEventsForDate(date).slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs px-1 py-0.5 rounded text-white ${
                                event.type === 'launch' ? 'bg-red-500' :
                                event.type === 'meeting' ? 'bg-blue-500' :
                                event.type === 'deadline' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              title={event.title}
                            >
                              {event.title.length > 8 ? `${event.title.substring(0, 8)}...` : event.title}
                            </div>
                          ))}
                          {getEventsForDate(date).length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{getEventsForDate(date).length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Date Details */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-bold text-[var(--brand-gold)] mb-4">
                {selectedDate
                  ? `${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                  : 'Select a Date'
                }
              </h3>

              {selectedDate && (
                <button
                  onClick={() => handleDateDoubleClick(selectedDate)}
                  className="w-full mb-4 px-4 py-2 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
                >
                  Add Event
                </button>
              )}

              <div className="space-y-3">
                {selectedDateEvents.length === 0 ? (
                  <p className="text-gray-400">No events for this date</p>
                ) : (
                  selectedDateEvents.map(event => (
                    <div
                      key={event.id}
                      className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600 transition"
                      onClick={() => handleEditEvent(event)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[var(--brand-gold)]">{event.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          event.type === 'launch' ? 'bg-red-500' :
                          event.type === 'meeting' ? 'bg-blue-500' :
                          event.type === 'deadline' ? 'bg-yellow-500' :
                          'bg-green-500'
                        } text-white`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-1">{event.description}</p>
                      <p className="text-xs text-gray-400">{event.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--card-team-bg)] p-6 rounded-2xl border-2 border-[var(--brand-forest)] shadow-[var(--shadow-card)] max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[var(--brand-gold)] mb-4">
              {editingEvent ? 'Edit Event' : 'Add Event'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none"
                  rows={3}
                  placeholder="Event description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as Event['type'] }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                  <option value="launch">Launch</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveEvent}
                className="flex-1 px-4 py-2 bg-[var(--brand-gold)] text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
              >
                {editingEvent ? 'Update' : 'Save'}
              </button>
              {editingEvent && (
                <button
                  onClick={() => handleDeleteEvent(editingEvent.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setEditingEvent(null);
                  setNewEvent({
                    title: '',
                    description: '',
                    time: '',
                    type: 'meeting'
                  });
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
