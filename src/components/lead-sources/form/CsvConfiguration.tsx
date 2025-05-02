
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LeadSource } from "@/types/leadSources";

interface CsvConfigurationProps {
  config: Record<string, any>;
  onConfigChange: (field: string, value: any) => void;
}

const CsvConfiguration = ({ config, onConfigChange }: CsvConfigurationProps) => {
  const handleMappingChange = (field: string, value: string) => {
    onConfigChange("mapping", { 
      ...config?.mapping, 
      [field]: value 
    });
  };

  return (
    <>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="delimiter">CSV Delimiter</Label>
        <Input 
          id="delimiter" 
          type="text" 
          value={(config?.delimiter as string) || ","}
          onChange={e => onConfigChange("delimiter", e.target.value)}
          placeholder="," 
        />
        <p className="text-xs text-muted-foreground">Character used to separate values in your CSV file</p>
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="has_header">File Has Header Row</Label>
        <div className="flex items-center space-x-2">
          <Switch 
            id="has_header" 
            checked={(config?.has_header as boolean) !== false}
            onCheckedChange={checked => onConfigChange("has_header", checked)}
          />
          <span>First row contains column names</span>
        </div>
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="mapping">Column Mapping</Label>
        <div className="grid gap-3 p-3 border rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="first_name_col">First Name Column</Label>
            <Input 
              id="first_name_col" 
              value={(config?.mapping?.first_name as string) || "first_name"} 
              onChange={e => handleMappingChange("first_name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="last_name_col">Last Name Column</Label>
            <Input 
              id="last_name_col" 
              value={(config?.mapping?.last_name as string) || "last_name"} 
              onChange={e => handleMappingChange("last_name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="email_col">Email Column</Label>
            <Input 
              id="email_col" 
              value={(config?.mapping?.email as string) || "email"} 
              onChange={e => handleMappingChange("email", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label htmlFor="phone_col">Phone Column</Label>
            <Input 
              id="phone_col" 
              value={(config?.mapping?.phone as string) || "phone"} 
              onChange={e => handleMappingChange("phone", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CsvConfiguration;
