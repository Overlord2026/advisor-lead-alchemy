
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, FileSpreadsheet } from "lucide-react";
import ProspectTableRow, { ProspectRowProps } from "./ProspectTableRow";

const ProspectTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Sample prospect data
  const prospects: ProspectRowProps[] = [
    {
      initials: "JD",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      name: "John Doe",
      email: "john.doe@example.com",
      source: {
        label: "Facebook Ad",
        bgClass: "bg-blue-100",
        textClass: "text-blue-800",
        borderClass: "border-blue-200"
      },
      hnwScore: {
        label: "High",
        bgClass: "bg-green-100",
        textClass: "text-green-800",
        borderClass: "border-green-200"
      },
      stage: {
        label: "Initial Meeting",
        bgClass: "bg-blue-100",
        textClass: "text-blue-800",
        borderClass: "border-blue-200"
      },
      nextMeeting: "Apr 24, 2025"
    },
    {
      initials: "MS",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      name: "Mary Smith",
      email: "mary@example.com",
      source: {
        label: "Referral",
        bgClass: "bg-purple-100",
        textClass: "text-purple-800",
        borderClass: "border-purple-200"
      },
      hnwScore: {
        label: "Medium",
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-800",
        borderClass: "border-yellow-200"
      },
      stage: {
        label: "Follow-up",
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-800",
        borderClass: "border-yellow-200"
      },
      nextMeeting: "Apr 25, 2025"
    },
    {
      initials: "RJ",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      name: "Robert Johnson",
      email: "robert@example.com",
      source: {
        label: "LinkedIn",
        bgClass: "bg-blue-100",
        textClass: "text-blue-800",
        borderClass: "border-blue-200"
      },
      hnwScore: {
        label: "Very High",
        bgClass: "bg-green-100",
        textClass: "text-green-800",
        borderClass: "border-green-200"
      },
      stage: {
        label: "Questionnaire",
        bgClass: "bg-purple-100",
        textClass: "text-purple-800",
        borderClass: "border-purple-200"
      },
      nextMeeting: "Apr 26, 2025"
    },
    {
      initials: "AW",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      name: "Amanda Williams",
      email: "amanda@example.com",
      source: {
        label: "Website",
        bgClass: "bg-gray-100",
        textClass: "text-gray-800",
        borderClass: "border-gray-200"
      },
      hnwScore: {
        label: "Medium",
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-800",
        borderClass: "border-yellow-200"
      },
      stage: {
        label: "Proposal",
        bgClass: "bg-green-100",
        textClass: "text-green-800",
        borderClass: "border-green-200"
      },
      nextMeeting: "Apr 27, 2025"
    },
    {
      initials: "MB",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      name: "Michael Brown",
      email: "michael@example.com",
      source: {
        label: "Facebook Ad",
        bgClass: "bg-blue-100",
        textClass: "text-blue-800",
        borderClass: "border-blue-200"
      },
      hnwScore: {
        label: "High",
        bgClass: "bg-green-100",
        textClass: "text-green-800",
        borderClass: "border-green-200"
      },
      stage: {
        label: "Decision",
        bgClass: "bg-red-100",
        textClass: "text-red-800",
        borderClass: "border-red-200"
      },
      nextMeeting: "Apr 28, 2025"
    }
  ];

  return (
    <Card className="bg-card">
      <CardContent className="pt-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Prospect List</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search prospects..."
                  className="pl-8 pr-4 py-2 text-sm rounded-md border border-border bg-background w-64"
                />
              </div>
              <Link to="/advisor/lead-sources" className="flex items-center text-sm text-primary hover:underline">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Manage Lead Sources
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-left border-b border-border">
                <tr>
                  <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Name</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Source</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted-foreground">HNW Score</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Stage</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Next Meeting</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((prospect, index) => (
                  <ProspectTableRow key={index} {...prospect} />
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(2)}
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(3)}
            >
              3
            </Button>
            <span className="mx-2">...</span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(10)}
            >
              10
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProspectTable;
