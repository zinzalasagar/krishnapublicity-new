'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Download, Search, Receipt } from 'lucide-react';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import ConfirmModal from '@/components/admin/ConfirmModal';

interface HoardingBill {
  _id: string;
  invoiceNumber: string;
  date?: string;
  customerName: string;
  customerGstin?: string;
  totalAmount: number;
}

export default function HoardingBillingPage() {
  const [entries, setEntries] = useState<HoardingBill[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchBills = async () => {
    try {
      setLoading(true);
      let query = `?page=${currentPage}&limit=${pageSize}`;
      if (searchTerm) query += `&search=${encodeURIComponent(searchTerm)}`;

      const data = await apiService.get(`${endPointApi.hoardingBilling}${query}`);
      if (data && data.data) {
        setEntries(data.data);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
      }
    } catch (error) {
      console.error('Error fetching hoarding bills:', error);
      toast.error('Failed to load hoarding bills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBills();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTerm]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiService.delete(`${endPointApi.hoardingBilling}/${deleteId}`);
      fetchBills();
      toast.success('Invoice deleted');
    } catch (error) {
      console.error('Error deleting hoarding bill:', error);
      toast.error('Error deleting invoice');
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleDownloadPdf = (id: string, invoiceNumber: string) => {
    const url = `${endPointApi.serverUrl}/api/${endPointApi.hoardingBillingPdf(id)}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_self';
    link.download = `Invoice-${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1B2642] flex items-center gap-2">
            <Receipt className="w-6 h-6" /> Hoarding Billing
          </h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage hoarding tax invoices</p>
        </div>
        <Link href="/admin/hoarding-billing/add" className="px-4 py-1.5 text-sm bg-[#1B2642] text-white rounded-lg hover:bg-[#1B2642]/90 flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Invoice
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-[#1B2642]">Invoice List</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoice or customer..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1B2642]/20 outline-none text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100 whitespace-nowrap">
                <th className="px-6 py-2.5 font-medium">Invoice No</th>
                <th className="px-6 py-2.5 font-medium">Customer</th>
                <th className="px-6 py-2.5 font-medium">Date</th>
                <th className="px-6 py-2.5 font-medium">GST</th>
                <th className="px-6 py-2.5 font-medium">Total Amount</th>
                <th className="px-6 py-2.5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">No invoices found</td></tr>
              ) : (
                entries.map(bill => (
                  <tr key={bill._id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-2.5 text-gray-600 font-bold whitespace-nowrap">{bill.invoiceNumber}</td>
                    <td className="px-6 py-2.5 font-medium text-[#1B2642]">{bill.customerName}</td>
                    <td className="px-6 py-2.5 text-gray-600 whitespace-nowrap">{bill.date ? bill.date.split('-').reverse().join('/') : '-'}</td>
                    <td className="px-6 py-2.5">
                      {bill.customerGstin ? (
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-bold">GST</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-bold">Normal</span>
                      )}
                    </td>
                    <td className="px-6 py-2.5 text-gray-600 font-bold">₹{(bill.totalAmount || 0).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-2.5 flex items-center gap-2">
                      <button onClick={() => handleDownloadPdf(bill._id, bill.invoiceNumber)} title="Download PDF" className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <Link href={`/admin/hoarding-billing/edit/${bill._id}`} title="Edit" className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => { setDeleteId(bill._id); setIsDeleteModalOpen(true); }} title="Delete" className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalRecords={totalRecords}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setDeleteId(null); }}
        onConfirm={handleDelete}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone."
      />
    </div>
  );
}
