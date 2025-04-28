
import { toast as sonnerToast } from "sonner";
import { toast as shadcnToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import React from "react";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Unified toast function that works with both sonner and shadcn toasts
 */
export const toast = {
  /**
   * Show a default toast notification
   */
  default: (message: string, options?: ToastOptions) => {
    // Use sonner toast by default
    sonnerToast(message, {
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });

    // Also use shadcn toast for compatibility
    shadcnToast({
      title: message,
      duration: options?.duration,
      action: options?.action
        ? React.createElement(
            ToastAction,
            { 
              altText: options.action.label,
              onClick: options.action.onClick 
            },
            options.action.label
          )
        : undefined,
    });
  },

  /**
   * Show a success toast notification
   */
  success: (message: string, options?: ToastOptions) => {
    // Use sonner toast by default
    sonnerToast.success(message, {
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });

    // Also use shadcn toast for compatibility
    shadcnToast({
      title: message,
      variant: "default",
      duration: options?.duration,
      action: options?.action
        ? React.createElement(
            ToastAction,
            { 
              altText: options.action.label,
              onClick: options.action.onClick 
            },
            options.action.label
          )
        : undefined,
    });
  },

  /**
   * Show an error toast notification
   */
  error: (message: string, options?: ToastOptions) => {
    // Use sonner toast by default
    sonnerToast.error(message, {
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });

    // Also use shadcn toast for compatibility
    shadcnToast({
      title: message,
      variant: "destructive",
      duration: options?.duration,
      action: options?.action
        ? React.createElement(
            ToastAction,
            { 
              altText: options.action.label,
              onClick: options.action.onClick 
            },
            options.action.label
          )
        : undefined,
    });
  },

  /**
   * Show a warning toast notification
   */
  warning: (message: string, options?: ToastOptions) => {
    // Use sonner toast by default
    sonnerToast.warning(message, {
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });

    // Also use shadcn toast for compatibility
    shadcnToast({
      title: message,
      variant: "default",
      duration: options?.duration,
      action: options?.action
        ? React.createElement(
            ToastAction,
            { 
              altText: options.action.label,
              onClick: options.action.onClick 
            },
            options.action.label
          )
        : undefined,
    });
  },

  /**
   * Show an info toast notification
   */
  info: (message: string, options?: ToastOptions) => {
    // Use sonner toast by default
    sonnerToast.info(message, {
      duration: options?.duration,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });

    // Also use shadcn toast for compatibility
    shadcnToast({
      title: message,
      variant: "default",
      duration: options?.duration,
      action: options?.action
        ? React.createElement(
            ToastAction,
            { 
              altText: options.action.label,
              onClick: options.action.onClick 
            },
            options.action.label
          )
        : undefined,
    });
  },

  // We don't need dismiss as sonner toast doesn't have a direct equivalent
  // and we can rely on the automatic timeout
};
