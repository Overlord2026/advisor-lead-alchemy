
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import type { CampaignData } from './ROITracker';

interface CampaignTableProps {
  campaigns: CampaignData[];
}

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Channel</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Spend</TableHead>
            <TableHead>Prospects</TableHead>
            <TableHead>Clients</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign, index) => (
            <TableRow key={index} className="hover:bg-muted/50 cursor-pointer">
              <TableCell>
                <div className="font-medium">{campaign.name}</div>
              </TableCell>
              <TableCell>
                <div className="channel-info flex items-center gap-2">
                  <div className={`channel-icon w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${getChannelClass(campaign.channel)}`}>
                    {getChannelIcon(campaign.channel)}
                  </div>
                  <span>{campaign.channel}</span>
                </div>
              </TableCell>
              <TableCell>{formatDate(campaign.startDate)}</TableCell>
              <TableCell>{formatDate(campaign.endDate)}</TableCell>
              <TableCell>{formatCurrency(campaign.spend)}</TableCell>
              <TableCell>{campaign.prospects}</TableCell>
              <TableCell>{campaign.clients}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Helper functions
const getChannelClass = (channelName: string): string => {
  if (channelName.toLowerCase().includes('facebook')) return 'facebook';
  if (channelName.toLowerCase().includes('linkedin')) return 'linkedin';
  if (channelName.toLowerCase().includes('google')) return 'google';
  if (channelName.toLowerCase().includes('referral')) return 'referral';
  return '';
};

const getChannelIcon = (channelName: string): string => {
  if (channelName.toLowerCase().includes('facebook')) return 'F';
  if (channelName.toLowerCase().includes('linkedin')) return 'In';
  if (channelName.toLowerCase().includes('google')) return 'G';
  if (channelName.toLowerCase().includes('referral')) return 'R';
  return '';
};
