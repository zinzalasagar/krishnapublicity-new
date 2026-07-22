'use client';
import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';
import toast from 'react-hot-toast';

export default function AddIncomePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    details: '',
    customerName: '',
    date: '',
    totalBill: '',
    givenAmount: '',
  });

  const handleCalculatePending = (total: string, given: string) => {
    const t = parseFloat(total) || 0;
    const g = parseFloat(given) || 0;
    return (t - g).toString();
  };

  const pendingAmount = handleCalculatePending(formData.totalBill, formData.givenAmount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName || !formData.customerName) {
      toast.error('કૃપા કરીને જરૂરી માહિતી ભરો (Please fill required fields)');
      return;
    }
    
    if (parseFloat(pendingAmount) < 0) {
      toast.error('આપેલ રકમ ટોટલ બિલ કરતા વધારે હોઈ શકે નહીં (Given amount cannot be greater than total bill)');
      return;
    }
    
    setSubmitting(true);
    try {
      await apiService.post(endPointApi.income, {
        ...formData,
        totalBill: parseFloat(formData.totalBill) || 0,
        givenAmount: parseFloat(formData.givenAmount) || 0,
        pendingAmount: parseFloat(pendingAmount) || 0
      });
      toast.success('આવક સફળતાપૂર્વક ઉમેરવામાં આવી (Income added successfully)!');
      router.push('/admin/income');
    } catch (error) {
      console.error('Error saving income:', error);
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
          <h2 className="text-2xl font-bold text-[#1B2642]">નવી આવક ઉમેરો (Add New Income)</h2>
          <p className="text-sm text-gray-500 mt-1">આવકની વિગતો દાખલ કરો</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">બિલ નં (Bill No)</label>
              <input type="text" readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none text-gray-500 font-medium" 
                value="ઓટો-જનરેટ થશે (Auto-generated)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">પ્રોડક્ટનું નામ (Product Name)</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.productName} onChange={e => setFormData({...formData, productName: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">વિગત (Details)</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">કસ્ટમરનું નામ (Customer Name)</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">તારીખ (Date)</label>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ટોટલ બિલ (Total Bill)</label>
              <input type="number" min="0" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.totalBill} onChange={e => setFormData({...formData, totalBill: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">આપેલ રકમ (Given Amount)</label>
              <input type="number" min="0" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none" 
                value={formData.givenAmount} onChange={e => setFormData({...formData, givenAmount: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">બાકી રકમ (Pending Amount)</label>
              <input type="text" readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none font-bold text-red-600" 
                value={pendingAmount} />
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
