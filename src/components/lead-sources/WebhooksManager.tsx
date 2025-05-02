import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2, RefreshCw, Plus } from "lucide-react";
import { toast } from "@/utils/toast";
import { LeadSource } from "@/types/leadSources";
import { PartnerWebhook, EVENT_TYPES, WebhookFormData } from "@/types/partnerApi";
import { PartnerApiService } from "@/services/PartnerApiService";
import { useModal } from "@/components/ui/modal";

interface WebhooksManagerProps {
  leadSource: LeadSource;
  onClose: () => void;
}

const WebhooksManager = ({ leadSource, onClose }: WebhooksManagerProps) => {
  const [webhooks, setWebhooks] = useState<PartnerWebhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<WebhookFormData>({
    event_type: 'imported',
    target_url: '',
    is_active: true
  });
  
  const { 
    isOpen: isDeleteModalOpen, 
    open: openDeleteModal, 
    close: closeDeleteModal 
  } = useModal();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchWebhooks();
  }, [leadSource.id]);
  
  const fetchWebhooks = async () => {
    try {
      setLoading(true);
      const data = await PartnerApiService.getWebhooks(leadSource.id);
      setWebhooks(data);
    } catch (error) {
      console.error('Error fetching webhooks:', error);
      toast.error('Failed to fetch webhooks');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateWebhook = async () => {
    if (!formData.target_url.trim()) {
      toast.error('Target URL is required');
      return;
    }
    
    try {
      setIsCreating(true);
      const newWebhook = await PartnerApiService.createWebhook(
        leadSource.id,
        formData.event_type,
        formData.target_url,
        formData.is_active
      );
      
      setWebhooks([newWebhook, ...webhooks]);
      setFormData({
        event_type: 'imported',
        target_url: '',
        is_active: true
      });
      
      toast.success('Webhook created successfully');
    } catch (error) {
      console.error('Error creating webhook:', error);
      toast.error('Failed to create webhook');
    } finally {
      setIsCreating(false);
    }
  };
  
  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await PartnerApiService.updateWebhook(id, { is_active: isActive });
      setWebhooks(webhooks.map(webhook => 
        webhook.id === id ? { ...webhook, is_active: isActive } : webhook
      ));
      
      toast.success(`Webhook ${isActive ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error updating webhook:', error);
      toast.error('Failed to update webhook status');
    }
  };
  
  const handleTestWebhook = async (id: string) => {
    try {
      setTestingId(id);
      const result = await PartnerApiService.testWebhook(id);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error testing webhook:', error);
      toast.error('Failed to test webhook');
    } finally {
      setTestingId(null);
    }
  };
  
  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    openDeleteModal();
  };
  
  const confirmDelete = async () => {
    if (!deletingId) return;
    
    try {
      await PartnerApiService.deleteWebhook(deletingId);
      setWebhooks(webhooks.filter(webhook => webhook.id !== deletingId));
      toast.success('Webhook deleted successfully');
    } catch (error) {
      console.error('Error deleting webhook:', error);
      toast.error('Failed to delete webhook');
    } finally {
      setDeletingId(null);
      closeDeleteModal();
    }
  };
  
  const getEventTypeLabel = (eventType: string) => {
    const event = EVENT_TYPES.find(e => e.value === eventType);
    return event ? event.label : eventType;
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Webhook Management</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure webhooks to notify external systems about events
        </p>
      </div>
      
      {/* Webhook creation form */}
      <div className="border rounded-md p-4 space-y-4 bg-muted/10">
        <h4 className="font-medium">Add New Webhook</h4>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Event Type</label>
            <Select
              value={formData.event_type}
              onValueChange={(value) => setFormData({ ...formData, event_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_TYPES.map((event) => (
                  <SelectItem key={event.value} value={event.value}>{event.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 block">Target URL</label>
            <Input
              placeholder="https://example.com/webhook"
              value={formData.target_url}
              onChange={(e) => setFormData({ ...formData, target_url: e.target.value })}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <label className="text-sm">Enable webhook immediately</label>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleCreateWebhook} disabled={isCreating}>
            <Plus className="h-4 w-4 mr-2" />
            {isCreating ? 'Creating...' : 'Add Webhook'}
          </Button>
        </div>
      </div>
      
      {/* Existing webhooks */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Type</TableHead>
              <TableHead>Target URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No webhooks configured yet
                </TableCell>
              </TableRow>
            ) : (
              webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell>
                    <Badge variant="outline">
                      {getEventTypeLabel(webhook.event_type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm truncate max-w-[200px]">
                    {webhook.target_url}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={webhook.is_active}
                        onCheckedChange={(checked) => handleToggleActive(webhook.id, checked)}
                      />
                      <span className="text-sm">
                        {webhook.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTestWebhook(webhook.id)}
                        disabled={testingId === webhook.id || !webhook.is_active}
                      >
                        {testingId === webhook.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : 'Test'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(webhook.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
      
      {/* Delete confirmation modal - would actually use the Modal component in a real implementation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p className="my-4">Are you sure you want to delete this webhook? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhooksManager;
