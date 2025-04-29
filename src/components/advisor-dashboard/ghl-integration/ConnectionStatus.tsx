
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { formatDate } from "@/utils/salesProcessAutomation";

interface ConnectionStatusProps {
  isConnected: boolean;
  lastSynced: string | null;
  isConnecting: boolean;
  isSyncing: boolean;
  openDialog: () => void;
  handleSyncLeads: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isConnected,
  lastSynced,
  isConnecting,
  isSyncing,
  openDialog,
  handleSyncLeads
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
      <p className="text-sm font-medium text-blue-600 mb-1">Connection Status</p>
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <p className="text-lg font-medium">
          {isConnected ? 'Connected to Go High Level' : 'Not Connected'}
        </p>
      </div>
      
      {lastSynced && (
        <p className="text-sm text-muted-foreground mt-1">
          Last synced: {new Date(lastSynced).toLocaleString()}
        </p>
      )}
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          className={isConnected ? "bg-white" : "bg-blue-600 text-white"}
          onClick={openDialog}
        >
          {isConnected ? 'Update Connection' : 'Connect to GHL'}
        </Button>
        
        {isConnected && (
          <Button 
            variant="outline" 
            className="ml-2"
            onClick={handleSyncLeads}
            disabled={isSyncing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Leads'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;
