import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

function InterviewcardList({interview}) {
    const router = useRouter();

  return (
    <div className='border shawdow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobposition}</h2>
        <h2 className='text-sm text-gray-800'>{interview?.jobexp} Years of Experience</h2>
        <h2 className='text-sm text-gray-400'>Created At: {interview?.createdat.slice(0,10)}</h2>

        <div className='flex justify-between mt-2 gap-5'> 
            <Button size = "sm" variant ="outline" className="w-full"
            onClick={() => router.push(`/dashboard/interview/${interview?.mockid}/feedback`)}
            >FeedBack</Button>
            <Button size = "sm" className="bg-blue-700 text-white w-full"
            onClick={() => router.push(`/dashboard/interview/${interview?.mockid}/start`)}
            >Start</Button>
        </div>
    </div>
  )
}

export default InterviewcardList