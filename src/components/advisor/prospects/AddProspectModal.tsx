
import React, { useState } from 'react';
import { Modal, useModal } from "@/components/ui/modal";
import ProspectForm, { ProspectFormValues } from './ProspectForm';
import { ProspectService } from '@/services/ProspectService';
import { toast } from 'sonner';

interface AddProspectModalProps {
  onSuccess?: (prospectId: string) => void;
}

const AddProspectModal = ({ onSuccess }: AddProspectModalProps) => {
  const { isOpen, open, close, onOpenChange } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProspectFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Prepare data without converting to Date object
      // This ensures next_meeting stays as string | null
      let formattedData = {
        ...data,
        metadata: data.metadata || {},
        next_meeting: data.next_meeting || null,
      };
      
      const prospect = await ProspectService.createProspect(formattedData);
      toast.success("Prospect added successfully!");
      close();
      if (onSuccess && prospect?.id) {
        onSuccess(prospect.id);
      }
    } catch (error) {
      console.error("Error adding prospect:", error);
      toast.error("Failed to add prospect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={open}
        className="bg-white hover:bg-red-50 border-red-200 border text-red-600 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
      >
        <span className="text-sm">Add New Prospect</span>
      </button>

      <Modal 
        open={isOpen} 
        onOpenChange={onOpenChange} 
        title="Add New Prospect"
        description="Enter prospect information to create a new prospect record."
      >
        <ProspectForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </>
  );
};

export default AddProspectModal;
