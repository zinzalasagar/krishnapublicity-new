'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FileUpload from '@/components/admin/FileUpload';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    logo: '',
    brandName: 'KRISHNA PUBLICITY',
    tagline: 'PREMIUM OUTDOOR ADVERTISING',
    email: 'krishnapublicity2016@gmail.com',
    phone: '+91 7878161516',
    altPhone: '+91 78740 51516',
    address: 'C-107, First Floor, Ambikapark Apt, Opp. HDFC Bank, Nr. Laxmi Tiles, Punagam, Surat, Gujarat, India',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1241.3165544824567!2d72.86615550177982!3d21.202212736660353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f7d045e2bc1%3A0x6e0d37977ac07b2c!2sKRISHNA%20PUBLICITY!5e0!3m2!1sen!2sin!4v1730006460466!5m2!1sen!2sin',
    socialLinks: {
      instagram: 'https://instagram.com/krishnapublicity_surat',
      facebook: 'https://www.facebook.com/krishna.pubgps',
      twitter: 'https://twitter.com/Mrsanju_krishna'
    },
    servicesCards: {
      hoardings: {
        title: 'OUTDOOR HOARDINGS',
        description: 'High-impact premium billboard displays positioned in strategic, high-traffic prime locations.',
        image: '/serviceimage/hordingimage.jpg'
      },
      branding: {
        title: 'BRAND IDENTITY',
        description: 'Distinctive logo design, complete branding suites, and brand guidelines that define your presence.',
        image: '/serviceimage/brandingmian.jpg'
      },
      graphics: {
        title: 'CREATIVE DESIGN',
        description: 'State-of-the-art graphic illustrations, promotional ads, and immersive visual campaigns.',
        image: '/serviceimage/graphicmain1.jpg'
      }
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await apiService.get(endPointApi.settings);
      if (data) {
        setSettings(prev => ({
          ...prev,
          ...data,
          socialLinks: {
            ...prev.socialLinks,
            ...(data.socialLinks || {})
          },
          servicesCards: {
            ...prev.servicesCards,
            ...(data.servicesCards || {})
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value
      }
    }));
  };

  const handleServiceCardChange = (serviceKey: 'hoardings' | 'branding' | 'graphics', field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      servicesCards: {
        ...prev.servicesCards,
        [serviceKey]: {
          ...prev.servicesCards[serviceKey],
          [field]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const toastId = toast.loading('Saving site settings...');

    try {
      await apiService.put(endPointApi.settings, settings);
      toast.success('Site settings & logo updated successfully!', { id: toastId });
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setSaving(false);
    }
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
          <span className="text-[#1B2642] font-bold">Site Settings & Logo Management</span>
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
        <div className="space-y-6">

          {/* Logo & Brand Identity */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1B2642]">Logo & Brand Identity</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Header & Footer Branding</p>
              </div>
            </div>

            <div className="space-y-6">
              <FileUpload
                label="Site Logo Image"
                value={settings.logo || ''}
                onChange={(url) => handleChange('logo', url)}
                helperText="PNG, SVG, or WEBP transparent logo (Recommended height: 60px - 100px)"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Brand Name</label>
                  <input
                    type="text"
                    value={settings.brandName || ''}
                    onChange={(e) => handleChange('brandName', e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    placeholder="KRISHNA PUBLICITY"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline || ''}
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    placeholder="PREMIUM OUTDOOR ADVERTISING"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1B2642]">Contact Information</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Displayed in Contact & Footer Sections</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={settings.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    placeholder="krishnapublicity2016@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Primary Phone</label>
                  <input
                    type="text"
                    value={settings.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    placeholder="+91 7878161516"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Alt Phone</label>
                  <input
                    type="text"
                    value={settings.altPhone || ''}
                    onChange={(e) => handleChange('altPhone', e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    placeholder="+91 78740 51516"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Office Location Address</label>
                <textarea
                  value={settings.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-xl p-3.5 h-24 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                  placeholder="C-107, First Floor, Ambikapark Apt, Opp. HDFC Bank, Nr. Laxmi Tiles, Punagam, Surat, Gujarat, India"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Google Maps Embed URL</label>
                <textarea
                  value={settings.mapUrl || ''}
                  onChange={(e) => handleChange('mapUrl', e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-xl p-3 text-xs font-mono focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642] h-20"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1B2642]">Social Media Links</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Footer Social Icons</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Instagram URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.instagram || ''}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Facebook URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.facebook || ''}
                  onChange={(e) => handleSocialChange('facebook', e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Twitter URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.twitter || ''}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>

          {/* Homepage Service Cards */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1B2642]">Homepage Service Cards</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Manage 3 core services on homepage</p>
              </div>
            </div>

            <div className="space-y-12">
              {/* Hoardings Card */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#1B2642] border-b pb-2">1. Outdoor Hoardings Card</h3>
                <FileUpload
                  label="Hoardings Image"
                  value={settings.servicesCards?.hoardings?.image || ''}
                  onChange={(url) => handleServiceCardChange('hoardings', 'image', url)}
                  helperText="Recommended size: 800x600px"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Title</label>
                    <input
                      type="text"
                      value={settings.servicesCards?.hoardings?.title || ''}
                      onChange={(e) => handleServiceCardChange('hoardings', 'title', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Description</label>
                    <input
                      type="text"
                      value={settings.servicesCards?.hoardings?.description || ''}
                      onChange={(e) => handleServiceCardChange('hoardings', 'description', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                </div>
              </div>

              {/* Branding Card */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#1B2642] border-b pb-2">2. Brand Identity Card</h3>
                <FileUpload
                  label="Branding Image"
                  value={settings.servicesCards?.branding?.image || ''}
                  onChange={(url) => handleServiceCardChange('branding', 'image', url)}
                  helperText="Recommended size: 800x600px"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Title</label>
                    <input
                      type="text"
                      value={settings.servicesCards?.branding?.title || ''}
                      onChange={(e) => handleServiceCardChange('branding', 'title', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Description</label>
                    <input
                      type="text"
                      value={settings.servicesCards?.branding?.description || ''}
                      onChange={(e) => handleServiceCardChange('branding', 'description', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                </div>
              </div>

              {/* Graphics Card */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#1B2642] border-b pb-2">3. Creative Design Card</h3>
                <FileUpload
                  label="Graphics Image"
                  value={settings.servicesCards?.graphics?.image || ''}
                  onChange={(url) => handleServiceCardChange('graphics', 'image', url)}
                  helperText="Recommended size: 800x600px"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Title</label>
                    <input
                      type="text"
                      value={settings.servicesCards?.graphics?.title || ''}
                      onChange={(e) => handleServiceCardChange('graphics', 'title', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Description</label>
                    <input
                      type="text"
                      value={settings.servicesCards?.graphics?.description || ''}
                      onChange={(e) => handleServiceCardChange('graphics', 'description', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
