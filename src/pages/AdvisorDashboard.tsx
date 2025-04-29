
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { initSalesProcessAutomation } from "@/utils/salesProcessAutomation";
import { Users, Mic, ClipboardList } from "lucide-react";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

const AdvisorDashboard = () => {
  useEffect(() => {
    // Initialize sales process automation
    initSalesProcessAutomation();
  }, []);

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4">
      <Toaster />
      
      {/* Main Heading */}
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Sales Process Automation System</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A comprehensive platform designed to streamline your entire sales workflow from lead 
          generation to client onboarding, saving you significant time while providing more consistent
          and comprehensive client information.
        </p>
      </div>

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Prospect Dashboard Card */}
        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-8 flex justify-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Prospect Dashboard</h2>
            <p className="text-muted-foreground mb-4">
              Comprehensive view of your prospect pipeline with detailed profiles and status tracking.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Prospect pipeline visualization
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Detailed prospect profiles
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Status tracking and metrics
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                AI Enhanced
              </span>
              <Button asChild>
                <Link to="/advisor/prospects">Access</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Meeting Recordings Card */}
        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-8 flex justify-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mic className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Meeting Recordings</h2>
            <p className="text-muted-foreground mb-4">
              Record, transcribe, and analyze client meetings with AI-powered insights and action items.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Multi-channel recording options
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                AI transcription and analysis
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Automated action items
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                AI Enhanced
              </span>
              <Button asChild>
                <Link to="/advisor/recordings">Access</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Questionnaires Card */}
        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-8 flex justify-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Questionnaires</h2>
            <p className="text-muted-foreground mb-4">
              Create, send, and analyze client questionnaires with intelligent insights and recommendations.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Customizable templates
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Automated delivery
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Response analysis
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                AI Enhanced
              </span>
              <Button asChild>
                <Link to="/advisor/questionnaires">Access</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboard;
