'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Authenticating...');

    try {
      const data = await apiService.post(endPointApi.authLogin, { email, password });
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        toast.success('Welcome back, Admin!', { id: toastId });
        router.push('/admin');
      } else {
        toast.error(data.message || 'Login failed. Invalid credentials.', { id: toastId });
      }
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
          <h1 className="font-serif text-2xl font-semibold text-[#1B2642] mb-1">Admin Sanctuary</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#1B2642]/40 font-bold">Management & control center</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[#1B2642]/40 text-[10px] font-bold uppercase tracking-wider" htmlFor="password">
                Passcode
              </label>
              <a href="#" className="text-[10px] font-bold text-[#1B2642] hover:underline">Forgot?</a>
            </div>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <svg className="h-4 w-4 text-[#1B2642]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
               </div>
               <input
                 id="password"
                 type={showPassword ? 'text' : 'password'}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-10 pr-10 py-3.5 rounded-xl border-none bg-[#EEF2F9] focus:bg-[#E5EAF4] focus:outline-none focus:ring-0 transition-colors text-sm font-bold tracking-widest text-[#1B2642]"
                 required
                 placeholder="••••••"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#1B2642]/40 hover:text-[#1B2642]/60 focus:outline-none"
               >
                 {showPassword ? (
                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                   </svg>
                 ) : (
                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                   </svg>
                 )}
               </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#1B2642] hover:bg-[#131B30] text-white text-xs font-bold py-4 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B2642] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              Login <span>&rarr;</span>
            </button>
          </div>
        </form>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1B2642]/30">POWERED BY KRISHNA PUBLICITY</p>
      </div>
    </div>
  );
}
