
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

    // Example function to test the post-call API - NOT automatically called
    const testPostCall = async () => {
      try {
        const prospectId = '123';
        // Test with valid data
        const transcriptText = "Tony: Hi Jane, thanks for meeting with me today.\nJane: Thanks for having me. My goal is to ensure I have enough income in retirement.\nTony: I understand. Next step is to review your current portfolio and create a retirement income plan.";
        
        const { data, error } = await supabase.functions.invoke('post-call', {
          body: {
            transcriptText,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (error) {
          console.error('Error testing post-call:', error);
          toast.error('Failed to test post-call API');
        } else {
          console.log('Post-call test response:', data);
          toast.success('Post-call API test successful!');
          
          // Test with invalid input to verify error handling
          const { data: invalidData, error: invalidError } = await supabase.functions.invoke('post-call', {
            body: {
              transcriptText: 12345,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (invalidError) {
            console.log('Invalid transcript correctly rejected:', invalidError);
          } else {
            console.log('Invalid transcript response:', invalidData);
          }
        }
      } catch (err) {
        console.error('Exception in post-call test:', err);
      }
    };

    // Example function to test the heygen script API - NOT automatically called
    const testHeyGenScript = async () => {
      try {
        // Test with valid data
        const emailBody = "Hi Jane,\nThank you for your time yesterday discussing your retirement goals.\nAs we discussed, I'll prepare a detailed analysis of your current portfolio and provide recommendations for generating consistent income during retirement.\nPlease let me know if you have any questions before our next meeting.\nBest regards,\nTony";
        
        const { data, error } = await supabase.functions.invoke('heygen-script', {
          body: {
            emailBody,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (error) {
          console.error('Error testing heygen script:', error);
          toast.error('Failed to test heygen script API');
        } else {
          console.log('HeyGen script test response:', data);
          toast.success('HeyGen script API test successful!');
          
          // Test with empty input to verify error handling
          const { data: emptyData, error: emptyError } = await supabase.functions.invoke('heygen-script', {
            body: {
              emailBody: "",
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (emptyError) {
            console.log('Empty email body correctly rejected:', emptyError);
          } else {
            console.log('Empty email body response:', emptyData);
          }
        }
      } catch (err) {
        console.error('Exception in heygen script test:', err);
      }
    };
    
    // Example function to test the questionnaire recommend API - NOT automatically called
    const testQuestionnaireRecommend = async () => {
      try {
        // Test with valid data
        const summaryBullets = ["Goal: retirement income", "Assets: $750K"];
        const responseData = { "Q1": "Yes", "Q2": "No" };
        
        const { data, error } = await supabase.functions.invoke('questionnaire-recommend', {
          body: {
            summaryBullets,
            responseData
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (error) {
          console.error('Error testing questionnaire recommend:', error);
          toast.error('Failed to test questionnaire recommend API');
        } else {
          console.log('Questionnaire recommend test response:', data);
          toast.success('Questionnaire recommend API test successful!');
          
          // Test with invalid input to verify error handling
          const { data: invalidData, error: invalidError } = await supabase.functions.invoke('questionnaire-recommend', {
            body: {
              summaryBullets: "not-an-array"
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (invalidError) {
            console.log('Invalid summary bullets correctly rejected:', invalidError);
          } else {
            console.log('Invalid summary bullets response:', invalidData);
          }
        }
      } catch (err) {
        console.error('Exception in questionnaire recommend test:', err);
      }
    };

    // Functions are defined but NOT called automatically
    // Uncomment the line below ONLY when you want to test the APIs
    // testCallPrep();
    // testPostCall();
    // testHeyGenScript();
    // testQuestionnaireRecommend();
  }, []);
  
  // Force immediate redirect with no conditions
  return <Navigate to="/advisor" replace />;
};

export default Home;
