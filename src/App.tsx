
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import ProspectDashboard from "./pages/advisor/ProspectDashboard";
import LeadSourcesPage from "./pages/advisor/LeadSourcesPage";
import RecordingsPage from "./pages/advisor/RecordingsPage";
import QuestionnairesPage from "./pages/advisor/QuestionnairesPage";
import TemplatesPage from "./pages/advisor/TemplatesPage";
import RoiTrackerPage from "./pages/advisor/RoiTrackerPage";
import CalendarIntegrationPage from "./pages/advisor/CalendarIntegrationPage";
import GhlTrainingPage from "./pages/advisor/GhlTrainingPage";
import IntegrationsTrainingPage from "./pages/advisor/IntegrationsTrainingPage";
import { AppProvider } from "@/contexts/AppContext";
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext";
import FeatureFlagToggler from "@/components/FeatureFlagToggler";
import { Toaster } from "sonner";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import Home from "./pages/Home";

// Import styles
import "./styles/sales-process.css";
import "./styles/questionnaires.css";
import "./styles/recordings.css";
import "./styles/roi-tracker.css";
import "./styles/email-templates.css";
import "./styles/calendar.css";

const queryClient = new QueryClient();

const App = () => {
  console.log("App rendering - current path:", window.location.pathname);
  
  return (
    <QueryClientProvider client={queryClient}>
      <FeatureFlagProvider>
        <AppProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                {/* Root path shows landing page with portal options */}
                <Route path="/" element={<Home />} />
                
                {/* Advisor routes */}
                <Route path="/advisor" element={<Layout><AdvisorDashboard /></Layout>} />
                <Route path="/advisor/prospects" element={<Layout><ProspectDashboard /></Layout>} />
                <Route path="/advisor/lead-sources" element={<Layout><LeadSourcesPage /></Layout>} />
                <Route path="/advisor/recordings" element={<Layout><RecordingsPage /></Layout>} />
                <Route path="/advisor/questionnaires" element={<Layout><QuestionnairesPage /></Layout>} />
                <Route path="/advisor/templates" element={<Layout><TemplatesPage /></Layout>} />
                <Route path="/advisor/roi" element={<Layout><RoiTrackerPage /></Layout>} />
                <Route path="/advisor/calendar" element={<Layout><CalendarIntegrationPage /></Layout>} />
                <Route path="/advisor/training/ghl-integration" element={<Layout><GhlTrainingPage /></Layout>} />
                <Route path="/advisor/training/integrations" element={<Layout><IntegrationsTrainingPage /></Layout>} />
                
                {/* Prospect routes - redirect to advisor for now */}
                <Route path="/prospect/*" element={<Navigate to="/advisor" replace />} />
                
                {/* Force redirect for any unmatched routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <FeatureFlagToggler />
              <ShadcnToaster />
              <Toaster />
            </BrowserRouter>
          </TooltipProvider>
        </AppProvider>
      </FeatureFlagProvider>
    </QueryClientProvider>
  );
};

export default App;
