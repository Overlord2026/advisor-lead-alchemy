
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { prospectSchema, ProspectFormValues, defaultValues } from "./form/formSchema";
import PersonalInfoFields from "./form/PersonalInfoFields";
import ContactInfoFields from "./form/ContactInfoFields";
import SourceFields from "./form/SourceFields";
import StatusFields from "./form/StatusFields";
import FormActions from "./form/FormActions";
import NotesField from "./form/NotesField";

export type { ProspectFormValues } from "./form/formSchema";

interface ProspectFormProps {
  onSubmit: (data: ProspectFormValues) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<ProspectFormValues>;
}

const ProspectForm = ({ onSubmit, isSubmitting, defaultValues: initialValues = {} }: ProspectFormProps) => {
  const form = useForm<ProspectFormValues>({
    resolver: zodResolver(prospectSchema),
    defaultValues: {
      ...defaultValues,
      ...initialValues
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PersonalInfoFields form={form} />
        <ContactInfoFields form={form} />
        <SourceFields form={form} />
        <StatusFields form={form} />
        <NotesField form={form} />
        <FormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default ProspectForm;
