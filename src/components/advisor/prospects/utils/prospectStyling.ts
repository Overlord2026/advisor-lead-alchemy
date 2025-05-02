
/**
 * Helper functions for prospect styling
 */

export const getRandomColor = (): string => {
  const colors = [
    "bg-blue-100", "bg-green-100", "bg-yellow-100", 
    "bg-purple-100", "bg-pink-100", "bg-indigo-100"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getHnwScoreColor = (score: string | null): string => {
  switch(score) {
    case 'Very High': return 'bg-green-100';
    case 'High': return 'bg-green-100';
    case 'Medium': return 'bg-yellow-100';
    case 'Low': return 'bg-red-100';
    default: return 'bg-gray-100';
  }
};

export const getHnwScoreTextColor = (score: string | null): string => {
  switch(score) {
    case 'Very High': return 'text-green-800';
    case 'High': return 'text-green-800';
    case 'Medium': return 'text-yellow-800';
    case 'Low': return 'text-red-800';
    default: return 'text-gray-800';
  }
};

export const getHnwScoreBorderColor = (score: string | null): string => {
  switch(score) {
    case 'Very High': return 'border-green-200';
    case 'High': return 'border-green-200';
    case 'Medium': return 'border-yellow-200';
    case 'Low': return 'border-red-200';
    default: return 'border-gray-200';
  }
};

export const getStageColor = (stage: string | null): string => {
  switch(stage) {
    case 'Initial Contact': return 'bg-blue-100';
    case 'Discovery': return 'bg-blue-100';
    case 'Questionnaire': return 'bg-purple-100';
    case 'Follow-up': return 'bg-yellow-100';
    case 'Proposal': return 'bg-green-100';
    case 'Decision': return 'bg-red-100';
    default: return 'bg-gray-100';
  }
};

export const getStageTextColor = (stage: string | null): string => {
  switch(stage) {
    case 'Initial Contact': return 'text-blue-800';
    case 'Discovery': return 'text-blue-800';
    case 'Questionnaire': return 'text-purple-800';
    case 'Follow-up': return 'text-yellow-800';
    case 'Proposal': return 'text-green-800';
    case 'Decision': return 'text-red-800';
    default: return 'text-gray-800';
  }
};

export const getStageBorderColor = (stage: string | null): string => {
  switch(stage) {
    case 'Initial Contact': return 'border-blue-200';
    case 'Discovery': return 'border-blue-200';
    case 'Questionnaire': return 'border-purple-200';
    case 'Follow-up': return 'border-yellow-200';
    case 'Proposal': return 'border-green-200';
    case 'Decision': return 'border-red-200';
    default: return 'border-gray-200';
  }
};
