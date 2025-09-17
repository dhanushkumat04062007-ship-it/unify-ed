import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { getExamUpdates } from '../api';

const ExamUpdates = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const examData = await getExamUpdates();
      setExams(examData);
    } catch (err) {
      setError('Failed to load exam updates');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilExam = (dateString) => {
    const examDate = new Date(dateString);
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (daysUntil) => {
    if (daysUntil < 0) return 'bg-gray-500';
    if (daysUntil <= 3) return 'bg-red-500';
    if (daysUntil <= 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = (daysUntil) => {
    if (daysUntil < 0) return 'Completed';
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    return `${daysUntil} days left`;
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 h-full">
        <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-white/20">
          <Calendar className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Exam Updates</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm animate-pulse">
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="h-3 bg-white/20 rounded mb-1"></div>
              <div className="h-3 bg-white/20 rounded w-1/2"></div>
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
          <Calendar className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Exam Updates</h2>
        </div>
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg flex items-center space-x-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 h-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
        <div className="flex items-center space-x-2">
          <Calendar className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Exam Updates</h2>
        </div>
        <button
          onClick={fetchExams}
          disabled={loading}
          className="bg-blue-500/80 hover:bg-blue-600/80 text-white px-4 py-2 rounded-lg text-sm transition duration-200 backdrop-blur-sm"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 max-h-96 overflow-y-auto">
        {exams.map((exam) => {
          const daysUntil = getDaysUntilExam(exam.date);
          return (
            <div key={exam.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen size={18} className="text-purple-400" />
                    <h3 className="font-semibold text-white">{exam.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm mb-1">{exam.course}</p>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <Clock size={14} />
                    <span>{formatDate(exam.date)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`${getStatusColor(daysUntil)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                    {getStatusText(daysUntil)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {exams.length === 0 && (
        <div className="text-center py-8 text-white/60">
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p>No exam updates available</p>
        </div>
      )}
    </div>
  );
};

export default ExamUpdates;