
export interface Goal {
  id: string;
  name: string;
  description: string;
}

export const GOALS: Goal[] = [
  {
    id: 'retirement',
    name: 'Retirement Planning',
    description: 'Estimate income needs and withdrawal strategies'
  },
  {
    id: 'wealth_accum',
    name: 'Wealth Accumulation',
    description: 'Identify growth opportunities and asset allocation'
  },
  {
    id: 'tax_efficiency',
    name: 'Tax Efficiency',
    description: 'Minimize tax drag and maximize after-tax returns'
  },
  {
    id: 'estate_planning',
    name: 'Estate Planning',
    description: 'Structure legacy, wills, and trusts'
  },
  {
    id: 'cash_flow',
    name: 'Cash Flow Management',
    description: 'Manage budgets, income, and expenses'
  }
];
