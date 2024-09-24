"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useUser } from '@clerk/clerk-react';
import { chatSession } from '@/utils/Geminimodel';
import { db } from '@/utils/db';
import moment from 'moment';
import { userAnswers } from '@/utils/schema';


// Dynamically import Webcam so it doesn't load on the server
const Webcam = dynamic(() => import('react-webcam'), { ssr: false });

function RecordAnswerSection({ mockinterviewquestions, activequestionindex, interviewdata }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser(); // Assuming you have a user context hook
  const [loading, setLoading] = useState(false);
  const [webcamError, setWebcamError] = useState('');
  
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    interimResults: true, // ensure interim results are processed
  });

  // Append speech-to-text results to userAnswer
  useEffect(() => {
    if (results && results.length > 0) {
      results.forEach((result) => {
        if (result?.transcript) {
          setUserAnswer((prevAns) => prevAns + ' ' + result.transcript);
        }
      });
    }
  }, [results]);

  // Save to DB after recording ends and if the userAnswer length is valid
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      console.log('Saving answer to DB:', userAnswer);
      updateUserAnswerInDb();
    }
  }, [userAnswer, isRecording]);

  useEffect(() => {
    if(isRecording){
    toast.info('Answer should be more than 10 characters');
    }
  }, [isRecording]);

  const saveUserAnswer = async () => {
    setLoading(true);

    if (isRecording) {
      stopSpeechToText(); // Only stop recording on button click
      console.log('Recording stopped');
    } else {
      startSpeechToText(); // Start recording on button click
      console.log('Recording started');
    }

    setLoading(false);
  };

  const updateUserAnswerInDb = async () => {
    console.log('User answer ready to save:', userAnswer);
  
    // Check if interviewdata and mockid are valid
    if (!interviewdata || !interviewdata.mockid) {
      console.error("interviewdata or mockid is undefined");
      toast.error("Interview data is not available. Please try again.");
      return; // Exit the function
    }
  
    const feedbackPrompt = `Question:${mockinterviewquestions[activequestionindex]?.question} Answer:${userAnswer}, Depends on question and user answer for given interview question please give us rating for answer and feedback in JSON format with rating and feedback fields.Make sure that answer is in JSON format only.`;
  
    const result = await chatSession.sendMessage(feedbackPrompt);
    let responseText = await result.response.text();
  
    // Log the original response text
    console.log("Original Response Text:", responseText);
  
    // Sanitize the response to remove bad control characters and clean up non-JSON parts
    responseText = responseText.trim()
      .replace(/```json/g, '')   // Remove any markdown JSON block formatting
      .replace(/```/g, '')       // Remove leftover closing markdown
      .replace(/[\u0000-\u001F]+/g, ''); // Remove control characters from JSON
  
    console.log("Sanitized Response Text:", responseText);
  
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      toast.error("There was an error parsing the feedback. Please try again.", { duration: 5000 });
      setLoading(false);
      return;
    }
  
    const resp = await db.insert(userAnswers).values({
      mockidRef: interviewdata.mockid, // Ensure this is defined
      question: mockinterviewquestions[activequestionindex]?.question,
      correctanswer: mockinterviewquestions[activequestionindex]?.answer,
      useranswer: userAnswer,
      feedback: jsonResponse?.feedback,
      rating: jsonResponse?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdat: moment().format('YYYY-MM-DD HH:mm:ss')
    });
  
    if (resp) {
      toast.success('Answer recorded successfully');
      setUserAnswer('');
      setResults([]); // Clear the results
    }
    setLoading(false);
    // Simulate API call to save
    setResults([]); // Clear the results
    setTimeout(() => {
      setLoading(false);
      toast.success('Click on Next Question to continue');
    }, 1000);
  };

  // Error handler for webcam
  const handleWebcamError = (error) => {
    console.error('Webcam error:', error);
    setWebcamError('Could not access webcam. Please check permissions and try again.');
    toast.error('Could not access webcam. Please check permissions.');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 my-15 bg-black">
        {webcamError ? (
          <p className="text-red-500">{webcamError}</p>
        ) : (
          <>
            <Image src="/webcam.png" width={200} height={200} className="absolute" alt="Webcam Placeholder" />
            <Webcam
              mirrored={true}
              onUserMediaError={handleWebcamError} // Error handler
              style={{
                width: '100%',
                height: 300,
                zIndex: 10,
              }}
            />
          </>
        )}
      </div>

      <Button variant="outline" className="my-10" disabled={loading} onClick={saveUserAnswer}>
        {isRecording ? (
          <h2 className="text-red-700 flex gap-2">
            <Mic /> Recording ...
          </h2>
        ) : (
          <h2 className="text-blue-700 flex gap-2">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
