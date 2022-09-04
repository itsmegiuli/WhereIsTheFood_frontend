import React from "react";
import { useState } from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import questions from "./questions";


const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const handleAnswerOptionClick = (valueForScore) => {
        setScore(score + valueForScore);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        }
        if (currentQuestion+1 === questions.length) {
            //finished! //todo! route to results page
            console.log("done");
            navigate(`/results?points=${score}`);
        }
    };

    return (

    <div className='quizContainer'>
        <div className='qContainer'>
            <div className='question'>{questions[currentQuestion].question}</div>
        </div>
        <div className='aContainer'>
            {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button
                    onClick={() => handleAnswerOptionClick(answerOption.valueForScore)}>{answerOption.answerText}</button>
            ))}
        </div>
    </div>
    );

}

export default Quiz;
