'use client';
import { useState } from 'react';
import { Plus, ArrowLeft, Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';
import toast from 'react-hot-toast';

export default function AddPrintingPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pressName: '',
    details: '',
    amount: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pressName) {
      toast.error('કૃપા કરીને જરૂરી માહિતી ભરો (Please fill required fields)');
      return;
    }
    
    setSubmitting(true);
    try {
      await apiService.post(endPointApi.printing, {
        ...formData,
        amount: parseFloat(formData.amount) || 0
      });
      toast.success('પ્રિન્ટીંગ સફળતાપૂર્વક ઉમેરવામાં આવી (Printing added successfully)!');
      router.push('/admin/printing');
    } catch (error) {
      console.error('Error saving printing:', error);
      toast.error('ભૂલ આવી (Error saving record)');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 bg-white text-gray-600 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-[#1B2642]">નવી પ્રિન્ટીંગ ઉમેરો (Add New Printing)</h2>
          <p className="text-sm text-gray-500 mt-1">પ્રિન્ટીંગની વિગતો દાખલ કરો</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                પ્રેસનું નામ (Press Name)
                <Printer className="w-3 h-3 text-gray-400" />
              </label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.pressName} onChange={e => setFormData({...formData, pressName: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">વિગત (Details)</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">રકમ (Amount)</label>
              <input type="number" min="0" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 mr-4 text-gray-600 hover:text-gray-800 font-medium">
              રદ કરો (Cancel)
            </button>
            <button type="submit" disabled={submitting} className="px-8 py-3 bg-[#1B2642] text-white rounded-xl hover:bg-[#1B2642]/90 flex items-center gap-2 font-medium disabled:opacity-50">
              {submitting ? 'સેવિંગ...' : <><Plus className="w-5 h-5" /> સેવ કરો (Save)</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
