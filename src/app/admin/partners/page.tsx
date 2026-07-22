'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FileUpload from '@/components/admin/FileUpload';
import ConfirmModal from '@/components/admin/ConfirmModal';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

export default function AdminPartners() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [partners, setPartners] = useState<any[]>([]);

  // Deletion confirm state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const data = await apiService.get(endPointApi.partners);
      if (Array.isArray(data)) {
        setPartners(data);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast.error('Failed to load partners gallery');
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerChange = (index: number, field: string, value: string) => {
    const newPartners = [...partners];
    newPartners[index] = { ...newPartners[index], [field]: value };
    setPartners(newPartners);
  };

  const addPartner = () => {
    setPartners(prev => [...prev, { name: '', image: '' }]);
    toast.success('New partner added to list');
  };

  const removePartner = (index: number) => {
    setDeletingIndex(index);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingIndex === null) return;
    const newPartners = [...partners];
    newPartners.splice(deletingIndex, 1);
    setPartners(newPartners);
    toast.success('Partner removed from list. Remember to save changes.');
    setDeleteConfirmOpen(false);
    setDeletingIndex(null);
  };

  const handleSave = async () => {
    setSaving(true);
    const toastId = toast.loading('Saving partners gallery...');
    
    try {
      await apiService.put(endPointApi.partners, { partners });
      toast.success('Partners gallery updated successfully!', { id: toastId });
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
           <span className="text-[#1B2642] font-bold">Partners Gallery Management</span>
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
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-[#1B2642]">Our Elite Partners</h2>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Logo Gallery</p>
                 </div>
              </div>
              <button onClick={addPartner} className="text-xs font-bold text-[#1B2642] hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors border border-gray-200 shadow-sm">
                + ADD PARTNER
              </button>
            </div>

            <div className="space-y-6">
              {partners?.map((partner: any, index: number) => (
                <div key={index} className="flex flex-col gap-4 p-6 border border-gray-100 rounded-2xl bg-[#F9F7F2]/50 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#1B2642] uppercase tracking-wider">Partner #{index + 1}</span>
                    <button 
                      onClick={() => removePartner(index)}
                      className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                      title="Remove Partner"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Company Name</label>
                    <input 
                      type="text" 
                      value={partner.name || ''} 
                      onChange={(e) => handlePartnerChange(index, 'name', e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl p-3 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                      placeholder="e.g. Maruti Suzuki"
                    />
                  </div>

                  <FileUpload
                    label="Partner Logo Image"
                    value={partner.image || ''}
                    onChange={(url) => handlePartnerChange(index, 'image', url)}
                    helperText="PNG, SVG, or WEBP transparent logo (Max 5MB)"
                  />
                </div>
              ))}
              {(!partners || partners.length === 0) && (
                <p className="text-gray-400 text-sm text-center py-6">No partners added yet.</p>
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
        title="Remove Partner"
        message="Are you sure you want to remove this partner logo? You will need to click 'Save Changes' to apply this delete to the database."
      />
    </div>
  );
}
