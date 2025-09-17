import React, { useState, useEffect } from 'react';
import { Clock, MapPin, BookOpen, AlertCircle } from 'lucide-react';
import { getTimetable } from '../api';

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const timetableData = await getTimetable();
      setTimetable(timetableData);
    } catch (err) {
      setError('Failed to load timetable');
    } finally {
      setLoading(false);
    }
  };

  const groupByDay = (schedule) => {
    const grouped = {};
    schedule.forEach(item => {
      if (!grouped[item.day]) {
        grouped[item.day] = [];
      }
      grouped[item.day].push(item);
    });
    return grouped;
  };

  const getDayColor = (day) => {
    const colors = {
      'Monday': 'bg-red-500/20 border-red-500/50 text-red-100',
      'Tuesday': 'bg-blue-500/20 border-blue-500/50 text-blue-100',
      'Wednesday': 'bg-green-500/20 border-green-500/50 text-green-100',
      'Thursday': 'bg-yellow-500/20 border-yellow-500/50 text-yellow-100',
      'Friday': 'bg-purple-500/20 border-purple-500/50 text-purple-100',
      'Saturday': 'bg-pink-500/20 border-pink-500/50 text-pink-100',
      'Sunday': 'bg-gray-500/20 border-gray-500/50 text-gray-100'
    };
    return colors[day] || 'bg-white/10 border-white/30 text-white';
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 h-full">
        <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-white/20">
          <Clock className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Timetable</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm animate-pulse">
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="h-8 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 h-full">
        <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-white/20">
          <Clock className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Timetable</h2>
        </div>
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg flex items-center space-x-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const groupedTimetable = groupByDay(timetable);
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="p-4 md:p-6 h-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
        <div className="flex items-center space-x-2">
          <Clock className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Weekly Timetable</h2>
        </div>
        <button
          onClick={fetchTimetable}
          disabled={loading}
          className="bg-blue-500/80 hover:bg-blue-600/80 text-white px-4 py-2 rounded-lg text-sm transition duration-200 backdrop-blur-sm"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {daysOrder.map(day => {
          const daySchedule = groupedTimetable[day];
          if (!daySchedule) return null;

          return (
            <div key={day} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className={`font-bold text-lg mb-3 px-3 py-1 rounded-lg border ${getDayColor(day)}`}>
                {day}
              </h3>
              <div className="space-y-2">
                {daySchedule.map(item => (
                  <div key={item.id} className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <BookOpen size={16} className="text-purple-400" />
                        <div>
                          <h4 className="font-semibold text-white">{item.course}</h4>
                          <div className="flex items-center space-x-4 text-white/70 text-sm">
                            <div className="flex items-center space-x-1">
                              <Clock size={12} />
                              <span>{item.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin size={12} />
                              <span>{item.room}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {timetable.length === 0 && (
        <div className="text-center py-8 text-white/60">
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <p>No timetable available</p>
        </div>
      )}
    </div>
  );
};

export default Timetable;