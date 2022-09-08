import React from "react";
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import questions from "./questions";


const Quiz = () => {
//hooks can only be used inside function components
    const [currentQuestion, setCurrentQuestion] = useState(0); //default state = 0
    //useState returns an array with 2 values ...
    // 1st thing of array = current state, 2nd thing is the function to update that
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const handleAnswerOptionClick = (valueForScore) => {
        //everytime this is called, it will re-render our component with the new score value (according to what was previously clicked)
        setScore(score + valueForScore);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        }
        if (currentQuestion+1 === questions.length) {
            //if end reached: get results (with current score as query)
            navigate(`/results?points=${score}`);
        }
    };

    return (

    <div className='quizContainer'>
        <div className='qContainer'>
            <div className='question'>{questions[currentQuestion].question}</div>
        </div>
        <div className='aContainer'>
            {/* map() method creates a new array ("filtered" with answers of the current question) */}
            {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button onClick={() => handleAnswerOptionClick(answerOption.valueForScore)}>
                    {answerOption.answerText}
                </button>
            ))}
        </div>
    </div>
    );

}

export default Quiz;
