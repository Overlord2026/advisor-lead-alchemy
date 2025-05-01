
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

// Create a new QueryClient with cache-busting configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Force data refresh to prevent cached data from previous builds
      staleTime: 0,
      gcTime: 0, // Using gcTime instead of cacheTime (fixed build error)
      retry: false,
    },
  },
});

// Clear any existing React Query cache
queryClient.clear();

// Function to clear any client portal related items from storage
const clearClientPortalData = () => {
  // Clear localStorage items related to client portal
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.includes('client') || 
      key.includes('household') || 
      key.includes('feature-flags')
    )) {
      keysToRemove.push(key);
    }
  }
  
  // Remove the identified keys
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  // Clear sessionStorage as well
  sessionStorage.clear();
  
  console.log("Cleared all client portal related data from storage");
};

const App = () => {
  console.log("App rendering - current path:", window.location.pathname);
  
  // Clear client portal data on app initialization
  React.useEffect(() => {
    clearClientPortalData();
    
    // Redirect from client routes if somehow loaded
    if (window.location.pathname.includes('/client')) {
      window.location.href = '/advisor';
    }
  }, []);
  
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
                
                {/* Catch-all for client portal routes - redirect to advisor dashboard */}
                <Route path="/client/*" element={<Navigate to="/advisor" replace />} />
                
                {/* Redirect any unexpected routes to the advisor dashboard */}
                <Route path="*" element={<Navigate to="/advisor" replace />} />
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
