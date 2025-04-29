
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

// This component always redirects to the advisor dashboard
const Home = () => {
  useEffect(() => {
    console.log("Home component - Forcing redirect to Advisor Dashboard");
    
    // Example function to test the call prep API - NOT automatically called
    const testCallPrep = async () => {
      try {
        const prospectId = '123';
        // Test with valid data
        const bookingText = "Invitee: Jane Doe\nEmail: jane@example.com\nTime: May 1 2:00 PM ET\nGoals: retirement income from stock portfolio\nAssets: $750,000\nZoom link: https://zoom.us/test";
        
        const { data, error } = await supabase.functions.invoke('prospect-call-prep', {
          body: {
            bookingText,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (error) {
          console.error('Error testing call prep:', error);
          toast.error('Failed to test call prep API');
        } else {
          console.log('Call prep test response:', data);
          toast.success('Call prep API test successful!');
          
          // Test with empty input to verify error handling
          const { data: emptyData, error: emptyError } = await supabase.functions.invoke('prospect-call-prep', {
            body: {
              bookingText: "",
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (emptyError) {
            console.log('Empty booking text correctly rejected:', emptyError);
          } else {
            console.log('Empty booking text response:', emptyData);
          }
        }
      } catch (err) {
        console.error('Exception in call prep test:', err);
      }
    };

    // Function is defined but NOT called automatically
    // Uncomment the line below ONLY when you want to test the API
    // testCallPrep();
  }, []);
  
  // Force immediate redirect with no conditions
  return <Navigate to="/advisor" replace />;
};

export default Home;
