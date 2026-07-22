'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FileUpload from '@/components/admin/FileUpload';
import ConfirmModal from '@/components/admin/ConfirmModal';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

export default function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [aboutData, setAboutData] = useState({
    title: '', 
    description: '',
    team: [] as any[],
    stats: [] as any[]
  });

  // Deletion confirm state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingType, setDeletingType] = useState<'team' | 'stat' | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  useEffect(() => {
    apiService.get(endPointApi.about)
      .then(data => {
        setAboutData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load About page content');
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const toastId = toast.loading('Saving About page content...');
    try {
      await apiService.put(endPointApi.about, aboutData);
      toast.success('About page content saved successfully!', { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'An error occurred while saving.', { id: toastId });
    }
    setSaving(false);
  };

  const handleChange = (field: string, value: string) => {
    setAboutData({
      ...aboutData,
      [field]: value
    });
  };

  const handleTeamChange = (index: number, field: string, value: string) => {
    const newTeam = [...aboutData.team];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setAboutData({ ...aboutData, team: newTeam });
  };

  const addTeamMember = () => {
    setAboutData({
      ...aboutData,
      team: [...aboutData.team, { name: 'New Member', image: '' }]
    });
    toast.success('New team member added');
  };

  const removeTeamMember = (index: number) => {
    setDeletingType('team');
    setDeletingIndex(index);
    setDeleteConfirmOpen(true);
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...(aboutData.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setAboutData({ ...aboutData, stats: newStats });
  };

  const addStat = () => {
    setAboutData({
      ...aboutData,
      stats: [...(aboutData.stats || []), { label: 'New Stat', value: '100', icon: 'zap' }]
    });
    toast.success('New statistic added');
  };

  const removeStat = (index: number) => {
    setDeletingType('stat');
    setDeletingIndex(index);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingIndex === null || !deletingType) return;

    if (deletingType === 'team') {
      const newTeam = [...aboutData.team];
      newTeam.splice(deletingIndex, 1);
      setAboutData({ ...aboutData, team: newTeam });
      toast.success('Team member removed. Remember to save changes.');
    } else if (deletingType === 'stat') {
      const newStats = [...(aboutData.stats || [])];
      newStats.splice(deletingIndex, 1);
      setAboutData({ ...aboutData, stats: newStats });
      toast.success('Statistic removed. Remember to save changes.');
    }

    setDeleteConfirmOpen(false);
    setDeletingType(null);
    setDeletingIndex(null);
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
      <div className="flex justify-end items-center mb-6">
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
          
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
               <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <h2 className="text-xl font-bold text-[#1B2642]">About Header</h2>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Company Info</p>
               </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Title</label>
                <input 
                  type="text" 
                  value={aboutData.title || ''} 
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Description</label>
                <textarea 
                  value={aboutData.description || ''} 
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 h-32 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-[#1B2642]">Team Members</h2>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Leadership & Staff</p>
                 </div>
              </div>
              <button onClick={addTeamMember} className="text-xs font-bold text-[#1B2642] hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors border border-gray-200 shadow-sm">
                + ADD MEMBER
              </button>
            </div>

            <div className="space-y-6">
              {aboutData.team?.map((member, index) => (
                <div key={index} className="flex flex-col gap-4 p-6 border border-gray-100 rounded-2xl relative group bg-[#F9F7F2]/50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#1B2642] uppercase tracking-wider">Member #{index + 1}</span>
                    <button 
                      onClick={() => removeTeamMember(index)}
                      className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                      title="Remove Member"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Name</label>
                      <input 
                        type="text" 
                        value={member.name || ''} 
                        onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                        className="w-full border border-gray-200 bg-white rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                      />
                    </div>
                  </div>

                  <FileUpload
                    label="Member Profile Image"
                    value={member.image || ''}
                    onChange={(url) => handleTeamChange(index, 'image', url)}
                    helperText="Profile photo (Square/Portrait recommended)"
                  />

                </div>
              ))}
              {(!aboutData.team || aboutData.team.length === 0) && (
                <p className="text-gray-400 text-sm text-center py-6">No team members added yet.</p>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-[#1B2642]">Statistics</h2>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Impact Metrics</p>
                 </div>
              </div>
              <button onClick={addStat} className="text-xs font-bold text-[#1B2642] hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors border border-gray-200 shadow-sm">
                + ADD STAT
              </button>
            </div>

            <div className="space-y-4">
              {aboutData.stats?.map((stat, index) => (
                <div key={index} className="flex flex-wrap md:flex-nowrap items-end gap-4 p-4 border border-gray-100 rounded-2xl bg-[#F9F7F2]/50">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Label</label>
                    <input 
                      type="text" 
                      value={stat.label || ''} 
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Value</label>
                    <input 
                      type="text" 
                      value={stat.value || ''} 
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Icon</label>
                    <input 
                      type="text" 
                      value={stat.icon || ''} 
                      onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                      placeholder="Icon"
                    />
                  </div>
                  <button 
                    onClick={() => removeStat(index)}
                    className="mb-1 text-gray-400 hover:text-red-500 p-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
              {(!aboutData.stats || aboutData.stats.length === 0) && (
                <p className="text-gray-400 text-sm text-center py-6">No statistics added yet.</p>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 mt-6">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-[#1B2642] text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-[#1B2642]/90 disabled:opacity-50 transition-all shadow-md"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={deletingType === 'team' ? "Remove Team Member" : "Remove Statistic"}
        message={deletingType === 'team' ? "Are you sure you want to remove this team member? You will need to click 'Save Changes' to apply this delete to the database." : "Are you sure you want to remove this statistic? You will need to click 'Save Changes' to apply this delete to the database."}
      />
    </div>
  );
}
