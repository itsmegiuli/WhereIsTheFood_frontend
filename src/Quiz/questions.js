const questions = [
    {
        question: 'Are you feeling adventurous today?',
        answerOptions: [
            { answerText: "Never", valueForScore: 1 },
            { answerText: "Not today", valueForScore: 2 },
            { answerText: "Sometimes", valueForScore: 3 },
            { answerText: "Always", valueForScore: 4 }
        ]
    },
    {
        question: 'Are you... ',
        answerOptions: [
            { answerText: "...vegan?", valueForScore: 1 },
            { answerText: "...vegetarian?", valueForScore: 4 },
            { answerText: "...pescaterian?", valueForScore: 3 },
            { answerText: "...carnivore?", valueForScore: 2 }
        ]
    },
    {
        question: 'What´s your budget?',
        answerOptions: [
            { answerText: "I´m broke", valueForScore: 4 },
            { answerText: "I´m cheap, but not cheap cheap", valueForScore: 1 },
            { answerText: "I can afford to splurge", valueForScore: 3 },
            { answerText: "Hunger has no price", valueForScore: 2 }
        ]
    },
];

export default questions;