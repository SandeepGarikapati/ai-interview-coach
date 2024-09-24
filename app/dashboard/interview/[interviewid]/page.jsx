"use client";
import { mockinterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react';
import { db } from '@/utils/db';    
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Interview({ params }) {
  const [interviewdata, setInterviewdata] = React.useState();
  const [webcamenabled, setWebcamenabled] = React.useState(false);

  useEffect(() => {
    console.log(params);
    interviewDetails();
  }, [params]);

  const interviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(mockinterview)
        .where(eq(mockinterview.mockid, params.interviewid));
      console.log(result);
      setInterviewdata(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
        {interviewdata && (
          <div className="flex flex-col gap-5">
            <div className="p-5 rounded-lg border">
              <h2 className="text-lg">
                <strong>Job Post:</strong> {interviewdata.jobposition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/TechStack:</strong>{" "}
                {interviewdata.jobdescription}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong> {interviewdata.jobexp}
              </h2>
            </div>
            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
              <h2 className="flex items-center text-yellow-600">
                <Lightbulb className="mr-2" />
                <strong>Information</strong>
              </h2>
              <h2 className='mt-5'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center items-center">
          {webcamenabled ? (
            <Webcam
              onUserMedia={() => setWebcamenabled(true)}
              onUserMediaError={() => setWebcamenabled(false)}
              style={{ height: 300, width: 300 }}
              mirrored={true}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border ml-5" />
              <Button
                className="mt-5" // Adjusts margin to move the button down
                onClick={() => setWebcamenabled(true)}
              >
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
        
      </div>
      <div className='flex justify-end items-end'>
        <Link href={`/dashboard/interview/${params.interviewid}/start`}>
            <Button> Start Interview </Button>
        </Link>
      </div>
    </div>
  );
}


export default Interview;
