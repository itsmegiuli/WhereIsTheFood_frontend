/*const QsAndAsOR = [ //FIX: Fetch from somewhere else
    {
        "question": "Are you feeling adventurous today?",
        "answers": [
            "Never",
            "Not today",
            "Sometimes",
            "Always"
        ],
        "points": [1,2,3,4]
    },
    {
        "question": "question 2 goes here",
        "answers": ["first answer of q2 question goes here",
            "second answer of q2 goes here",
            "third answer of q2 question goes here",
            "fourth answer of q2 question goes here"
        ],
        "points": [50,70,80,90]
    },
    {
        "question": "question 3",
        "answers": ["here is answer for 3",
            "answer for q3",
            "another one (q3)",
            "another answer for q3"
        ],
        "points": [300,700,800,900]
    }
];

 */

//GET Request
function read(path) {
    let data = null;    //initializing with null
    let xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open("GET", path, false); //async???
    xmlhttprequest.send();
    if (xmlhttprequest.status === 200 && xmlhttprequest.readyState===4) {   //If readyState is equal to 4, it means the request is done
        //status 200?  // === strict version (best use)
        data= xmlhttprequest.responseText;
    }
    return data;
}
window.onload = function () {
    QsAndAsGet = read("/json/qs_and_asw.json");
    QsAndAs = JSON.parse(QsAndAsGet);

    startOrStartAgain();

}
function startOrStartAgain() {
    let nr = 0; //TO-DO: get random number
    console.log("questions:" + QsAndAs.length);
    askQuestion(nr);
    displayAnswers(nr);
    questionCount = 0;

}

let pointsGained = 0;
let questionCount = 0;

function askQuestion(i) {
    let questionTitle = document.getElementById("questionNEW");
    // let questionTitle = document.createElement("h2");
    //quizContainer.append(questionTitle);
    //questionTitle.className="questionNEW";
    questionTitle.innerHTML = QsAndAs[i].question;
}

function displayAnswers(i) {
    let quizContainer = document.getElementById("quiz-container");
    let answerContainer = document.createElement("div");
    answerContainer.class="answers-container";
    quizContainer.append(answerContainer);


    for (let a = 0; a < QsAndAs[i].points.length; a++) {
        //buttons.className="answersNEW";
        //answerContainer.append(buttons);
        //  buttons.innerText += `${QsAndAs[i].answers[a]}`;
        answerContainer.innerHTML += "<input type='button' onclick='nextQuestion("+i+","+QsAndAs[i].points[a]+")' value='" + QsAndAs[i].answers[a] + "' name='" + a + "' class='answersNEW' type='button' id='" + i + "'/>";

        //buttons.innerHTML += "<input type='button' onclick='nextQuestion("+i+","+QsAndAs[i].points[a]+")' value='" + QsAndAs[i].answers[a] + "' name='" + a + "' class='btn' type='button' id='" + i + "'/>";
    }
}

/*
function resetBtn() { //not using reset btn
    let next = document.getElementById("next-btn"); // resets the next button (disabled again)
    next.disabled = true;
}
 */
function reset() {
    document.getElementById("quiz-container").remove();

}

function nextQuestion(clicked_question, clicked_points) {
    pointsGained = pointsGained + clicked_points;
    questionCount++;

    if (questionCount<20) { // change to number of total questions
        for(let count = 1; count<=4; count++) {
            document.getElementById(clicked_question).remove(); // deletes previous answers
        }
        // let question = document.getElementsByClassName("questionNEW"); //delete previous question
        // question.remove();
        askQuestion(clicked_question+1); //random API??
        displayAnswers( clicked_question+1);



    } else {    // quiz done
        console.log("fin");
        // console.log(readResults);
        // console.log(results);
        reset();
        showResults();
        //stops: results page!
    }

}


//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
//********************* RESULTS ****************************************************
function showResults() {
    console.log("pts gained: " + pointsGained);
    //readResults = read("/json/results.json");  //GET results
    // results = JSON.parse(readResults);

    //  QsAndAsGet = read("/json/qs_and_asw.json");
    //  QsAndAs = JSON.parse(QsAndAsGet);
    console.log("showResults()")
    chooseKitchen(pointsGained);

}

function chooseKitchen(points) {
    if (points <= 24) {
        console.log("Austrian");
        displayPlaces(0);
    } else if (points >= 25 && points <= 29) {
        console.log("French");
        displayPlaces(1);
    } else if (points>=30 && points<=34) {
        console.log("Mediterranean");
        displayPlaces(2);
    } else if (points>=35 && points<=39) {
        console.log("Italian");
        displayPlaces(3);
    } else if(points>=40 && points<=44) {
        console.log("USA");
        displayPlaces(4);
    } else if(points>=45 && points<=49) {
        console.log("Hawaiian");
        displayPlaces(5);
    } else if(points>=50 && points<=54) {
        console.log("Greek");
        displayPlaces(6);
    } else if (points>=55 && points<=59) {
        console.log("Turkish/Oriental");
        displayPlaces(7);
    } else if (points>=60 && points<=64) {
        console.log("Persian");
        displayPlaces(8);
    } else if (points>=65 && points<=69) {
        console.log("Chinese");
        displayPlaces(9);
    } else if (points>=70 && points<=74) {
        console.log("Mexican");
        displayPlaces(10);
    } else if (points>=75 && points<=80) {
        console.log("Indian");
        displayPlaces(11);
    }
}

function displayPlaces(categoryResult) {
    console.log(categoryResult);
    readResults = read("/json/results.json");  //GET results
    results = JSON.parse(readResults);
    let image = document.createElement("img");
    image.src="/images/categories/"+categoryResult+".jpeg";

    let resultsContent = document.getElementById("resultsoverhere");
    resultsContent.append(image);

    for (let i = 0; i < results[categoryResult].titles.length; i++) {
        let restaurant = document.createElement("div");
        resultsContent.appendChild(restaurant);
        restaurant.className="rRestaurant";
        let title = document.createElement("div");
        let description = document.createElement("div");
        let location = document.createElement("div");
        let img = document.createElement("img");
        restaurant.append(title);
        restaurant.append(description);
        restaurant.append(location);
        restaurant.append(img);
        title.className="rTitle";
        description.className="rDescription";
        location.className="rLocation";
        img.className="rImg";

        img.src = results[categoryResult].imageURLs[i];
        title.append(results[categoryResult].titles[i]);
        description.append(results[categoryResult].descriptions[i]);
        location.append(results[categoryResult].location[i]);

    }
}

/*
function increasePoints(id, i) {
    pointsGained = pointsGained + QsAndAs[i].points[id];
    console.log("Points gained: " + pointsGained);
}
function saveAnswer(id, i) {
    pointsGained = pointsGained + QsAndAs[i].points[id];
    console.log("Points gained: " + pointsGained);
}
*/


//*****************************************************************
/*
function checkPoints() {
    // which button was clicked?
    let radios = document.getElementsByName("QsAndAs" + questionNr);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) { // if this radio button is checked
            score = score + QsAndAs[currentQuestion].answers[i];
        }
    }

    /* function askQuestion() {

         var choices = QsAndAs[currentQuestion].points,
             choicesHtml = "";

         // loop through choices, and create radio buttons
         for (var i = 0; i < choices.length; i++) {
             choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
                 "' id='choice" + (i + 1) +
                 "' value='" + choices[i] + "'>" +
                 " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
         }

         // load the question
         questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
             QsAndAs[currentQuestion].question;

         // load the choices
         choicesContainer.innerHTML = choicesHtml;
     } */
/*
    function checkAnswer() {
        // determine which radio button they clicked
        var radios = document.getElementsByName("QsAndAs" + currentQuestion);
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) { // if this radio button is checked
                score = score + QsAndAs[currentQuestion].answers[i];
            }
        }

        // if we're not on last question, increase question number
        if (currentQuestion < QsAndAs.length - 1) {
            currentQuestion++;
            askQuestion();
        } else {
            showFinalResults();
        }

    }

    function showFinalResults() {
        var resultString = "";
        for (var i = 0; i < 1; i += 1) {
            resultString += (i + 1) + ". " + score + "<br />";
        }
        questionContainer.innerHTML = "";
        content.innerHTML =
            "<h2>You've complited the quiz!</h2>" +
            "<h2>Below are your results:</h2>" +
            resultString;
    }

    window.addEventListener("load", askQuestion, false);
    submitBtn.addEventListener("click", checkAnswer, false);
 */