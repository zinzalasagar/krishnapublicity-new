'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

export default function AdminProfile() {
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [updatingAuth, setUpdatingAuth] = useState(false);
  const [showAuthPassword, setShowAuthPassword] = useState(false);

  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [showNewAdminPassword, setShowNewAdminPassword] = useState(false);

  useEffect(() => {
    // Fetch user data from local storage if available to populate auth email
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.email) setAuthEmail(user.email);
      } catch (e) {
        // Handle json parse error
      }
    }
  }, []);

  const handleUpdateAuth = async () => {
    setUpdatingAuth(true);
    const toastId = toast.loading('Updating credentials...');

    try {
      const payload: any = { email: authEmail };
      if (authPassword) payload.password = authPassword;

      const data = await apiService.put(endPointApi.authProfile, payload);
      
      // Update local storage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.email = data.email;
        if (data.token) user.token = data.token;
        localStorage.setItem('user', JSON.stringify(user));
        if (data.token) localStorage.setItem('token', data.token);
      }

      toast.success('Credentials updated successfully!', { id: toastId });
      setAuthPassword(''); // Clear password field after successful update
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setUpdatingAuth(false);
    }
  };

  const handleCreateAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword) {
      toast.error('Please provide email and password');
      return;
    }

    setCreatingAdmin(true);
    const toastId = toast.loading('Creating new admin...');

    try {
      await apiService.post(endPointApi.authRegister, {
        email: newAdminEmail,
        password: newAdminPassword
      });
      
      toast.success('New Admin created successfully!', { id: toastId });
      setNewAdminEmail('');
      setNewAdminPassword('');
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setCreatingAdmin(false);
    }
  };

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-sm font-medium text-gray-500">
          <span>Sanctuary</span>
          <span className="mx-2">&gt;</span>
          <span className="text-[#1B2642] font-bold">Admin Profile</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Admin Credentials */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#1B2642]">Admin Credentials</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Update login email and password</p>
              </div>
              <button
                onClick={handleUpdateAuth}
                disabled={updatingAuth}
                className="bg-gray-100 text-[#1B2642] px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 disabled:opacity-50 transition-all"
              >
                {updatingAuth ? 'Updating...' : 'Update Credentials'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Login Email</label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                placeholder="admin@krishnapublicity.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">New Password (leave blank to keep current)</label>
              <div className="relative">
                <input
                  type={showAuthPassword ? "text" : "password"}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-xl p-3.5 pr-12 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowAuthPassword(!showAuthPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B2642] transition-colors"
                >
                  {showAuthPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Create New Admin */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#1B2642]">Create New Admin</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Grant panel access to a new user</p>
              </div>
              <button
                onClick={handleCreateAdmin}
                disabled={creatingAdmin}
                className="bg-gray-100 text-[#1B2642] px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 disabled:opacity-50 transition-all"
              >
                {creatingAdmin ? 'Creating...' : 'Create Admin'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                placeholder="newadmin@krishnapublicity.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Initial Password</label>
              <div className="relative">
                <input
                  type={showNewAdminPassword ? "text" : "password"}
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-xl p-3.5 pr-12 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewAdminPassword(!showNewAdminPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B2642] transition-colors"
                >
                  {showNewAdminPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
