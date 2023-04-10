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

var timer = {
    timeStart: 0,
    elapsedTime: 0,
    convertedTime: "",
    timerOn: false
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
        if(timer.timerOn == false)
        {
            timer.timerOn = true;
            startTimer();
        }
        return false;
    }
})

const renderView = function(view, target, data)
{
    if(view != "#timer")
    {
        appState.activeView = view;
    }
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
    if(appState.questionNum == 21)
    {
        endQuiz();
    }
    else
    {
        renderQuestion(appState.questionNum);
    }
}

const endQuiz = function()
{
    if((appState.quizScore / 20) > 0.8)
    {
        appState.questionNum--;
        renderView("#quizView", "#activeView", appState);
        renderView("#passedQuiz", "#questionView", appState);
    }
    else
    {
        appState.questionNum--;
        renderView("#quizView", "#activeView", appState);
        renderView("#failedQuiz", "#questionView", appState);
    }
}

const restartQuiz = function()
{
    appState.username = "";
    appState.quizOption = "";
    appState.quizTitle = "";
    appState.questionType = "";
    appState.questionNum = "";
    appState.quizData = {};
    appState.quizScore = 0;
    appState.encouragingMessage = "";
    renderView("#introView", "#activeView", appState);
}

const startTimer = function()
{
    if(timer.timerOn == true)
    {
        timer.timeStart = new Date().getTime();
        setInterval(getTime, 1000);
    }
}

const getTime = function()
{
    if(appState.activeView == "#multipleChoice" || appState.activeView == "#trueOrFalse" || appState.activeView == "#imageSelect" || appState.activeView == "#textResponse" || appState.activeView == "#correctAnswer" || appState.activeView == "#incorrectAnswer")
    {
        timer.elapsedTime = new Date().getTime() - timer.timeStart;
        timer.convertedTime = convertMiliseconds(timer.elapsedTime);
        renderView("#timer", "#timeDisplay", timer);
    } 
    if(appState.activeView == "#passedQuiz" || appState.activeView == "#failedQuiz")
    {
        timer.timerOn = false;
        renderView("#timer", "#timeDisplay", timer);
    }
}

const convertMiliseconds = function(milliseconds)
{
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}