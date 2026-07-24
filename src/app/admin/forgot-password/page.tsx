'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import endPointApi from '@/services/endPointApi';
import apiService from '@/services/apiService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Sending reset link...');

    try {
      // Direct fetch or via apiService, assuming forgotpassword is added to endPointApi
      const data = await apiService.post(endPointApi.authForgotPassword, { email });
      toast.success(data.message || 'Email sent. Please check your inbox (or console).', { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'An error occurred. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2] font-sans">
      <div className="max-w-md w-full bg-white px-10 py-12 rounded-[2rem] shadow-[0_8px_40px_rgba(27,38,66,0.06)] border border-[#1B2642]/5 relative">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-10 h-10 bg-[#1B2642] text-white font-bold flex items-center justify-center rounded-xl text-2xl mb-4">K</div>
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px w-8 bg-gray-200"></div>
             <div className="text-gray-300">✧</div>
             <div className="h-px w-8 bg-gray-200"></div>
          </div>
          <h1 className="font-serif text-2xl font-semibold text-[#1B2642] mb-1">Forgot Password</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#1B2642]/40 font-bold">Enter your email to reset</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#1B2642]/40 text-[10px] font-bold uppercase tracking-wider mb-2" htmlFor="email">
              Identity
            </label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <svg className="h-4 w-4 text-[#1B2642]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               </div>
               <input
                 id="email"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full pl-10 pr-4 py-3.5 rounded-xl border-none bg-[#EEF2F9] focus:bg-[#E5EAF4] focus:outline-none focus:ring-0 transition-colors text-sm font-medium text-[#1B2642]"
                 required
                 placeholder="admin@krishna.com"
               />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B2642] hover:bg-[#131B30] text-white text-xs font-bold py-4 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B2642] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Link'} <span>&rarr;</span>
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <button onClick={() => router.push('/admin/login')} className="text-[10px] font-bold text-[#1B2642] hover:underline uppercase tracking-wider">
            &larr; Back to Login
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1B2642]/30">POWERED BY KRISHNA PUBLICITY</p>
      </div>
    </div>
  );
}
