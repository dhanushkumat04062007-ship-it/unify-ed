import React, { useState, useEffect } from 'react';
import { FileText, Download, AlertCircle, Search } from 'lucide-react';
import { getQuestionPapers } from '../api';

const QuestionPapers = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchQuestionPapers();
  }, []);

  useEffect(() => {
    const filtered = papers.filter(paper =>
      paper.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.year.includes(searchTerm)
    );
    setFilteredPapers(filtered);
  }, [papers, searchTerm]);

  const fetchQuestionPapers = async () => {
    try {
      setLoading(true);
      const papersData = await getQuestionPapers();
      setPapers(papersData);
      setFilteredPapers(papersData);
    } catch (err) {
      setError('Failed to load question papers');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (paper) => {
    // Simulate download - in real app this would trigger actual download
    alert(`Downloading: ${paper.course} ${paper.year} Question Paper`);
    // window.open(paper.downloadUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 h-full">
        <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-white/20">
          <FileText className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Question Papers</h2>
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
          <FileText className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Question Papers</h2>
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
          <FileText className="text-pink-400" size={24} />
          <h2 className="text-xl font-bold text-white">Question Papers</h2>
        </div>
        <button
          onClick={fetchQuestionPapers}
          disabled={loading}
          className="bg-blue-500/80 hover:bg-blue-600/80 text-white px-4 py-2 rounded-lg text-sm transition duration-200 backdrop-blur-sm"
        >
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-white/50" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by course or year..."
            className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 max-h-80 overflow-y-auto">
        {filteredPapers.map((paper) => (
          <div key={paper.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <FileText size={20} className="text-purple-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">{paper.course}</h3>
                  <p className="text-white/70 text-sm">Year: {paper.year}</p>
                  <p className="text-white/50 text-xs mt-1">PDF Format • Previous Year Question Paper</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(paper)}
                className="bg-green-500/80 hover:bg-green-600/80 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition duration-200 backdrop-blur-sm"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPapers.length === 0 && !loading && (
        <div className="text-center py-8 text-white/60">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p>{searchTerm ? 'No papers found matching your search' : 'No question papers available'}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionPapers;