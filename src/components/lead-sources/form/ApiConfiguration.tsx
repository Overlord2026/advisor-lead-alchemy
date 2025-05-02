
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LeadSource } from "@/types/leadSources";

interface ApiConfigurationProps {
  config: Record<string, any>;
  credentials: Record<string, any>;
  onConfigChange: (field: string, value: any) => void;
  onCredentialsChange: (field: string, value: any) => void;
}

const ApiConfiguration = ({ 
  config, 
  credentials,
  onConfigChange, 
  onCredentialsChange 
}: ApiConfigurationProps) => {
  return (
    <>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="endpoint">API Endpoint URL</Label>
        <Input 
          id="endpoint" 
          type="text" 
          value={(config?.endpoint as string) || ""} 
          onChange={e => onConfigChange("endpoint", e.target.value)}
          placeholder="https://api.example.com/leads" 
        />
        <p className="text-xs text-muted-foreground">URL to fetch leads from</p>
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="method">HTTP Method</Label>
        <Select 
          value={(config?.method as string) || "GET"}
          onValueChange={value => onConfigChange("method", value)}
        >
          <SelectTrigger id="method">
            <SelectValue placeholder="Select HTTP method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="api_key">API Key</Label>
        <Input 
          id="api_key" 
          type="password" 
          value={(credentials?.api_key as string) || ""} 
          onChange={e => onCredentialsChange("api_key", e.target.value)}
          placeholder="Your API key" 
        />
      </div>
    </>
  );
};

export default ApiConfiguration;
