
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from 'react-hook-form';
import { ProspectFormValues } from './formSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusFieldsProps {
  form: UseFormReturn<ProspectFormValues>;
}

const StatusFields: React.FC<StatusFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="stage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stage</FormLabel>
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value || "Initial Contact"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a stage" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Initial Contact">Initial Contact</SelectItem>
                <SelectItem value="Discovery">Discovery</SelectItem>
                <SelectItem value="Questionnaire">Questionnaire</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Decision">Decision</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value || "new"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="unqualified">Unqualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StatusFields;
