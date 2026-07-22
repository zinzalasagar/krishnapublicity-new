'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Home as HomeIcon, Info, LogOut, Menu, X, Users, Settings as SettingsIcon, MapPin, Sparkles, Palette, Banknote, Wallet, Printer } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Basic auth check
    const token = localStorage.getItem('token');
    
    // If no token and not on login page, redirect
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token) {
      setIsAuthenticated(true);
      // If has token and trying to access login, redirect to dashboard
      if (pathname === '/admin/login') {
        router.push('/admin');
      }
    } else {
       // On login page without token
       setIsAuthenticated(true); // Allow render of login page
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-theme-cream flex items-center justify-center">Loading...</div>;
  }

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Home Page', href: '/admin/home', icon: HomeIcon },
    { name: 'About Page', href: '/admin/about', icon: Info },
    { name: 'Team / Family', href: '/admin/team', icon: Users },
    { name: 'Partners', href: '/admin/partners', icon: Users },
    { name: 'Hoardings', href: '/admin/services/hoardings', icon: MapPin },
    { name: 'Branding', href: '/admin/services/branding', icon: Sparkles },
    { name: 'Graphics', href: '/admin/services/graphics', icon: Palette },
    { name: 'Site Settings', href: '/admin/settings', icon: SettingsIcon },
  ];

  const accountingItems = [
    { name: 'આવક (Income)', href: '/admin/income', icon: Banknote },
    { name: 'જાવક (Expense)', href: '/admin/expense', icon: Wallet },
    { name: 'પ્રિન્ટીંગ (Printing)', href: '/admin/printing', icon: Printer },
  ];

  return (
    <div className="flex h-screen bg-theme-cream font-sans">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed md:relative z-40 w-64 h-full bg-[#1B2642] text-white shadow-[4px_0_24px_rgba(27,38,66,0.1)] transition-transform duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white text-[#1B2642] font-bold flex items-center justify-center rounded-lg text-xl">K</div>
             <h2 className="text-xl font-serif font-extrabold tracking-tight">Krishna.</h2>
          </div>
          <button className="md:hidden text-white/50 hover:text-white transition-colors" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-4 px-4">Management</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-theme-cream text-[#1B2642] shadow-md' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}
          
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-4 px-4 mt-8">Accounting (હિસાબ)</div>
          {accountingItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-theme-cream text-[#1B2642] shadow-md' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/5">
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
               <span className="text-white text-xs font-bold">A</span>
             </div>
             <div>
               <p className="text-sm font-bold text-white">Admin</p>
               <p className="text-[10px] text-white/50">admin@krishna.com</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-white/60 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F9F7F2]">
        
        {/* Desktop Header */}
        <header className="hidden md:flex bg-white border-b border-theme-navy/5 px-8 py-4 items-center justify-between">
          <div className="flex items-center text-sm font-medium text-gray-400">
             <span className="text-gray-400">Sanctuary</span>
             <span className="mx-3 text-gray-300">&gt;</span>
             <span className="text-[#1B2642] font-bold">
               {pathname === '/admin' ? 'Dashboard' 
                : pathname === '/admin/home' ? 'Home Page Management' 
                : pathname === '/admin/about' ? 'About Page Management' 
                : pathname === '/admin/team' ? 'Team & Advertising Family' 
                : pathname === '/admin/settings' ? 'Site Settings & Logo' 
                : pathname === '/admin/income' ? 'Income (આવક)' 
                : pathname === '/admin/expense' ? 'Expense (જાવક)' 
                : pathname === '/admin/printing' ? 'Printing (પ્રિન્ટીંગ)' 
                : 'Partners Gallery'}
             </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 border border-gray-100 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-theme-navy/20 focus:bg-white transition-colors w-64"
              />
            </div>
            
            <div className="w-10 h-10 rounded-full bg-[#1B2642] text-white flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer">
              AD
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-theme-navy/5 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="text-theme-navy/70 hover:text-theme-navy focus:outline-none transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="ml-4 text-xl font-serif font-bold text-theme-navy">Krishna.</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1B2642] text-white flex items-center justify-center font-bold text-xs">
            AD
          </div>
        </header>

        <main className="flex-1 overflow-y-auto min-h-0 p-6 md:p-8 pt-10" data-lenis-prevent="true">
          <div className="w-full max-w-[1600px] mx-auto text-black">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-theme-navy/40 backdrop-blur-sm z-30 md:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
