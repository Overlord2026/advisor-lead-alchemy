
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadSource } from "@/types/leadSources";
import GeneralTab from "./GeneralTab";
import ConfigurationTab from "./ConfigurationTab";
import AdvancedTab from "./AdvancedTab";

interface LeadSourceFormContainerProps {
  leadSource?: LeadSource;
  onSubmit: (leadSource: Partial<LeadSource>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const LeadSourceFormContainer = ({
  leadSource,
  onSubmit,
  onCancel,
  isSubmitting
}: LeadSourceFormContainerProps) => {
  const [form, setForm] = useState<Partial<LeadSource>>({
    name: "",
    source_type: "csv",
    config: {},
    credentials: {},
    is_active: true
  });
  
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (leadSource) {
      setForm({
        id: leadSource.id,
        name: leadSource.name,
        source_type: leadSource.source_type,
        config: leadSource.config,
        credentials: leadSource.credentials,
        is_active: leadSource.is_active
      });
    }
  }, [leadSource]);

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleConfigChange = (field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      config: {
        ...prev.config,
        [field]: value
      }
    }));
  };

  const handleCredentialsChange = (field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      credentials: {
        ...prev.credentials,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralTab 
            form={form} 
            onFormChange={handleChange}
          />
        </TabsContent>
        
        <TabsContent value="configuration">
          <ConfigurationTab 
            form={form}
            onConfigChange={handleConfigChange}
            onCredentialsChange={handleCredentialsChange}
          />
        </TabsContent>
        
        <TabsContent value="advanced">
          <AdvancedTab 
            config={form.config || {}}
            onConfigChange={handleConfigChange}
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : (leadSource ? "Update" : "Create")}
        </Button>
      </div>
    </form>
  );
};

export default LeadSourceFormContainer;
