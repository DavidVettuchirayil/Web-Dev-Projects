var appState = {
    activeView: "",
    username: "",
    quizOption: "",
    quizTitle: "",
    questionType: "",
    questionNum: "",
    quizData: {},
    quizScore: 0,
    encouragingMessage: ""
}

document.addEventListener("DOMContentLoaded", function() {
    renderView("#introView", "#activeView", appState);
    document.getElementById("activeView").onsubmit = () => {
        if(appState.activeView == "#introView")
        {
            if(document.querySelector("#username").value != ""){
                appState.username = document.getElementById("username").value;
            }
            appState.quizOption = document.querySelector("input[name='quizOption']:checked").value;
            if(appState.quizOption == "quiz1")
            {
                appState.quizTitle = "Placeholder1"
            }
            else
            {
                appState.quizTitle = "Placeholder2"
            }
            renderQuestion(1);
        }
        return false;
    }
})

const renderView = function(view, target, data)
{
    appState.activeView = view;
    var source = document.querySelector(view).innerHTML;
    var template = Handlebars.compile(source);
    document.querySelector(target).innerHTML = template(data);
}

async function getQuizData(questionNum)
{
    const quizURL = "https://my-json-server.typicode.com/DavidVettuchirayil/Web-Dev-Projects/" + appState.quizOption + "/" + questionNum;
    const response = await fetch(quizURL);
    const data = await response.json();
    console.log(data);
    return data;
}

async function renderQuestion(questionNum)
{
    appState.questionNum = questionNum;
    appState.quizData = await getQuizData(questionNum);
    renderView("#quizView", "#activeView", appState);
    renderView("#" + appState.quizData.questionType, "#questionView", appState.quizData);
}

const checkAnswer = function(answer)
{
    if(answer == appState.quizData.answer)
    {
        appState.quizScore++;
        correctAnswer();
    }
    else
    {
        incorrectAnswer();
    }
}

const correctAnswer = function()
{
    var encouragingMessage = ["Wow!", "Good Job!", "You did it!", "Brilliant!", "Excellent!", "Nice Work!"];
    var randomNum = Math.floor(Math.random() * encouragingMessage.length);
    appState.encouragingMessage = encouragingMessage[randomNum];
    renderView("#correctAnswer", "#questionView", appState);
    setTimeout(() => {nextQuestion()}, 1000);
}

const incorrectAnswer = function()
{
    renderView("#incorrectAnswer", "#questionView", appState.quizData);
}

const nextQuestion = function()
{
    appState.questionNum++;
    renderQuestion(appState.questionNum);
}