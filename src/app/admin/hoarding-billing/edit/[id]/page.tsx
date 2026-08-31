'use client';
import { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Trash2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';
import toast from 'react-hot-toast';

interface ItemForm {
  particulars: string;
  cityVillage: string;
  size: string;
  sqft: string;
  ratePerSqft: string;
}

const emptyItem = (): ItemForm => ({ particulars: '', cityVillage: '', size: '', sqft: '', ratePerSqft: '' });

export default function EditHoardingBillingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: '',
    customerName: '',
    customerAddress: '',
    customerGstin: '',
  });
  const [items, setItems] = useState<ItemForm[]>([emptyItem()]);

  useEffect(() => {
    if (!id) return;
    apiService.get(`${endPointApi.hoardingBilling}/${id}`)
      .then((data: any) => {
        setFormData({
          invoiceNumber: data.invoiceNumber || '',
          date: data.date || '',
          customerName: data.customerName || '',
          customerAddress: data.customerAddress || '',
          customerGstin: data.customerGstin || '',
        });
        if (Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items.map((item: any) => ({
            particulars: item.particulars || '',
            cityVillage: item.cityVillage || '',
            size: item.size || '',
            sqft: item.sqft ? item.sqft.toString() : '',
            ratePerSqft: item.ratePerSqft ? item.ratePerSqft.toString() : '',
          })));
        }
      })
      .catch((error) => {
        console.error('Error loading hoarding bill:', error);
        toast.error('Failed to load invoice');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const itemAmount = (item: ItemForm) => (parseFloat(item.sqft) || 0) * (parseFloat(item.ratePerSqft) || 0);
  const subtotal = items.reduce((sum, item) => sum + itemAmount(item), 0);
  const applyGst = !!formData.customerGstin.trim();
  const cgst = applyGst ? subtotal * 0.09 : 0;
  const sgst = applyGst ? subtotal * 0.09 : 0;
  const grandTotal = Math.round(subtotal + cgst + sgst);

  const updateItem = (index: number, field: keyof ItemForm, value: string) => {
    setItems(prev => prev.map((item, idx) => idx === index ? { ...item, [field]: value } : item));
  };

  const addItemRow = () => setItems(prev => [...prev, emptyItem()]);
  const removeItemRow = (index: number) => setItems(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== index) : prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.invoiceNumber || !formData.customerName) {
      toast.error('Invoice number and customer name are required');
      return;
    }
    const validItems = items.filter(item => item.particulars.trim() || itemAmount(item) > 0);
    if (validItems.length === 0) {
      toast.error('Add at least one item');
      return;
    }

    setSubmitting(true);
    try {
      await apiService.put(`${endPointApi.hoardingBilling}/${id}`, {
        ...formData,
        items: validItems.map(item => ({
          particulars: item.particulars,
          cityVillage: item.cityVillage,
          size: item.size,
          sqft: parseFloat(item.sqft) || 0,
          ratePerSqft: parseFloat(item.ratePerSqft) || 0,
        })),
      });
      toast.success('Invoice updated successfully!');
      router.push('/admin/hoarding-billing');
    } catch (error: any) {
      console.error('Error updating hoarding bill:', error);
      toast.error(error.message || 'Error updating invoice');
    } finally {
      setSubmitting(false);
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 bg-white text-gray-600 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-[#1B2642]">Edit Hoarding Invoice</h2>
          <p className="text-sm text-gray-500 mt-1">Update customer and item details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Invoice Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No.</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                value={formData.invoiceNumber} onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer GSTIN <span className="text-gray-400 font-normal">(enter to apply 18% GST)</span></label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                value={formData.customerGstin} onChange={e => setFormData({ ...formData, customerGstin: e.target.value.toUpperCase() })} placeholder="24XXXXX0000X1ZX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} required />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Address</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                value={formData.customerAddress} onChange={e => setFormData({ ...formData, customerAddress: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Particulars</h3>
            <button type="button" onClick={addItemRow} className="px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 flex items-center gap-1 font-bold">
              <Plus className="w-3.5 h-3.5" /> Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[820px]">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="py-2 pr-2 font-medium">Particulars</th>
                  <th className="py-2 pr-2 font-medium">City/Village</th>
                  <th className="py-2 pr-2 font-medium w-24">Size</th>
                  <th className="py-2 pr-2 font-medium w-20">Sq.Ft</th>
                  <th className="py-2 pr-2 font-medium w-28">Rate/Sq.Ft</th>
                  <th className="py-2 pr-2 font-medium w-28 text-right">Amount</th>
                  <th className="py-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 pr-2">
                      <textarea rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B2642]/20 outline-none resize-y"
                        value={item.particulars} onChange={e => updateItem(idx, 'particulars', e.target.value)} placeholder={"e.g. Nesvad Chokdi Display\nPeriod: 21.03.23 to 20.04.26"} />
                    </td>
                    <td className="py-2 pr-2">
                      <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                        value={item.cityVillage} onChange={e => updateItem(idx, 'cityVillage', e.target.value)} placeholder="e.g. Mahuva" />
                    </td>
                    <td className="py-2 pr-2">
                      <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                        value={item.size} onChange={e => updateItem(idx, 'size', e.target.value)} placeholder="20x10" />
                    </td>
                    <td className="py-2 pr-2">
                      <input type="number" min="0" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                        value={item.sqft} onChange={e => updateItem(idx, 'sqft', e.target.value)} />
                    </td>
                    <td className="py-2 pr-2">
                      <input type="number" min="0" step="0.01" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B2642]/20 outline-none"
                        value={item.ratePerSqft} onChange={e => updateItem(idx, 'ratePerSqft', e.target.value)} />
                    </td>
                    <td className="py-2 pr-2 text-right text-sm font-bold text-[#1B2642] whitespace-nowrap">
                      ₹{itemAmount(item).toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 text-center">
                      <button type="button" onClick={() => removeItemRow(idx)} disabled={items.length === 1} className="text-rose-400 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="max-w-xs ml-auto space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-[#1B2642]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {applyGst ? (
              <>
                <div className="flex justify-between text-gray-500">
                  <span>CGST @ 9%</span>
                  <span>₹{cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>SGST @ 9%</span>
                  <span>₹{sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-400 italic">Normal bill — enter a Customer GSTIN above to apply 18% GST.</p>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-100 text-base font-bold text-[#1B2642]">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 mr-4 text-gray-600 hover:text-gray-800 font-medium">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="px-8 py-3 bg-[#1B2642] text-white rounded-xl hover:bg-[#1B2642]/90 flex items-center gap-2 font-medium disabled:opacity-50">
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
