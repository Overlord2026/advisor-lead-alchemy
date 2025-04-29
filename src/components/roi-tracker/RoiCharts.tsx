
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from "@/utils/format";
import { ChannelData } from './types';

interface RoiChartsProps {
  channelData: ChannelData[];
  isLoading: boolean;
}

export const RoiCharts: React.FC<RoiChartsProps> = ({ channelData, isLoading }) => {
  // Format data for the chart
  const chartData = channelData.map(channel => ({
    name: channel.name.replace(' Ads', ''),
    roi: channel.roi,
    fill: getChannelColor(channel.name)
  }));

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <Card className="md:col-span-3">
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis 
                  label={{ value: 'Return on Investment (x)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}x`, 'ROI']} 
                  labelFormatter={(label) => `Channel: ${label}`}
                />
                <Bar dataKey="roi" fill="#4a6cf7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead className="text-right">Spend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channelData.map((channel, index) => (
                <TableRow key={index} className="hover:bg-muted/50 cursor-pointer">
                  <TableCell>
                    <div className="channel-info flex items-center gap-3">
                      <div className={`channel-icon w-7 h-7 rounded-full flex items-center justify-center text-white ${getChannelClass(channel.name)}`}>
                        {getChannelIcon(channel.name)}
                      </div>
                      <span>{channel.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(channel.spend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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

const getChannelColor = (channelName: string): string => {
  if (channelName.toLowerCase().includes('facebook')) return '#4267B2';
  if (channelName.toLowerCase().includes('linkedin')) return '#0077B5';
  if (channelName.toLowerCase().includes('google')) return '#DB4437';
  if (channelName.toLowerCase().includes('referral')) return '#34A853';
  return '#6E59A5';
};
