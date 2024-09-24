"use client";
import React from 'react';

const Questions = () => {

    const faqsList = [
        {
            q: "What is the AI Interview Taker?",
            a: "The AI Interview Taker is an advanced platform that uses artificial intelligence to simulate real-life job interviews. It provides instant feedback on your responses, helping you prepare for actual interviews by improving your communication and critical thinking skills."
        },
        {
            q: "How does the AI evaluate my answers?",
            a: "The AI evaluates your responses based on various factors like relevance, clarity, communication style, and domain knowledge. It uses natural language processing (NLP) algorithms to assess your answers and provide constructive feedback."
        },
        {
            q: "Can the AI Interview Taker simulate interviews for different job roles?",
            a: "Yes! The platform offers tailored interview simulations for a variety of industries and job roles, ranging from technical positions to managerial and creative roles. Simply choose your target role, and the AI will ask relevant questions."
        },
        {
            q: "Is my personal data and interview performance secure?",
            a: "Absolutely. We prioritize your privacy and ensure that all personal data and interview recordings are encrypted and stored securely. Your information will never be shared with third parties without your consent."
        },
        {
            q: "How can I improve my interview performance using this platform?",
            a: "After each simulated interview, the AI will provide detailed feedback on your performance. This includes areas for improvement, such as communication style, technical knowledge, and body language (if applicable). You can track your progress over time and practice accordingly."
        },
        {
            q: "Can I access the platform on mobile devices?",
            a: "Yes, the AI Interview Taker is fully responsive and works on both desktop and mobile devices. You can practice your interview skills anywhere, anytime, with just an internet connection."
        },
    ]

    return (
        <div className="leading-relaxed mt-12 mx-4 md:mx-8">
            <div className="text-center space-y-3">
                <h1 className="block text-gray-800 text-3xl font-semibold">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Answered all frequently asked questions. Can’t find the answer you’re looking for? feel free to contact us.
                </p>
            </div>
            <div className="relative bg-white rounded-md mt-10 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl sm:mx-auto" style={{boxShadow: '0px 7px 20px 7px #F1F1F1'}}>
                <div className="grid gap-4 py-8 md:grid-cols-2">
                    {
                        faqsList.map((item, idx) => (
                            <div className="space-y-3 mt-6 px-8" key={idx}>
                                <h4 className="text-gray-800 text-xl font-semibold ">
                                    {item.q}
                                </h4>
                                <p className="text-gray-500">
                                    {item.a}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <span className="w-0.5 h-0.7 bg-gray-200 mb-4 absolute top-0 left-0 right-0 hidden md:block"></span>
            </div>
        </div>
    )
}

export default Questions;
