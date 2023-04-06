var appState = {
    username: "",
    quizOption: "",
    activeView: ""
}

document.addEventListener("DOMContentLoaded", function() {
    renderView("#introView", "#activeView", appState);
    appState.activeView = "#introView";
    document.getElementById("activeView").onsubmit = () => {
        if(appState.activeView == "#introView")
        {
            if(document.querySelector("#username").value != ""){
                appState.username = document.getElementById("username").value;
            }
            appState.quizOption = document.querySelector("input[name='quizOption']:checked").value;
            
        }
        getQuizData();
        return false;
    }
})

const renderView = function(view, target, data)
{
    var source = document.querySelector(view).innerHTML;
    var template = Handlebars.compile(source);
    document.querySelector(target).innerHTML = template(data);
}

const updateView = function()
{
    
}

async function getQuizData()
{
    const quizURL = "https://my-json-server.typicode.com/DavidVettuchirayil/Web-Dev-Projects/" + appState.quizOption;
    const response = await fetch(quizURL);
    const data = await response.json();
    console.log(data);
    return data;
}