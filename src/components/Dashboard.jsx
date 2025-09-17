import React, { useState } from 'react';
import ChatBot from './ChatBot';
import ExamUpdates from './ExamUpdates';
import Timetable from './Timetable';
import QuestionPapers from './QuestionPapers';
import ComplaintForm from './ComplaintForm';
import FacultySearch from './FacultySearch';
import { LogOut, MessageCircle, Calendar, Clock, FileText, MessageSquare, Users } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('chat');

  const sections = [
    { id: 'chat', name: 'ChatBot', icon: MessageCircle, component: ChatBot },
    { id: 'exams', name: 'Exam Updates', icon: Calendar, component: ExamUpdates },
    { id: 'timetable', name: 'Timetable', icon: Clock, component: Timetable },
    { id: 'papers', name: 'Question Papers', icon: FileText, component: QuestionPapers },
    { id: 'complaints', name: 'Complaints', icon: MessageSquare, component: ComplaintForm },
    { id: 'faculty', name: 'Faculty Search', icon: Users, component: FacultySearch },
  ];

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent">
        <svg
          className="absolute bottom-0 w-full h-48 opacity-20"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L300,100 L600,150 L900,50 L1200,80 L1200,200 Z"
            fill="rgba(0,0,0,0.3)"
          />
        </svg>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 md:p-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome, {user.name}
              </h1>
              <p className="text-white/80 capitalize">
                Role: <span className="font-semibold">{user.role}</span>
              </p>
            </div>
            <button
              onClick={onLogout}
              className="mt-4 md:mt-0 flex items-center space-x-2 bg-red-500/80 hover:bg-red-600/80 text-white px-4 py-2 rounded-lg transition duration-200 backdrop-blur-sm"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-col items-center space-y-2 p-3 md:p-4 rounded-xl transition duration-200 ${
                    activeSection === section.id
                      ? 'bg-pink-500/50 text-white border border-pink-400/50'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-transparent'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="text-xs md:text-sm font-medium text-center">
                    {section.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 min-h-[600px]">
          {ActiveComponent && <ActiveComponent user={user} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;