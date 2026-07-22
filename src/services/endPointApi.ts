export interface EndPointApi {
  // Base URLs
  baseUrl: string;
  serverUrl: string;

  // Auth
  authLogin: string;

  // Content Sections
  home: string;
  about: string;
  team: string;
  partners: string;
  settings: string;

  // Services
  hoardings: string;
  branding: string;
  graphics: string;

  // Upload
  upload: string;

  // Accounting
  income: string;
  incomeReportPdf: string;
  incomeBillPdf: (id: string) => string;
  expense: string;
  expenseReportPdf: string;
  expenseBillPdf: (id: string) => string;
  printing: string;
  printingReportPdf: string;
  printingBillPdf: (id: string) => string;
}

const endPointApi: EndPointApi = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000',

  // Auth
  authLogin: 'auth/login',

  // Content Sections
  home: 'home',
  about: 'about',
  team: 'team',
  partners: 'partners',
  settings: 'settings',

  // Services
  hoardings: 'hoardings',
  branding: 'branding',
  graphics: 'graphics',

  // Upload
  upload: 'upload',

  // Accounting
  income: 'income',
  incomeReportPdf: 'income/pdf/report',
  incomeBillPdf: (id: string) => `income/pdf/bill/${id}`,
  expense: 'expense',
  expenseReportPdf: 'expense/pdf/report',
  expenseBillPdf: (id: string) => `expense/pdf/bill/${id}`,
  printing: 'printing',
  printingReportPdf: 'printing/pdf/report',
  printingBillPdf: (id: string) => `printing/pdf/bill/${id}`,
};

export default endPointApi;
