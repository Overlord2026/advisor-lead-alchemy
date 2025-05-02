
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LeadSource } from "@/types/leadSources";

interface AdvancedTabProps {
  config: Record<string, any>;
  onConfigChange: (field: string, value: any) => void;
}

const AdvancedTab = ({ config, onConfigChange }: AdvancedTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <Card>
        <CardContent className="pt-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="import_frequency">Import Frequency</Label>
            <Select 
              value={(config?.import_frequency as string) || "manual"}
              onValueChange={value => onConfigChange("import_frequency", value)}
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
              value={(config?.deduplicate as string) || "email"}
              onValueChange={value => onConfigChange("deduplicate", value)}
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
              value={(config?.auto_assign_stage as string) || "Initial Contact"}
              onValueChange={value => onConfigChange("auto_assign_stage", value)}
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
    </div>
  );
};

export default AdvancedTab;
