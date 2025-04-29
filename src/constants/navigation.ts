import { 
  LayoutDashboard, Users, Mic, ClipboardList, Mail, BarChart, Calendar
} from "lucide-react";

export const ADVISOR_NAV_ITEMS = [
  { label: "Dashboard", path: "/advisor", icon: LayoutDashboard },
  { label: "Prospects", path: "/advisor/prospects", icon: Users },
  { label: "Recordings", path: "/advisor/recordings", icon: Mic },
  { label: "Questionnaires", path: "/advisor/questionnaires", icon: ClipboardList },
  { label: "Templates", path: "/advisor/templates", icon: Mail },
  { label: "ROI Tracker", path: "/advisor/roi", icon: BarChart },
  { label: "Calendar", path: "/advisor/calendar", icon: Calendar },
];

// Keeping this commented out for reference
// export const NAV_ITEMS = [
//   { label: "Home", path: "/", icon: Home },
//   { label: "Documents", path: "/documents", icon: FileText },
//   { label: "Accounts", path: "/accounts", icon: Landmark },
//   { label: "Onboarding", path: "/onboarding", icon: UserPlus },
//   { label: "Training", path: "/training", icon: BookOpen },
// ];
