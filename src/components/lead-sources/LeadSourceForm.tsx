
import { LeadSource } from "@/types/leadSources";
import LeadSourceFormContainer from "./form/LeadSourceFormContainer";

interface LeadSourceFormProps {
  leadSource?: LeadSource;
  onSubmit: (leadSource: Partial<LeadSource>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const LeadSourceForm = (props: LeadSourceFormProps) => {
  // Simply pass through to the new container component
  return <LeadSourceFormContainer {...props} />;
};

export default LeadSourceForm;
