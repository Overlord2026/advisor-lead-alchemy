
import React from 'react';
import { ToastAction, ToastActionElement } from "@/components/ui/toast";

/**
 * Helper function to create properly typed ToastAction elements
 */
export function createToastAction(label: string, onClick: () => void): ToastActionElement {
  return (
    <ToastAction altText={label} onClick={onClick}>
      {label}
    </ToastAction>
  ) as ToastActionElement;
}
