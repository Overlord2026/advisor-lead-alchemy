
import { 
  Home, FileText, Landmark, UserPlus, BookOpen, 
  LayoutDashboard, Users, Mic, ClipboardList, Mail, BarChart 
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Documents", path: "/documents", icon: FileText },
  { label: "Accounts", path: "/accounts", icon: Landmark },
  { label: "Onboarding", path: "/onboarding", icon: UserPlus },
  { label: "Training", path: "/training", icon: BookOpen },
  { label: "Advisor Dashboard", path: "/advisor", icon: LayoutDashboard },
];

export const ADVISOR_NAV_ITEMS = [
  { label: "Dashboard", path: "/advisor", icon: LayoutDashboard },
  { label: "Prospects", path: "/advisor/prospects", icon: Users },
  { label: "Recordings", path: "/advisor/recordings", icon: Mic },
  { label: "Questionnaires", path: "/advisor/questionnaires", icon: ClipboardList },
  { label: "Templates", path: "/advisor/templates", icon: Mail },
  { label: "ROI Tracker", path: "/advisor/roi", icon: BarChart },
];
