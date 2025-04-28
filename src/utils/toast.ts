
import { toast as sonnerToast } from "sonner";
import { toast as shadcnToast } from "@/hooks/use-toast";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: React.ReactNode;
}

/**
 * Unified toast system that works with both shadcn/ui toast and sonner
 * Provides consistent API for showing different types of toasts
 */
export const toast = {
  /**
   * Show a success toast notification
   */
  success: (message: string, options?: ToastOptions) => {
    sonnerToast.success(options?.title || "Success", {
      description: message,
      duration: options?.duration || 4000,
      action: options?.action,
    });
    
    return shadcnToast({
      title: options?.title || "Success",
      description: message,
      duration: options?.duration || 4000,
      action: options?.action,
      variant: "default",
    });
  },

  /**
   * Show an error toast notification
   */
  error: (message: string, options?: ToastOptions) => {
    sonnerToast.error(options?.title || "Error", {
      description: message,
      duration: options?.duration || 5000,
      action: options?.action,
    });
    
    return shadcnToast({
      title: options?.title || "Error",
      description: message,
      duration: options?.duration || 5000,
      action: options?.action,
      variant: "destructive",
    });
  },

  /**
   * Show a warning toast notification
   */
  warning: (message: string, options?: ToastOptions) => {
    sonnerToast.warning(options?.title || "Warning", {
      description: message,
      duration: options?.duration || 5000,
      action: options?.action,
    });
    
    return shadcnToast({
      title: options?.title || "Warning",
      description: message,
      duration: options?.duration || 5000,
      action: options?.action,
      variant: "default",
    });
  },

  /**
   * Show an info toast notification
   */
  info: (message: string, options?: ToastOptions) => {
    sonnerToast.info(options?.title || "Info", {
      description: message,
      duration: options?.duration || 4000,
      action: options?.action,
    });
    
    return shadcnToast({
      title: options?.title || "Info",
      description: message,
      duration: options?.duration || 4000,
      action: options?.action,
      variant: "default",
    });
  },

  /**
   * Show a custom toast notification
   */
  custom: (options: ToastOptions) => {
    sonnerToast(options.title || "", {
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
    
    return shadcnToast({
      title: options.title,
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  },

  /**
   * Dismiss all toasts
   */
  dismiss: () => {
    sonnerToast.dismiss();
    shadcnToast.dismiss();
  }
};
