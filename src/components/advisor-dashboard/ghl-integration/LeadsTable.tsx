
import React from 'react';
import { Button } from "@/components/ui/button";

interface LeadsTableProps {
  isConnected: boolean;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ isConnected }) => {
  if (!isConnected) return null;
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium">Recent Leads from GHL</p>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Source</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            <tr className="hover:bg-blue-50/50">
              <td className="px-4 py-3 whitespace-nowrap">John Smith</td>
              <td className="px-4 py-3 whitespace-nowrap">john.smith@example.com</td>
              <td className="px-4 py-3 whitespace-nowrap">(555) 123-4567</td>
              <td className="px-4 py-3 whitespace-nowrap">Facebook Ad</td>
              <td className="px-4 py-3 whitespace-nowrap">Apr 28, 2025</td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <Button size="sm" variant="outline">Schedule</Button>
              </td>
            </tr>
            <tr className="hover:bg-blue-50/50">
              <td className="px-4 py-3 whitespace-nowrap">Jane Doe</td>
              <td className="px-4 py-3 whitespace-nowrap">jane.doe@example.com</td>
              <td className="px-4 py-3 whitespace-nowrap">(555) 987-6543</td>
              <td className="px-4 py-3 whitespace-nowrap">Website Form</td>
              <td className="px-4 py-3 whitespace-nowrap">Apr 27, 2025</td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <Button size="sm" variant="outline">Schedule</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
