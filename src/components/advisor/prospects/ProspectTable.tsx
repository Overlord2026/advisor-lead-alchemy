import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, FileSpreadsheet } from "lucide-react";
import ProspectTableRow, { ProspectRowProps } from "./ProspectTableRow";
import AddProspectModal from './AddProspectModal';
import { ProspectService } from '@/services/ProspectService';
import { toast } from 'sonner';

interface ProspectTableProps {
  leadSourceId: string | null;
}

const ProspectTable = ({ leadSourceId }: ProspectTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prospects, setProspects] = useState<ProspectRowProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Sample prospect data as fallback
  const sampleProspects: ProspectRowProps[] = [
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

  const loadProspects = async () => {
    setIsLoading(true);
    try {
      // Update to use leadSourceId in the fetch if provided
      const data = await ProspectService.getProspects(leadSourceId);
      
      if (data && data.length > 0) {
        // Map the database prospects to the display format
        const mappedProspects = data.map(prospect => {
          const name = `${prospect.first_name || ''} ${prospect.last_name || ''}`.trim();
          const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
          
          return {
            initials: initials || "?",
            bgColor: getRandomColor(),
            textColor: "text-blue-600",
            name,
            email: prospect.email || '',
            source: {
              label: prospect.source || 'Unknown',
              bgClass: "bg-blue-100",
              textClass: "text-blue-800",
              borderClass: "border-blue-200"
            },
            hnwScore: {
              label: prospect.hnw_score || 'Not Set',
              bgClass: getHnwScoreColor(prospect.hnw_score),
              textClass: getHnwScoreTextColor(prospect.hnw_score),
              borderClass: getHnwScoreBorderColor(prospect.hnw_score)
            },
            stage: {
              label: prospect.stage || 'Initial Contact',
              bgClass: getStageColor(prospect.stage),
              textClass: getStageTextColor(prospect.stage),
              borderClass: getStageBorderColor(prospect.stage)
            },
            nextMeeting: prospect.next_meeting ? new Date(prospect.next_meeting).toLocaleDateString() : 'Not scheduled'
          };
        });
        
        setProspects(mappedProspects);
      } else {
        // Fallback to sample data if no prospects are found
        setProspects(sampleProspects);
      }
    } catch (error) {
      console.error("Error loading prospects:", error);
      toast.error("Failed to load prospects");
      // Fall back to sample data on error
      setProspects(sampleProspects);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadProspects();
  }, [leadSourceId]);

  const getRandomColor = () => {
    const colors = [
      "bg-blue-100", "bg-green-100", "bg-yellow-100", 
      "bg-purple-100", "bg-pink-100", "bg-indigo-100"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const getHnwScoreColor = (score: string | null) => {
    switch(score) {
      case 'Very High': return 'bg-green-100';
      case 'High': return 'bg-green-100';
      case 'Medium': return 'bg-yellow-100';
      case 'Low': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };
  
  const getHnwScoreTextColor = (score: string | null) => {
    switch(score) {
      case 'Very High': return 'text-green-800';
      case 'High': return 'text-green-800';
      case 'Medium': return 'text-yellow-800';
      case 'Low': return 'text-red-800';
      default: return 'text-gray-800';
    }
  };
  
  const getHnwScoreBorderColor = (score: string | null) => {
    switch(score) {
      case 'Very High': return 'border-green-200';
      case 'High': return 'border-green-200';
      case 'Medium': return 'border-yellow-200';
      case 'Low': return 'border-red-200';
      default: return 'border-gray-200';
    }
  };
  
  const getStageColor = (stage: string | null) => {
    switch(stage) {
      case 'Initial Contact': return 'bg-blue-100';
      case 'Discovery': return 'bg-blue-100';
      case 'Questionnaire': return 'bg-purple-100';
      case 'Follow-up': return 'bg-yellow-100';
      case 'Proposal': return 'bg-green-100';
      case 'Decision': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };
  
  const getStageTextColor = (stage: string | null) => {
    switch(stage) {
      case 'Initial Contact': return 'text-blue-800';
      case 'Discovery': return 'text-blue-800';
      case 'Questionnaire': return 'text-purple-800';
      case 'Follow-up': return 'text-yellow-800';
      case 'Proposal': return 'text-green-800';
      case 'Decision': return 'text-red-800';
      default: return 'text-gray-800';
    }
  };
  
  const getStageBorderColor = (stage: string | null) => {
    switch(stage) {
      case 'Initial Contact': return 'border-blue-200';
      case 'Discovery': return 'border-blue-200';
      case 'Questionnaire': return 'border-purple-200';
      case 'Follow-up': return 'border-yellow-200';
      case 'Proposal': return 'border-green-200';
      case 'Decision': return 'border-red-200';
      default: return 'border-gray-200';
    }
  };

  const handleProspectCreated = () => {
    loadProspects();
  };

  // Filter prospects based on search query
  const filteredProspects = prospects.filter(prospect => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      prospect.name.toLowerCase().includes(query) || 
      prospect.email.toLowerCase().includes(query)
    );
  });

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link to="/advisor/lead-sources" className="flex items-center text-sm text-primary hover:underline">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Manage Lead Sources
              </Link>
              <AddProspectModal onSuccess={handleProspectCreated} />
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
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8">Loading prospects...</td>
                  </tr>
                ) : filteredProspects.length > 0 ? (
                  filteredProspects.map((prospect, index) => (
                    <ProspectTableRow key={index} {...prospect} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      {searchQuery ? "No prospects match your search" : "No prospects found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {prospects.length > 0 && (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProspectTable;
