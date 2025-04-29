
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Accounts from "./pages/Accounts";
import Onboarding from "./pages/Onboarding";
import Training from "./pages/Training";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import ProspectDashboard from "./pages/advisor/ProspectDashboard";
import RecordingsPage from "./pages/advisor/RecordingsPage";
import QuestionnairesPage from "./pages/advisor/QuestionnairesPage";
import TemplatesPage from "./pages/advisor/TemplatesPage";
import RoiTrackerPage from "./pages/advisor/RoiTrackerPage";
import CalendarIntegrationPage from "./pages/advisor/CalendarIntegrationPage";
import GhlTrainingPage from "./pages/advisor/GhlTrainingPage";
import NotFound from "./pages/NotFound";
import { AppProvider } from "@/contexts/AppContext";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/documents" element={<Layout><Documents /></Layout>} />
            <Route path="/accounts" element={<Layout><Accounts /></Layout>} />
            <Route path="/onboarding" element={<Layout><Onboarding /></Layout>} />
            <Route path="/onboarding/:id" element={<Layout><Onboarding /></Layout>} />
            <Route path="/training" element={<Layout><Training /></Layout>} />
            <Route path="/advisor" element={<Layout><AdvisorDashboard /></Layout>} />
            <Route path="/advisor/prospects" element={<Layout><ProspectDashboard /></Layout>} />
            <Route path="/advisor/recordings" element={<Layout><RecordingsPage /></Layout>} />
            <Route path="/advisor/questionnaires" element={<Layout><QuestionnairesPage /></Layout>} />
            <Route path="/advisor/templates" element={<Layout><TemplatesPage /></Layout>} />
            <Route path="/advisor/roi" element={<Layout><RoiTrackerPage /></Layout>} />
            <Route path="/advisor/calendar" element={<Layout><CalendarIntegrationPage /></Layout>} />
            <Route path="/advisor/training/ghl-integration" element={<Layout><GhlTrainingPage /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
          <Toaster />
          <SonnerToaster />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
