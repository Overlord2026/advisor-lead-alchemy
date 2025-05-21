
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import ProspectForm, { ProspectFormValues } from './form/formSchema';
import { ProspectService } from '@/services/ProspectService';

interface AddProspectModalProps {
  onSuccess?: () => void;
}

const AddProspectModal = ({ onSuccess }: AddProspectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleSubmit = async (data: ProspectFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Remove any undefined or empty values
      Object.keys(data).forEach(key => {
        if (data[key as keyof ProspectFormValues] === '') {
          data[key as keyof ProspectFormValues] = null;
        }
      });
      
      await ProspectService.createProspect(data);
      
      toast.success('Prospect created successfully');
      setIsOpen(false);
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating prospect:', error);
      toast.error('Failed to create prospect');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm" className="gap-1">
        <UserPlus className="h-4 w-4" />
        <span>Add Prospect</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Prospect</DialogTitle>
            <DialogDescription>
              Enter the prospect's information below to add them to your pipeline.
            </DialogDescription>
          </DialogHeader>
          
          <ProspectForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProspectModal;
