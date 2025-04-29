
export interface Recording {
  id: string;
  title: string;
  prospectName: string;
  prospectId: string;
  type: string;
  date: string;
  duration: string;
  hasAiAnalysis: boolean;
  status?: string;
  email?: string;
  initial?: string;
}
