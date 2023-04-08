var appState = {
    activeView: "",
    username: "",
    quizOption: "",
    questionType: "",
    quizData: {}
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
        }
        renderQuestion(1);
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
    appState.quizData = await getQuizData(questionNum);
    renderView("#quizView", "#activeView", appState);
    renderView(appState.quizData.questionType, "#questionView", appState.quizData);
}