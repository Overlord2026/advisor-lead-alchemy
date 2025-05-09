
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ProspectRowProps {
  id: string;
  initials: string;
  bgColor: string;
  textColor: string;
  name: string;
  email: string;
  source: {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
  };
  hnwScore: {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
  };
  stage: {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
  };
  nextMeeting: string;
  createdAt: string; // Added for date filtering
  status: string; // Added for status filtering
}

const ProspectTableRow: React.FC<ProspectRowProps> = ({
  initials,
  bgColor,
  textColor,
  name,
  email,
  source,
  hnwScore,
  stage,
  nextMeeting
}) => {
  return (
    <tr className="hover:bg-muted/20 border-b border-border">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-sm font-medium ${textColor} mr-3`}>
            {initials}
          </div>
          <div>
            <div className="font-medium text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <Badge variant="outline" className={`${source.bgClass} ${source.textClass} ${source.borderClass} text-xs font-normal`}>{source.label}</Badge>
      </td>
      <td className="py-3 px-4">
        <Badge className={`${hnwScore.bgClass} ${hnwScore.textClass} ${hnwScore.borderClass} text-xs font-normal`}>{hnwScore.label}</Badge>
      </td>
      <td className="py-3 px-4">
        <Badge className={`${stage.bgClass} ${stage.textClass} ${stage.borderClass} text-xs font-normal`}>{stage.label}</Badge>
      </td>
      <td className="py-3 px-4 text-sm">{nextMeeting}</td>
      <td className="py-3 px-4 text-right">
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Edit</span>
            <i className="h-4 w-4">✏️</i>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Email</span>
            <i className="h-4 w-4">📧</i>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">More</span>
            <i className="h-4 w-4">⋯</i>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ProspectTableRow;
