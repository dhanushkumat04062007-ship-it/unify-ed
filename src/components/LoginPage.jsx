import React, { useState } from 'react';
import { loginUser } from '../api';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await loginUser(email, password);
      onLogin(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await loginUser('admin@uni.edu', 'adminpass');
      onLogin(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mountain silhouette background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent">
        <svg
          className="absolute bottom-0 w-full h-64 opacity-30"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
        >
          <path
            d="M0,300 L300,150 L600,200 L900,50 L1200,100 L1200,300 Z"
            fill="rgba(0,0,0,0.3)"
          />
          <path
            d="M0,300 L200,200 L500,250 L800,120 L1000,160 L1200,80 L1200,300 Z"
            fill="rgba(0,0,0,0.2)"
          />
        </svg>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">University Assistant</h1>
          <p className="text-white/80">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-pink-600 bg-white/20 border-white/30 rounded focus:ring-pink-500" />
              <span className="ml-2 text-sm text-white/80">Remember Me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            Don't have an account? <span className="text-pink-300 hover:text-pink-200 cursor-pointer">Register</span>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-black/20 rounded-lg">
          <p className="text-white/80 text-sm font-medium mb-2">Demo Credentials:</p>
          <div className="text-xs text-white/70 space-y-1">
            <p>Student: student@uni.edu / 1234</p>
            <p>Faculty: faculty@uni.edu / 1234</p>
            <p>Admin: admin@uni.edu / adminpass</p>
          </div>
        </div>
      </div>

      {/* Hidden admin login button */}
      <button
        onClick={handleAdminLogin}
        className="absolute bottom-2 left-2 text-transparent text-xs hover:text-white/20 transition-colors duration-300"
        disabled={isLoading}
      >
        anchor
      </button>
    </div>
  );
};

export default LoginPage;