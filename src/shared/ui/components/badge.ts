
// Re-export the badge component with its variants
export { Badge, badgeVariants } from '@/components/ui/badge';

// Add custom badge variants
export const customBadgeVariants = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200"
};
