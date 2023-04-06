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
        return false;
    }
})

const renderView = function(view, something, data)
{
    var source = document.querySelector(view).innerHTML;
    var template = Handlebars.compile(source);
    document.querySelector(something).innerHTML = template(data);
}

const updateView = function()
{
    
}