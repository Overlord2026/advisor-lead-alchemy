
import { Prospect } from '@/services/ProspectService';
import { ProspectRowProps } from '../ProspectTableRow';
import { 
  getRandomColor, 
  getHnwScoreColor, 
  getHnwScoreTextColor, 
  getHnwScoreBorderColor,
  getStageColor,
  getStageTextColor,
  getStageBorderColor
} from './prospectStyling';

/**
 * Maps a prospect from the database to the format needed for display
 */
export const mapProspectToRowProps = (prospect: Prospect): ProspectRowProps => {
  const name = `${prospect.first_name || ''} ${prospect.last_name || ''}`.trim();
  const initials = name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  return {
    initials: initials || "?",
    bgColor: getRandomColor(),
    textColor: "text-blue-600",
    name,
    email: prospect.email || '',
    source: {
      label: prospect.source || 'Unknown',
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-200"
    },
    hnwScore: {
      label: prospect.hnw_score || 'Not Set',
      bgClass: getHnwScoreColor(prospect.hnw_score),
      textClass: getHnwScoreTextColor(prospect.hnw_score),
      borderClass: getHnwScoreBorderColor(prospect.hnw_score)
    },
    stage: {
      label: prospect.stage || 'Initial Contact',
      bgClass: getStageColor(prospect.stage),
      textClass: getStageTextColor(prospect.stage),
      borderClass: getStageBorderColor(prospect.stage)
    },
    nextMeeting: prospect.next_meeting 
      ? new Date(prospect.next_meeting).toLocaleDateString() 
      : 'Not scheduled'
  };
};

/**
 * Generate sample prospects for fallback when API fails
 */
export const getSampleProspects = (): ProspectRowProps[] => [
  {
    initials: "JD",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    name: "John Doe",
    email: "john.doe@example.com",
    source: {
      label: "Facebook Ad",
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-200"
    },
    hnwScore: {
      label: "High",
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      borderClass: "border-green-200"
    },
    stage: {
      label: "Initial Meeting",
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-200"
    },
    nextMeeting: "Apr 24, 2025"
  },
  {
    initials: "MS",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    name: "Mary Smith",
    email: "mary@example.com",
    source: {
      label: "Referral",
      bgClass: "bg-purple-100",
      textClass: "text-purple-800",
      borderClass: "border-purple-200"
    },
    hnwScore: {
      label: "Medium",
      bgClass: "bg-yellow-100",
      textClass: "text-yellow-800",
      borderClass: "border-yellow-200"
    },
    stage: {
      label: "Follow-up",
      bgClass: "bg-yellow-100",
      textClass: "text-yellow-800",
      borderClass: "border-yellow-200"
    },
    nextMeeting: "Apr 25, 2025"
  },
  {
    initials: "RJ",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    name: "Robert Johnson",
    email: "robert@example.com",
    source: {
      label: "LinkedIn",
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-200"
    },
    hnwScore: {
      label: "Very High",
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      borderClass: "border-green-200"
    },
    stage: {
      label: "Questionnaire",
      bgClass: "bg-purple-100",
      textClass: "text-purple-800",
      borderClass: "border-purple-200"
    },
    nextMeeting: "Apr 26, 2025"
  },
  {
    initials: "AW",
    bgColor: "bg-orange-100",
    textColor: "text-orange-600",
    name: "Amanda Williams",
    email: "amanda@example.com",
    source: {
      label: "Website",
      bgClass: "bg-gray-100",
      textClass: "text-gray-800",
      borderClass: "border-gray-200"
    },
    hnwScore: {
      label: "Medium",
      bgClass: "bg-yellow-100",
      textClass: "text-yellow-800",
      borderClass: "border-yellow-200"
    },
    stage: {
      label: "Proposal",
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      borderClass: "border-green-200"
    },
    nextMeeting: "Apr 27, 2025"
  },
  {
    initials: "MB",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    name: "Michael Brown",
    email: "michael@example.com",
    source: {
      label: "Facebook Ad",
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-200"
    },
    hnwScore: {
      label: "High",
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      borderClass: "border-green-200"
    },
    stage: {
      label: "Decision",
      bgClass: "bg-red-100",
      textClass: "text-red-800",
      borderClass: "border-red-200"
    },
    nextMeeting: "Apr 28, 2025"
  }
];
