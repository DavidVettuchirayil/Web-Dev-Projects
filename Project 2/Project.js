document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#new-task").addEventListener("submit", addTask);
    return false;
});

let tasks = [];

function addTask() {
    let title = document.querySelector("#title").value;
    let status = document.querySelector("input[name=status]:checked").value;
    let priority = document.querySelector("#priority").value;

    let task = {
        title: title, 
        priority: priority,
        status: status
    };

    tasks.push(task);
    console.log(task);
    console.log(tasks);

    displayTasks();
    document.querySelector("#new-task").reset();
}

function displayTasks() {
    let list = document.getElementById("myList");
    list.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let status = tasks[i].status;
        let priority = tasks[i].priority;

        list.innerHTML += `<a href="#" class="list-group-item list-group-action"> 
            <div class="d-flex flex-row w-100 justify-content-between">
                <p class="overflow-auto"> ${title}
                <div class="custom-control custom-checkbox align-items-center float-right">
                    <input id="taskStatus" type="checkbox" class="custom-control-input" onclick="completeTask('${title}')">
                    <label class="custom-control-label" for="taskStatus"></label>
                </div>
            </div>
            <div>   
                <p> Status: ${status}
            </div>
            <a href="#" class="btn btn-danger" onclick="removeTask('${title}')"> Remove Task </a>
        </a>`;
    }
}

function removeTask(title) {
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].title == title)
        {
            tasks.splice(i,1);
        }
    }
    displayTasks();
}

function completeTask(title) {
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].value == "Completed")
        {
            tasks[i].style.backgroundColor = blue;
        }
    }
}

/*
const li = document.createElement("li");
        let task_text = document.querySelector("#task").value;
        let new_task_html = `
        <span> ${task_text} </span>
        <button class="remove"> Remove </button>
        `;

        li.innerHTML = new_task_html;

        document.querySelector("#tasks_list").append(li);
        document.querySelector("#task").value = "";
        return false;
    }

document.addEventListener("click", function(event) {
    element = event.target;
    if(element.className === "remove") {
        element.parentElement.remove();
    }
});
*/

/*
tasks.forEach((task) => {
        let li = document.createElement("li");
        li = Object.keys(task)
        console.log(li);
        list.append(li);    
    })
*/

/*
<div class="d-flex flex-column">
            <div class="d-flex flex-row w-100 justify-content-between">
                <p class="overflow-auto"> ${title}
                <div class="custom-control custom-checkbox align-items-center">
                    <input type="checkbox" class="custom-control-input" id="taskStatus">
                    <label class="custom-control-label" for="taskStatus"></label>
                </div>
            </div>
        </div>
*/
       