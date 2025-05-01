
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LeadSource } from "@/types/leadSources";

interface LeadSourceFormProps {
  leadSource?: LeadSource;
  onSubmit: (leadSource: Partial<LeadSource>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const LeadSourceForm = ({
  leadSource,
  onSubmit,
  onCancel,
  isSubmitting
}: LeadSourceFormProps) => {
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

  const renderConfigurationFields = () => {
    switch (form.source_type) {
      case "csv":
        return (
          <>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="delimiter">CSV Delimiter</Label>
              <Input 
                id="delimiter" 
                type="text" 
                value={(form.config?.delimiter as string) || ","}
                onChange={e => handleConfigChange("delimiter", e.target.value)}
                placeholder="," 
              />
              <p className="text-xs text-muted-foreground">Character used to separate values in your CSV file</p>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="has_header">File Has Header Row</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="has_header" 
                  checked={(form.config?.has_header as boolean) !== false}
                  onCheckedChange={checked => handleConfigChange("has_header", checked)}
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
                    value={(form.config?.mapping?.first_name as string) || "first_name"} 
                    onChange={e => handleConfigChange("mapping", { 
                      ...form.config?.mapping, 
                      first_name: e.target.value 
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Label htmlFor="last_name_col">Last Name Column</Label>
                  <Input 
                    id="last_name_col" 
                    value={(form.config?.mapping?.last_name as string) || "last_name"} 
                    onChange={e => handleConfigChange("mapping", { 
                      ...form.config?.mapping, 
                      last_name: e.target.value 
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Label htmlFor="email_col">Email Column</Label>
                  <Input 
                    id="email_col" 
                    value={(form.config?.mapping?.email as string) || "email"} 
                    onChange={e => handleConfigChange("mapping", { 
                      ...form.config?.mapping, 
                      email: e.target.value 
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Label htmlFor="phone_col">Phone Column</Label>
                  <Input 
                    id="phone_col" 
                    value={(form.config?.mapping?.phone as string) || "phone"} 
                    onChange={e => handleConfigChange("mapping", { 
                      ...form.config?.mapping, 
                      phone: e.target.value 
                    })}
                  />
                </div>
              </div>
            </div>
          </>
        );
        
      case "api":
        return (
          <>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="endpoint">API Endpoint URL</Label>
              <Input 
                id="endpoint" 
                type="text" 
                value={(form.config?.endpoint as string) || ""} 
                onChange={e => handleConfigChange("endpoint", e.target.value)}
                placeholder="https://api.example.com/leads" 
              />
              <p className="text-xs text-muted-foreground">URL to fetch leads from</p>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="method">HTTP Method</Label>
              <Select 
                value={(form.config?.method as string) || "GET"}
                onValueChange={value => handleConfigChange("method", value)}
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
                value={(form.credentials?.api_key as string) || ""} 
                onChange={e => handleCredentialsChange("api_key", e.target.value)}
                placeholder="Your API key" 
              />
            </div>
          </>
        );
        
      case "ghl":
        return (
          <>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="account_name">GHL Account Name</Label>
              <Input 
                id="account_name" 
                type="text" 
                value={(form.config?.account_name as string) || ""} 
                onChange={e => handleConfigChange("account_name", e.target.value)}
                placeholder="Your Go High Level account name" 
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="location_id">Location ID</Label>
              <Input 
                id="location_id" 
                type="text" 
                value={(form.config?.location_id as string) || ""} 
                onChange={e => handleConfigChange("location_id", e.target.value)}
                placeholder="Location ID" 
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="api_key">API Key</Label>
              <Input 
                id="api_key" 
                type="password" 
                value={(form.credentials?.api_key as string) || ""} 
                onChange={e => handleCredentialsChange("api_key", e.target.value)}
                placeholder="Your GHL API key" 
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="refresh_token">Refresh Token</Label>
              <Input 
                id="refresh_token" 
                type="password" 
                value={(form.credentials?.refresh_token as string) || ""} 
                onChange={e => handleCredentialsChange("refresh_token", e.target.value)}
                placeholder="Your GHL refresh token" 
              />
            </div>
          </>
        );
        
      default:
        return (
          <div className="text-center p-4 text-muted-foreground">
            Select a source type to configure additional options.
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              type="text" 
              value={form.name} 
              onChange={e => handleChange("name", e.target.value)}
              placeholder="Lead Source Name" 
              required
            />
            <p className="text-xs text-muted-foreground">A descriptive name for this lead source</p>
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="source_type">Source Type</Label>
            <Select 
              value={form.source_type} 
              onValueChange={value => handleChange("source_type", value)}
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
                onCheckedChange={checked => handleChange("is_active", checked)}
              />
              <span>Active</span>
            </div>
            <p className="text-xs text-muted-foreground">Enable or disable this lead source</p>
          </div>
        </TabsContent>
        
        <TabsContent value="configuration" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {renderConfigurationFields()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="import_frequency">Import Frequency</Label>
                <Select 
                  value={(form.config?.import_frequency as string) || "manual"}
                  onValueChange={value => handleConfigChange("import_frequency", value)}
                >
                  <SelectTrigger id="import_frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Only</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">How often to automatically import leads</p>
              </div>
              
              <div className="grid w-full items-center gap-2 mt-4">
                <Label htmlFor="deduplicate">Deduplication Strategy</Label>
                <Select 
                  value={(form.config?.deduplicate as string) || "email"}
                  onValueChange={value => handleConfigChange("deduplicate", value)}
                >
                  <SelectTrigger id="deduplicate">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Deduplication</SelectItem>
                    <SelectItem value="email">By Email</SelectItem>
                    <SelectItem value="phone">By Phone</SelectItem>
                    <SelectItem value="email_or_phone">By Email or Phone</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">How to handle duplicate leads</p>
              </div>
              
              <div className="grid w-full items-center gap-2 mt-4">
                <Label htmlFor="auto_assign">Auto-assign Stage</Label>
                <Select 
                  value={(form.config?.auto_assign_stage as string) || "Initial Contact"}
                  onValueChange={value => handleConfigChange("auto_assign_stage", value)}
                >
                  <SelectTrigger id="auto_assign">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Initial Contact">Initial Contact</SelectItem>
                    <SelectItem value="Discovery">Discovery</SelectItem>
                    <SelectItem value="Proposal">Proposal</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Pipeline stage for new leads</p>
              </div>
            </CardContent>
          </Card>
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

export default LeadSourceForm;
