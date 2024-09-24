"use client";
import { mockinterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react';
import {db} from 'utils/db';
import QuestionsList from './_components/QuestionsList';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {


    const [interviewdata, setInterviewdata] = React.useState();
    const[mockinterviewquestions,setMockinterviewquestions] = React.useState([]);

    const[activequestionindex,setActivequestionindex] = React.useState(0);
    useEffect(() => {
        console.log(params);
        dbdata();
    }, []);
     

    const dbdata = async () => {
        try {
          console.log("Interview ID:", params.interviewid);
          const result = await db
            .select()
            .from(mockinterview)
            .where(eq(mockinterview.mockid, params.interviewid));
          
          if (result.length === 0) {
            console.error("No interview data found for the given interview ID:", params.interviewid);
            return;
          }
          
          console.log("Interview Data:", result);
          
          const questions = JSON.parse(result[0].jsonmockresp);
          setMockinterviewquestions(questions);
          setInterviewdata(result[0]);
          
        } catch (error) {
          console.error("Error fetching interview details:", error);
        }
      };


  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <QuestionsList  mockinterviewquestions ={mockinterviewquestions} activequestionindex={activequestionindex}/>

            <RecordAnswerSection mockinterviewquestions ={mockinterviewquestions} activequestionindex={activequestionindex}  interviewdata ={interviewdata}/>
        </div>
        <div className='flex justify-end gap-6'>
          {activequestionindex > 0 &&
          <Button onClick={()=>setActivequestionindex(activequestionindex-1)} >Previous Question</Button>}
          {activequestionindex!= mockinterviewquestions?.length-1 && 
          <Button onClick={()=>setActivequestionindex(activequestionindex+1)}>Next Question</Button>}
          {activequestionindex === mockinterviewquestions?.length-1 && 
          <Link href={`/dashboard/interview/${params.interviewid}/feedback`}>
          <Button>End Interview</Button>
          </Link>}
        </div>
    </div>
  )
}

export default StartInterview