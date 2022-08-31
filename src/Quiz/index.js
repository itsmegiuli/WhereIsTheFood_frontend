import React from "react";
import { useState } from 'react';
import {Navigate} from "react-router-dom";
import questions from "./questions";


const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    //const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (valueForScore) => {
        setScore(score + valueForScore);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        }
        if (currentQuestion+1 === questions.length) {
            //finished! //todo! route to results page
            console.log("done");
            return <Navigate to="/results" />;

        }
    };
    return (

    <div className='quizContainer'>
                    <div className='qContainer'>
                        <div className='question'>{questions[currentQuestion].question}</div>
                    </div>
                    <div className='aContainer'>
                     {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button onClick={() => handleAnswerOptionClick(answerOption.valueForScore)}>{answerOption.answerText}</button>
                        ))}
                    </div>
            <div className='score-section'>
                <span> ____________________<br/>
                You scored {score}<br/></span>

                <div className='question-count'>
                    <span>You have {questions.length - currentQuestion} questions left.</span>
                </div>
            </div>
        </div>
    );

}

export default Quiz;
