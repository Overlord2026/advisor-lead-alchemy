
export interface Goal {
  id: string;
  name: string;
  description: string;
  applicableSegments?: string[];
}

export const GOALS: Goal[] = [
  {
    id: 'retirement',
    name: 'Retirement Planning',
    description: 'Estimate income needs and withdrawal strategies',
    applicableSegments: ['preretiree']
  },
  {
    id: 'wealth_accum',
    name: 'Wealth Accumulation',
    description: 'Identify growth opportunities and asset allocation',
    applicableSegments: ['aspiring']
  },
  {
    id: 'tax_efficiency',
    name: 'Tax Efficiency',
    description: 'Minimize tax drag and maximize after-tax returns',
    applicableSegments: ['preretiree', 'uhnwi']
  },
  {
    id: 'estate_planning',
    name: 'Estate Planning',
    description: 'Structure legacy, wills, and trusts',
    applicableSegments: ['uhnwi']
  },
  {
    id: 'cash_flow',
    name: 'Cash Flow Management',
    description: 'Manage budgets, income, and expenses',
    applicableSegments: ['aspiring', 'preretiree']
  }
];

// User segments
export type Segment = 'aspiring' | 'preretiree' | 'uhnwi';

export const SEGMENTS = [
  { id: 'aspiring', label: 'Aspiring Wealthy' },
  { id: 'preretiree', label: 'Pre-Retiree / Retiree' },
  { id: 'uhnwi', label: 'Ultra-High-Net-Worth' },
];
