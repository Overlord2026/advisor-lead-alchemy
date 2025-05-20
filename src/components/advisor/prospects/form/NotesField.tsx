
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from 'react-hook-form';
import { ProspectFormValues } from './formSchema';

interface NotesFieldProps {
  form: UseFormReturn<ProspectFormValues>;
}

const NotesField: React.FC<NotesFieldProps> = ({ form }) => {
  // This component will now store notes in the metadata field since the direct notes field has been removed
  return (
    <div className="mt-4">
      <FormField
        control={form.control}
        name="metadata.notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Add any additional notes about this prospect"
                className="min-h-[120px]"
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  // Update the metadata.notes field
                  const currentMetadata = form.getValues('metadata') || {};
                  form.setValue('metadata', {
                    ...currentMetadata,
                    notes: e.target.value
                  });
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default NotesField;
