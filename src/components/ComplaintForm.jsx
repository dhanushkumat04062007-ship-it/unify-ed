import React, { useState } from 'react';
import { MessageSquare, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { submitComplaint } from '../api';

const ComplaintForm = ({ user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Academic',
    priority: 'Medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    'Academic', 'Administrative', 'Infrastructure', 'Hostel', 'Library', 'Transport', 'Other'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const complaintData = {
        ...formData,
        studentEmail: user.email,
        studentName: user.name,
        timestamp: new Date().toISOString()
      };

      // For now, just show alert with the data
      alert(`Complaint Submitted!\n\nTitle: ${complaintData.title}\nDescription: ${complaintData.description}\nCategory: ${complaintData.category}\nPriority: ${complaintData.priority}\nSubmitted by: ${complaintData.studentName}`);

      const response = await submitComplaint(complaintData);
      
      setSubmitStatus({ type: 'success', message: response.message });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Academic',
        priority: 'Medium'
      });

    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit complaint. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 h-full">
      <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-white/20">
        <MessageSquare className="text-pink-400" size={24} />
        <h2 className="text-xl font-bold text-white">Submit a Complaint</h2>
      </div>

      {submitStatus && (
        <div className={`mb-4 px-4 py-3 rounded-lg border flex items-center space-x-2 ${
          submitStatus.type === 'success'
            ? 'bg-green-500/20 border-green-500/50 text-green-100'
            : 'bg-red-500/20 border-red-500/50 text-red-100'
        }`}>
          {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{submitStatus.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-h-96 overflow-y-auto">
        {/* Title */}
        <div>
          <label className="block text-white/90 text-sm font-medium mb-2">
            Complaint Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
            placeholder="Brief title for your complaint"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Category and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
              disabled={isSubmitting}
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-purple-900">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
              disabled={isSubmitting}
            >
              {priorities.map(priority => (
                <option key={priority} value={priority} className="bg-purple-900">
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-white/90 text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm resize-none"
            placeholder="Please provide detailed information about your complaint..."
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Student Info (Read-only) */}
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <h3 className="text-white font-medium mb-2">Complaint will be submitted as:</h3>
          <p className="text-white/70 text-sm">Name: {user.name}</p>
          <p className="text-white/70 text-sm">Email: {user.email}</p>
          <p className="text-white/70 text-sm">Role: {user.role}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Send size={18} />
              <span>Submit Complaint</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;