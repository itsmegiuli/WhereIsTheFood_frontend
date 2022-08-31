import React, from "react";
import { useState } from 'react';
import {Navigate} from "react-router-dom";

function getQuestions() {
    fetch('qs_and_as.json')
        .then((res) => res.json())
        .then((data) => {
            console.log('json data', data);
            return data.json();
        })
}


const Quiz = () => {
    const questions = [getQuestions.data.json()];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    //const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (valueForScore) => {
        setScore(score + valueForScore);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            //finished! //todo! route to results page
            return <Navigate to="/results" replace />;
        }
    };
    return (
    <div className='quizContainer'>
                    <div className='qContainer'>

                        <div className='question'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='aContainer'>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button onClick={() => handleAnswerOptionClick(answerOption.valueForScore)}>{answerOption.answerText}</button>
                        ))}
                    </div>
            <div className='score-section'>
                ____________________
                You scored {score}.
                <div className='question-count'>
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
            </div>
        </div>
    );

}

export default Quiz;
