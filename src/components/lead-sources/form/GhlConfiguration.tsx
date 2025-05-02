
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GhlConfigurationProps {
  config: Record<string, any>;
  credentials: Record<string, any>;
  onConfigChange: (field: string, value: any) => void;
  onCredentialsChange: (field: string, value: any) => void;
}

const GhlConfiguration = ({
  config,
  credentials,
  onConfigChange,
  onCredentialsChange
}: GhlConfigurationProps) => {
  return (
    <>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="account_name">GHL Account Name</Label>
        <Input 
          id="account_name" 
          type="text" 
          value={(config?.account_name as string) || ""} 
          onChange={e => onConfigChange("account_name", e.target.value)}
          placeholder="Your Go High Level account name" 
        />
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="location_id">Location ID</Label>
        <Input 
          id="location_id" 
          type="text" 
          value={(config?.location_id as string) || ""} 
          onChange={e => onConfigChange("location_id", e.target.value)}
          placeholder="Location ID" 
        />
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="api_key">API Key</Label>
        <Input 
          id="api_key" 
          type="password" 
          value={(credentials?.api_key as string) || ""} 
          onChange={e => onCredentialsChange("api_key", e.target.value)}
          placeholder="Your GHL API key" 
        />
      </div>
      
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="refresh_token">Refresh Token</Label>
        <Input 
          id="refresh_token" 
          type="password" 
          value={(credentials?.refresh_token as string) || ""} 
          onChange={e => onCredentialsChange("refresh_token", e.target.value)}
          placeholder="Your GHL refresh token" 
        />
      </div>
    </>
  );
};

export default GhlConfiguration;
