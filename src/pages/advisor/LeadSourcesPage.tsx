
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Modal, useModal } from "@/components/ui/modal";
import { toast } from "@/utils/toast";
import DashboardHeader from "@/components/advisor-dashboard/DashboardHeader";
import LeadSourceList from "@/components/lead-sources/LeadSourceList";
import LeadSourceForm from "@/components/lead-sources/LeadSourceForm";
import CSVImport from "@/components/lead-sources/CSVImport";
import LeadSourceLogs from "@/components/lead-sources/LeadSourceLogs";
import { LeadSourceService } from "@/services/LeadSourceService";
import { LeadSource } from "@/types/leadSources";

const LeadSourcesPage = () => {
  const [selectedLeadSource, setSelectedLeadSource] = useState<LeadSource | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'import' | 'logs'>('list');
  
  const { 
    isOpen: isModalOpen, 
    open: openModal, 
    close: closeModal, 
    onOpenChange 
  } = useModal();

  const handleAddClick = () => {
    setSelectedLeadSource(null);
    setCurrentView('form');
    openModal();
  };

  const handleEditClick = (leadSource: LeadSource) => {
    setSelectedLeadSource(leadSource);
    setCurrentView('form');
    openModal();
  };

  const handleImportClick = (leadSource: LeadSource) => {
    setSelectedLeadSource(leadSource);
    setCurrentView('import');
    openModal();
  };

  const handleViewLogsClick = (leadSource: LeadSource) => {
    setSelectedLeadSource(leadSource);
    setCurrentView('logs');
    openModal();
  };

  const handleFormSubmit = async (leadSource: Partial<LeadSource>) => {
    try {
      setIsSubmitting(true);
      
      let result;
      
      if (leadSource.id) {
        // Update existing lead source
        result = await LeadSourceService.updateLeadSource(leadSource.id, leadSource);
        toast.success(`Lead source "${result.name}" updated successfully`);
      } else {
        // Create new lead source
        result = await LeadSourceService.createLeadSource(leadSource);
        toast.success(`Lead source "${result.name}" created successfully`);
      }
      
      closeModal();
      setCurrentView('list');
    } catch (error) {
      toast.error(`Failed to save lead source: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    closeModal();
    setCurrentView('list');
  };

  const handleImportSuccess = () => {
    // Could update the lead sources list if needed
  };

  const renderModalContent = () => {
    switch (currentView) {
      case 'form':
        return (
          <LeadSourceForm 
            leadSource={selectedLeadSource || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isSubmitting={isSubmitting}
          />
        );
        
      case 'import':
        if (!selectedLeadSource) return null;
        return (
          <CSVImport 
            leadSource={selectedLeadSource}
            onSuccess={handleImportSuccess}
            onClose={closeModal}
          />
        );
        
      case 'logs':
        if (!selectedLeadSource) return null;
        return (
          <LeadSourceLogs 
            leadSource={selectedLeadSource}
            onClose={closeModal}
          />
        );
        
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (currentView) {
      case 'form':
        return selectedLeadSource ? "Edit Lead Source" : "Add Lead Source";
      case 'import':
        return "Import Leads";
      case 'logs':
        return "Import History";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Lead Source Management" 
        subtitle="Configure and manage your lead source integrations"
      />

      <Card className="bg-card">
        <CardContent className="pt-6">
          <LeadSourceList
            onAddClick={handleAddClick}
            onEditClick={handleEditClick}
            onImportClick={handleImportClick}
            onViewLogsClick={handleViewLogsClick}
          />
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen} 
        onOpenChange={onOpenChange}
        title={getModalTitle()}
        className={currentView === 'import' ? 'max-w-3xl' : currentView === 'logs' ? 'max-w-4xl' : 'max-w-xl'}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default LeadSourcesPage;
