import React, { useState } from 'react';
import { Users, Search, MessageCircle, User, AlertCircle } from 'lucide-react';
import { searchFaculty } from '../api';

const FacultySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const facultyData = await searchFaculty(searchTerm);
      setFaculty(facultyData);
    } catch (err) {
      setError('Failed to search faculty');
      setFaculty([]);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = (whatsappUrl, facultyName) => {
    // Simulate WhatsApp click - in real app this would open WhatsApp
    alert(`Opening WhatsApp chat with ${facultyName}...\nURL: ${whatsappUrl}`);
    // window.open(whatsappUrl, '_blank');
  };

  const suggestedDepartments = ['Robotics', 'Computer Science', 'Mathematics', 'Physics'];

  return (
    <div className="p-4 md:p-6 h-full">
      <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-white/20">
        <Users className="text-pink-400" size={24} />
        <h2 className="text-xl font-bold text-white">Faculty Search</h2>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-white/50" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter department name (e.g., Robotics, Computer Science)"
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="bg-blue-500/80 hover:bg-blue-600/80 text-white px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Suggested Departments */}
      {!hasSearched && (
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-3">Suggested departments:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedDepartments.map(dept => (
              <button
                key={dept}
                onClick={() => {
                  setSearchTerm(dept);
                  handleSearch({ preventDefault: () => {} });
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition duration-200 backdrop-blur-sm"
                disabled={loading}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-4 flex items-center space-x-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Results */}
      <div className="max-h-80 overflow-y-auto">
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm animate-pulse">
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded mb-1"></div>
                <div className="h-3 bg-white/20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && hasSearched && faculty.length === 0 && !error && (
          <div className="text-center py-8 text-white/60">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No faculty found for "{searchTerm}"</p>
            <p className="text-sm mt-2">Try searching for: Robotics, Computer Science, Mathematics, or Physics</p>
          </div>
        )}

        {faculty.length > 0 && (
          <div className="space-y-4">
            {faculty.map((member) => (
              <div key={member.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500/30 p-2 rounded-full">
                      <User size={20} className="text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{member.name}</h3>
                      <p className="text-white/70 text-sm">{member.specialization}</p>
                      <p className="text-white/50 text-xs mt-1">Faculty Member</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWhatsAppClick(member.whatsapp, member.name)}
                    className="bg-green-500/80 hover:bg-green-600/80 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition duration-200 backdrop-blur-sm"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultySearch;