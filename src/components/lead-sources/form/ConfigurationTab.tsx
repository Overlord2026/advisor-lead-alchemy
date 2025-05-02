
import { Card, CardContent } from "@/components/ui/card";
import CsvConfiguration from "./CsvConfiguration";
import ApiConfiguration from "./ApiConfiguration";
import GhlConfiguration from "./GhlConfiguration";
import { LeadSource } from "@/types/leadSources";

interface ConfigurationTabProps {
  form: Partial<LeadSource>;
  onConfigChange: (field: string, value: any) => void;
  onCredentialsChange: (field: string, value: any) => void;
}

const ConfigurationTab = ({ 
  form,
  onConfigChange,
  onCredentialsChange
}: ConfigurationTabProps) => {
  
  const renderConfigurationFields = () => {
    switch (form.source_type) {
      case "csv":
        return <CsvConfiguration config={form.config || {}} onConfigChange={onConfigChange} />;
        
      case "api":
        return <ApiConfiguration 
          config={form.config || {}} 
          credentials={form.credentials || {}} 
          onConfigChange={onConfigChange} 
          onCredentialsChange={onCredentialsChange} 
        />;
        
      case "ghl":
        return <GhlConfiguration 
          config={form.config || {}} 
          credentials={form.credentials || {}} 
          onConfigChange={onConfigChange} 
          onCredentialsChange={onCredentialsChange} 
        />;
        
      default:
        return (
          <div className="text-center p-4 text-muted-foreground">
            Select a source type to configure additional options.
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          {renderConfigurationFields()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationTab;
