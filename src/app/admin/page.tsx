'use client';
import { useState, useEffect } from 'react';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';
import Link from 'next/link';
import { IndianRupee, Printer, TrendingDown, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    income: 0,
    incomePaid: 0,
    incomePending: 0,
    expense: 0,
    expensePaid: 0,
    expensePending: 0,
    printing: 0,
    printingAmount: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [incomeRes, expenseRes, printingRes] = await Promise.all([
          apiService.get(`${endPointApi.income}?limit=1`),
          apiService.get(`${endPointApi.expense}?limit=1`),
          apiService.get(`${endPointApi.printing}?limit=1`)
        ]);

        setCounts({
          income: incomeRes?.totalRecords || 0,
          incomePaid: incomeRes?.totalGiven || 0,
          incomePending: incomeRes?.totalPending || 0,
          expense: expenseRes?.totalRecords || 0,
          expensePaid: expenseRes?.totalGiven || 0,
          expensePending: expenseRes?.totalPending || 0,
          printing: printingRes?.totalRecords || 0,
          printingAmount: printingRes?.totalAmount || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif font-bold text-theme-navy">Dashboard Overview</h1>



      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <Link href="/admin/income" className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="relative z-10 mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
              <IndianRupee className="w-6 h-6" />
            </div>
            <h3 className="text-gray-500 font-medium mb-1">આવક (Income)</h3>
            <div className="text-3xl font-bold text-gray-900">{counts.income} <span className="text-sm font-normal text-gray-500">રેકોર્ડ્સ</span></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-emerald-50">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Paid</p>
              <p className="text-sm font-bold text-emerald-600">₹{counts.incomePaid.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Total Pending</p>
              <p className="text-sm font-bold text-amber-500">₹{counts.incomePending.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </Link>

        {/* Expense Card */}
        <Link href="/admin/expense" className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 hover:border-red-300 hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingDown className="w-24 h-24 text-red-500" />
          </div>
          <div className="relative z-10 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 text-red-600">
              <IndianRupee className="w-6 h-6" />
            </div>
            <h3 className="text-gray-500 font-medium mb-1">જાવક (Expense)</h3>
            <div className="text-3xl font-bold text-gray-900">{counts.expense} <span className="text-sm font-normal text-gray-500">રેકોર્ડ્સ</span></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-red-50">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Paid</p>
              <p className="text-sm font-bold text-emerald-600">₹{counts.expensePaid.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Total Pending</p>
              <p className="text-sm font-bold text-amber-500">₹{counts.expensePending.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </Link>

        {/* Printing Card */}
        <Link href="/admin/printing" className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Printer className="w-24 h-24 text-blue-500" />
          </div>
          <div className="relative z-10 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="text-gray-500 font-medium mb-1">પ્રિન્ટીંગ (Printing)</h3>
            <div className="text-3xl font-bold text-gray-900">{counts.printing} <span className="text-sm font-normal text-gray-500">રેકોર્ડ્સ</span></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-blue-50">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Amount</p>
              <p className="text-sm font-bold text-blue-600">₹{counts.printingAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </Link>
      </div>


    </div>
  );
}
