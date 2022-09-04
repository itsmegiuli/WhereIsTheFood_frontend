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
    {
        question: 'What do you crave?',
        answerOptions: [
            {answerText: "Something sweet", valueForScore: 2},
            {answerText: "Carbs", valueForScore: 1},
            {answerText: "Something savoury", valueForScore: 3},
            {answerText: "Something spicy", valueForScore: 4},
        ],
    },
    {
        question: 'Pick a vacation destination',
        answerOptions: [
            {answerText: "Amsterdam", valueForScore: 1},
            {answerText: "Istanbul", valueForScore: 3},
            {answerText: "Honolulu", valueForScore: 2},
            {answerText: "Okinawa", valueForScore: 4}
        ],
    },
    {
        question: 'How much time do you have?',
        answerOptions: [
            {answerText: "45 minutes", valueForScore: 1},
            {answerText: "I take my sweet time",  valueForScore: 4},
            {answerText: "Couple minutes", valueForScore: 3},
            {answerText:  "Half an hour - tops!", valueForScore: 2}
        ],
    },
    {
        question: 'I like my food...',
        answerOptions: [
            {answerText: "salted",  valueForScore: 1},
            {answerText: "seasoned", valueForScore: 2},
            {answerText: "spicy", valueForScore: 3},
            {answerText: "I want to set my mouth on fire", valueForScore: 4}
        ],
    },
    {
        question: 'Pick one',
        answerOptions: [
            {answerText: "North",  valueForScore: 1},
            {answerText: "East",  valueForScore: 4},
            {answerText: "South", valueForScore: 3},
            {answerText: "West", valueForScore: 2}
        ],
    },
    {
        question: 'What´s your favourite season?',
        answerOptions: [
            {answerText:"Spring",  valueForScore: 2},
            {answerText: "Summer",  valueForScore: 3},
            {answerText: "Autumn",valueForScore: 1},
            {answerText: "Winter", valueForScore: 4}
        ],
    },
    {
            question: 'What´s your favourite seasoning?',
        answerOptions: [
            {answerText: "Chili", valueForScore: 4},
            {answerText: "Pepper", valueForScore: 3},
            {answerText: "Herbs", valueForScore: 2},
            {answerText: "Salt", valueForScore: 1},
        ]
    },
    {
        question: 'Do you share your food?',
        answerOptions: [
            {answerText: "Depends on what I´m having...",  valueForScore: 2},
            {answerText: "Sure thing!",  valueForScore: 4},
            {answerText: "Joey, doesn´t share food!", valueForScore: 1},
            {answerText: "Only If I may try someone else´s too", valueForScore: 3}
        ],
    },
    {
        question: 'How hungry are you?',
        answerOptions: [
            {answerText: "Just a snack for me, please", valueForScore: 3},
            {answerText: "Starving!", valueForScore: 4},
            {answerText: "I could eat", valueForScore: 2},
            {answerText: "Something light will suffice", valueForScore: 1}
        ],
    },
    {
        question: 'What time is it?',
        answerOptions: [
            {answerText: "Time for breakfast", valueForScore: 1},
            {answerText: "Lunchtime", valueForScore: 2},
            {answerText: "Dinnertime", valueForScore: 4},
            {answerText: "Time for a midnight snack", valueForScore: 3}
        ],
    },
    {
        question: 'Choose a color',
        answerOptions: [
            {answerText: "Blue", valueForScore: 1},
            {answerText: "Turquoise", valueForScore: 2},
            {answerText: "Violet", valueForScore: 3},
            {answerText: "Gold", valueForScore: 4}
        ],
    },
    {
        question: 'Do/can you cook?',
        answerOptions: [
            {answerText: "I can put it on a plate", valueForScore: 1},
            {answerText: "I can whip something up", valueForScore: 3},
            {answerText: "I know my way around the kitchen", valueForScore: 2},
            {answerText: "*chef cook", valueForScore: 4}
        ],
    },
    {
        question: 'Are you a picky eater?',
        answerOptions: [
            {answerText: "Do you have a minute?", valueForScore: 1},
            {answerText: "No cilantro for me, please", valueForScore: 2},
            {answerText: "I eat everything", valueForScore: 3},
            {answerText: "I love to try new things", valueForScore: 4}
        ],
    },
    {
        question: 'My favourite tool/s is/are...',
        answerOptions: [
            {answerText: "chopsticks", valueForScore: 4},
            {answerText: "a fork", valueForScore: 2},
            {answerText: "my bare hands", valueForScore: 3},
            {answerText: "cutlery", valueForScore: 1}
        ],
    },
    {
        question: 'What animal would you like to pet right now?',
        answerOptions: [
            {answerText: "A cow", valueForScore: 4},
            {answerText: "A cat", valueForScore: 2},
            {answerText: "An eagle", valueForScore: 1},
            {answerText: "A camel", valueForScore: 3}
        ],
    },
    {
        question: 'Do you travel a lot?',
        answerOptions: [
            {answerText: "My next flight is already booked", valueForScore: 4},
            {answerText: "Not enough", valueForScore: 2},
            {answerText: "No", valueForScore: 1},
            {answerText: "I get around", valueForScore: 3}
        ],
    },
    {
        question: 'How often do you eat out/order in?',
        answerOptions: [
            {answerText: "Almost never", valueForScore: 1},
            {answerText: "I use my oven as a storage space", valueForScore: 4},
            {answerText: "Regularly", valueForScore: 3},
            {answerText: "It´s been a while", valueForScore: 2}
        ],
    },
]

export default questions;