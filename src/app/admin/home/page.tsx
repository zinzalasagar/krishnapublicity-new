'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FileUpload from '@/components/admin/FileUpload';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

export default function AdminHome() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [homeData, setHomeData] = useState<{
    hero: { title: string; subtitle: string; image?: string };
    feature: {
      badge: string;
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      image?: string;
    };
  }>({
    hero: { title: '', subtitle: '', image: '' },
    feature: {
      badge: 'Welcome to Krishna Publicity',
      title: 'Creativity That Elevates the Impact of Every Campaign',
      description: '',
      buttonText: 'Discover More',
      buttonLink: '#services',
      image: ''
    }
  });

  useEffect(() => {
    apiService.get(endPointApi.home)
      .then(data => {
        setHomeData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load home page content');
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const toastId = toast.loading('Saving home page content...');
    try {
      await apiService.put(endPointApi.home, homeData);
      toast.success('Home page content saved successfully!', { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'An error occurred while saving.', { id: toastId });
    }
    setSaving(false);
  };

  const handleHeroChange = (field: string, value: string) => {
    setHomeData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const handleFeatureChange = (field: string, value: string) => {
    setHomeData(prev => ({
      ...prev,
      feature: { ...prev.feature, [field]: value }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1B2642]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-sm font-medium text-gray-500">
           <span>Sanctuary</span>
           <span className="mx-2">&gt;</span>
           <span className="text-[#1B2642] font-bold">Home Page Management</span>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1B2642] text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-[#1B2642]/90 disabled:opacity-50 transition-all shadow-md active:scale-95"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Main Form Area */}
        <div className="space-y-8">
          
          {/* Hero Section Card */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
               <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
               </div>
               <div>
                 <h2 className="text-xl font-bold text-[#1B2642]">Hero Section</h2>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Primary Hero Text & Banner Image</p>
               </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Heading Title</label>
                <input 
                  type="text" 
                  value={homeData.hero?.title || ''} 
                  onChange={(e) => handleHeroChange('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm"
                  placeholder="Elevate Your Market Presence"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Hero Subtitle / Description</label>
                <textarea 
                  value={homeData.hero?.subtitle || ''} 
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 h-32 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm leading-relaxed"
                />
              </div>

              <div>
                <FileUpload
                  label="Hero Background Image"
                  value={homeData.hero?.image || ''}
                  onChange={(url) => handleHeroChange('image', url)}
                  helperText="Upload a high-resolution hero background image (1920x1080 recommended)"
                />
              </div>
            </div>
          </div>

          {/* Feature Showcase Section Card */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
               <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
               </div>
               <div>
                 <h2 className="text-xl font-bold text-[#1B2642]">Feature Showcase Section</h2>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Creative Campaign Showcase & Illustration</p>
               </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Top Badge Text</label>
                <input 
                  type="text" 
                  value={homeData.feature?.badge || ''} 
                  onChange={(e) => handleFeatureChange('badge', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm"
                  placeholder="Welcome to Krishna Publicity"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Section Heading</label>
                <input 
                  type="text" 
                  value={homeData.feature?.title || ''} 
                  onChange={(e) => handleFeatureChange('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm"
                  placeholder="Creativity That Elevates the Impact of Every Campaign"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Feature Description</label>
                <textarea 
                  value={homeData.feature?.description || ''} 
                  onChange={(e) => handleFeatureChange('description', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 h-32 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Button Text</label>
                  <input 
                    type="text" 
                    value={homeData.feature?.buttonText || ''} 
                    onChange={(e) => handleFeatureChange('buttonText', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    placeholder="Discover More"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Button Link URL</label>
                  <input 
                    type="text" 
                    value={homeData.feature?.buttonLink || ''} 
                    onChange={(e) => handleFeatureChange('buttonLink', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    placeholder="#services"
                  />
                </div>
              </div>

              <div>
                <FileUpload
                  label="Feature Section Image"
                  value={homeData.feature?.image || ''}
                  onChange={(url) => handleFeatureChange('image', url)}
                  helperText="Upload feature banner/illustration image (800x600 recommended)"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
