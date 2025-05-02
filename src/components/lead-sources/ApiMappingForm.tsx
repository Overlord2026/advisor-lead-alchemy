
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LeadSource } from "@/types/leadSources";
import { PartnerApiMapping } from "@/types/partnerApi";
import { PartnerApiService } from "@/services/PartnerApiService";
import { toast } from "@/utils/toast";
import { Trash2, Plus } from "lucide-react";

interface ApiMappingFormProps {
  leadSource: LeadSource;
  onSaved: () => void;
  onClose: () => void;
}

const ApiMappingForm = ({ leadSource, onSaved, onClose }: ApiMappingFormProps) => {
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [mappingId, setMappingId] = useState<string | null>(null);
  
  // Load existing mapping if any
  useEffect(() => {
    const fetchMapping = async () => {
      setIsLoading(true);
      try {
        const data = await PartnerApiService.getApiMapping(leadSource.id);
        if (data) {
          setMapping(data.mapping);
          setMappingId(data.id);
        } else {
          // Initialize with empty mapping
          setMapping({});
        }
      } catch (error) {
        console.error('Error fetching API mapping:', error);
        toast.error('Failed to load API mapping');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMapping();
  }, [leadSource.id]);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await PartnerApiService.saveApiMapping(leadSource.id, mapping);
      toast.success('API mapping saved successfully');
      onSaved();
    } catch (error) {
      console.error('Error saving API mapping:', error);
      toast.error('Failed to save API mapping');
    } finally {
      setIsSaving(false);
    }
  };
  
  const addField = () => {
    setMapping(prev => ({ ...prev, '': '' }));
  };
  
  const removeField = (key: string) => {
    const newMapping = { ...mapping };
    delete newMapping[key];
    setMapping(newMapping);
  };
  
  const updateKey = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;
    
    const newMapping = { ...mapping };
    const value = newMapping[oldKey];
    delete newMapping[oldKey];
    newMapping[newKey] = value;
    setMapping(newMapping);
  };
  
  const updateValue = (key: string, value: string) => {
    setMapping(prev => ({ ...prev, [key]: value }));
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p>Loading API mappings...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Field Mapping Configuration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Define how fields from this source map to your prospect data
              </p>
            </div>
            
            <div className="space-y-2">
              {Object.entries(mapping).map(([key, value], index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Source field"
                    value={key}
                    onChange={(e) => updateKey(key, e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">→</span>
                  <Input
                    placeholder="Target field"
                    value={value}
                    onChange={(e) => updateValue(key, e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeField(key)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={addField}
                className="mt-2 w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Field Mapping
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Mapping'}
        </Button>
      </div>
    </div>
  );
};

export default ApiMappingForm;
