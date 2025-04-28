
import React from 'react';
import { Modal, ModalButton, useModal } from "@/components/ui/modal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface AutomationModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  primaryAction: () => void;
  primaryActionText: string;
  secondaryAction?: () => void;
  secondaryActionText?: string;
  showAiToggle?: boolean;
  defaultAiEnabled?: boolean;
  onAiToggleChange?: (enabled: boolean) => void;
}

export const AutomationModal: React.FC<AutomationModalProps> = ({
  title,
  description,
  children,
  primaryAction,
  primaryActionText,
  secondaryAction,
  secondaryActionText = "Cancel",
  showAiToggle = false,
  defaultAiEnabled = true,
  onAiToggleChange
}) => {
  const { isOpen, onOpenChange, close } = useModal();
  const [aiEnabled, setAiEnabled] = React.useState(defaultAiEnabled);
  
  const handlePrimaryAction = () => {
    primaryAction();
    close();
  };
  
  const handleSecondaryAction = () => {
    if (secondaryAction) {
      secondaryAction();
    }
    close();
  };
  
  const handleAiToggleChange = (checked: boolean) => {
    setAiEnabled(checked);
    if (onAiToggleChange) {
      onAiToggleChange(checked);
    }
  };
  
  const buttons: ModalButton[] = [
    {
      text: secondaryActionText,
      variant: "outline",
      onClick: handleSecondaryAction
    },
    {
      text: primaryActionText,
      variant: "default",
      onClick: handlePrimaryAction
    }
  ];
  
  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      buttons={buttons}
    >
      <div className="space-y-4 py-4">
        {showAiToggle && (
          <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium">AI Enhanced Automation</p>
                <p className="text-sm text-muted-foreground">
                  Enable AI to automatically personalize and optimize this process
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="ai-toggle" className="sr-only">
                AI Enhanced
              </Label>
              <Switch
                id="ai-toggle"
                checked={aiEnabled}
                onCheckedChange={handleAiToggleChange}
              />
            </div>
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
};

export const useAutomationModal = () => {
  return useModal();
};
