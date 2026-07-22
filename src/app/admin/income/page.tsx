'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';
import Link from 'next/link';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import Pagination from '@/components/Pagination';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { DateRangePicker } from '@/components/DateRangePicker';
export default function IncomePage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [summary, setSummary] = useState({ totalBill: 0, totalGiven: 0, totalPending: 0 });
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [dateValue, setDateValue] = useState<{startDate: string | null, endDate: string | null}>(() => {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { startDate: today, endDate: today };
  });

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      let query = `?page=${currentPage}&limit=${pageSize}`;
      if (dateValue.startDate && dateValue.endDate) {
        query += `&startDate=${dateValue.startDate}&endDate=${dateValue.endDate}`;
      }
      
      const data = await apiService.get(`${endPointApi.income}${query}`);
      if (data && data.data) {
        setEntries(data.data);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
        setSummary({
          totalBill: data.totalBill || 0,
          totalGiven: data.totalGiven || 0,
          totalPending: data.totalPending || 0,
        });
      } else if (Array.isArray(data)) { // fallback if API isn't updated
        setEntries(data);
      }
    } catch (error) {
      console.error('Error fetching incomes:', error);
      toast.error('ડેટા લાવવામાં ભૂલ આવી (Error fetching data)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [currentPage, pageSize, dateValue]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiService.delete(`${endPointApi.income}/${deleteId}`);
      fetchIncomes();
      toast.success('રેકોર્ડ રદ થયો (Record deleted)!');
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error('રેકોર્ડ ડિલીટ કરવામાં ભૂલ (Error deleting)');
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleDownloadReport = () => {
    let url = `${endPointApi.serverUrl}/api/${endPointApi.incomeReportPdf}`;
    if (dateValue.startDate && dateValue.endDate) {
      url += `?startDate=${dateValue.startDate}&endDate=${dateValue.endDate}`;
    }
    window.open(url, '_blank');
  };

  const handleDownloadBill = (id: string) => {
    const url = `${endPointApi.serverUrl}/api/${endPointApi.incomeBillPdf(id)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1B2642]">આવક (Income)</h2>
          <p className="text-sm text-gray-500 mt-1">આવકની વિગતો જુઓ અને મેનેજ કરો</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDownloadReport} className="px-4 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1.5 transition-colors">
            <Download className="w-4 h-4" /> PDF રિપોર્ટ (Download)
          </button>
          <Link href="/admin/income/add" className="px-4 py-1.5 text-sm bg-[#1B2642] text-white rounded-lg hover:bg-[#1B2642]/90 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> નવી એન્ટ્રી (New Entry)
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-gray-500 text-xs font-medium mb-0.5">કુલ બિલ (Total Bill)</p>
          <h3 className="text-2xl font-bold text-[#1B2642]">₹{summary.totalBill}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col justify-center">
          <p className="text-gray-500 text-xs font-medium mb-0.5">આપેલ રકમ (Amount Received)</p>
          <h3 className="text-2xl font-bold text-green-600">₹{summary.totalGiven}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 flex flex-col justify-center">
          <p className="text-gray-500 text-xs font-medium mb-0.5">બાકી રકમ (Pending Amount)</p>
          <h3 className="text-2xl font-bold text-red-600">₹{summary.totalPending}</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-[#1B2642]">આવક લિસ્ટ (Income List)</h3>
          <div className="w-full sm:w-64 relative z-20">
            <DateRangePicker
              startDate={dateValue.startDate}
              endDate={dateValue.endDate}
              onChange={(start, end) => {
                setDateValue({ startDate: start, endDate: end });
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100 whitespace-nowrap">
                <th className="px-6 py-2.5 font-medium">બિલ નં (Bill No)</th>
                <th className="px-6 py-2.5 font-medium">પ્રોડક્ટનું નામ</th>
                <th className="px-6 py-2.5 font-medium">વિગત</th>
                <th className="px-6 py-2.5 font-medium">કસ્ટમરનું નામ</th>
                <th className="px-6 py-2.5 font-medium">તારીખ</th>
                <th className="px-6 py-2.5 font-medium">ટોટલ બિલ</th>
                <th className="px-6 py-2.5 font-medium">આપેલ રકમ</th>
                <th className="px-6 py-2.5 font-medium text-red-600">બાકી રકમ</th>
                <th className="px-6 py-2.5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-400">Loading...</td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-400">કોઈ ડેટા નથી (No Data Found)</td>
                </tr>
              ) : (
                entries.map(entry => (
                  <tr key={entry._id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-2.5 text-gray-600 font-bold whitespace-nowrap">{entry.billNumber || '-'}</td>
                    <td className="px-6 py-2.5 font-medium text-[#1B2642]">{entry.productName}</td>
                    <td className="px-6 py-2.5 text-gray-600 max-w-[200px] truncate">{entry.details}</td>
                    <td className="px-6 py-2.5 text-gray-600">{entry.customerName}</td>
                    <td className="px-6 py-2.5 text-gray-600 whitespace-nowrap">{entry.date ? entry.date.split('-').reverse().join('/') : ''}</td>
                    <td className="px-6 py-2.5 text-gray-600 font-bold">₹{entry.totalBill || 0}</td>
                    <td className="px-6 py-2.5 text-green-600 font-bold">₹{entry.givenAmount || 0}</td>
                    <td className="px-6 py-2.5 text-red-600 font-bold">₹{entry.pendingAmount || 0}</td>
                    <td className="px-6 py-2.5 flex items-center gap-2">
                      <button onClick={() => handleDownloadBill(entry._id)} title="Download Bill" className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <Link href={`/admin/income/edit/${entry._id}`} title="Edit" className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => { setDeleteId(entry._id); setIsDeleteModalOpen(true); }} title="Delete" className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
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
        title="રેકોર્ડ કાઢી નાખો (Delete Record)"
        message="શું તમે ખરેખર આ રેકોર્ડ કાઢી નાખવા માંગો છો? આ પ્રક્રિયા રદ કરી શકાતી નથી."
      />
    </div>
  );
}
