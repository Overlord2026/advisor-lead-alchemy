
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { LeadSource } from "@/types/leadSources";

interface GeneralTabProps {
  form: Partial<LeadSource>;
  onFormChange: (field: string, value: any) => void;
}

const GeneralTab = ({ form, onFormChange }: GeneralTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          type="text" 
          value={form.name} 
          onChange={e => onFormChange("name", e.target.value)}
          placeholder="Lead Source Name" 
          required
        />
        <p className="text-xs text-muted-foreground">A descriptive name for this lead source</p>
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="source_type">Source Type</Label>
        <Select 
          value={form.source_type} 
          onValueChange={value => onFormChange("source_type", value)}
        >
          <SelectTrigger id="source_type">
            <SelectValue placeholder="Select source type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="csv">CSV File Import</SelectItem>
            <SelectItem value="api">API Integration</SelectItem>
            <SelectItem value="ghl">Go High Level</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">The type of lead source to configure</p>
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="is_active">Status</Label>
        <div className="flex items-center space-x-2">
          <Switch 
            id="is_active" 
            checked={form.is_active} 
            onCheckedChange={checked => onFormChange("is_active", checked)}
          />
          <span>Active</span>
        </div>
        <p className="text-xs text-muted-foreground">Enable or disable this lead source</p>
      </div>
    </div>
  );
};

export default GeneralTab;
