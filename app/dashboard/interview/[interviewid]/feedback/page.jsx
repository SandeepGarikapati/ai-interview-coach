"use client";
import { db } from '@/utils/db';
import { userAnswers } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackData, setFeedbackData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetInterviewData();
  }, []);

  const GetInterviewData = async () => {
    const result = await db.select()
      .from(userAnswers)
      .where(eq(userAnswers.mockidRef, params.interviewid))
      .orderBy(userAnswers.id);

    console.log(result);
    setFeedbackData(result);
    calculateAverageRating(result);
  };

  const calculateAverageRating = (data) => {
    if (data.length > 0) {
      const totalRating = data.reduce((sum, item) => {
        const rating = parseFloat(item.rating) || 0;
        return sum + rating;
      }, 0);
  
      const average = totalRating / data.length;
      setAverageRating(average.toFixed(1)); 
    }
  };

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl mt-1'>Here is your Interview Feedback!</h2>
      {feedbackData.length === 0 ? (
        <h2 className='text-red-500'>No feedback Found</h2>
      ) : (
        <>
          <h2 className='text-primary text-lg my-3'>
            Your Overall interview rating: <strong>{averageRating}/10</strong>
          </h2>

          <h2 className='text-sm text-gray-500'>
            Find below interview questions with the correct answer, your answer, and feedback for improvement
          </h2>

          {feedbackData && feedbackData.map((data, index) => (
            <div key={index}>
              <Collapsible className='mt-6'>
                <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left gap-7 w-full flex justify-between'>
                  {data.question} <ChevronDown />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-red-500 p-2 border rounded-lg'>
                      <strong>Rating:</strong> {data.rating}
                    </h2>
                    <h2 className='p-2 border bg-red-50 text-sm rounded-lg text-red-900'>
                      <strong>Your Answer: </strong> {data.useranswer}
                    </h2>
                    <h2 className='p-2 border bg-green-50 text-sm rounded-lg text-green-900 text-justify'>
                      <strong>Correct Answer: </strong> {data.correctanswer}
                    </h2>
                    <h2 className='p-2 border bg-blue-50 text-sm rounded-lg text-primary text-justify'>
                      <strong>Feedback: </strong> {data.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </>
      )}

      <Button className="mt-4" onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
