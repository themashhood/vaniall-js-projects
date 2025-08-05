//Arrays for 4 task states
let inPlan = [];
let inProgress = [];
let completed = [];
let trashBin = [];

//Task creation class
class Task{
    constructor(title, details, progress){
        this.title= title;
        this.details= details;
        this.progress= progress;
        this.currentStatus = "inPlan";
    }

    addToInPlan(){
        inPlan.push(this);
        saveToLocalStorage();
    }

    moveToInProgress() {
        const index = inPlan.indexOf(this);
        inPlan.splice(index, 1);
        inProgress.push(this);
        this.currentStatus = "inProgress";
        saveToLocalStorage();
    }

    moveToCompletedfromProgress(){
        const index = inProgress.indexOf(this);
        inProgress.splice(index, 1);
        completed.push(this);
        this.currentStatus = "completed";
        saveToLocalStorage();
    }

    moveToCompletedfromPlan(){
        const index = inPlan.indexOf(this);
        inPlan.splice(index,1)
        completed.push(this);
        saveToLocalStorage();
    }

    delete(){
        const arrays = [inPlan, inProgress, completed]
        for (const array of arrays){
            const index = array.indexOf(this);
            if (index !== -1) {array.splice(index, 1);
            break;
            }
        }
        trashBin.push(this);
        saveToLocalStorage();
    }
}

//local storage
function saveToLocalStorage(){
    const data = {
        inPlan,
        inProgress,
        completed,
        trashBin,
    };
    localStorage.setItem("primusData", JSON.stringify(data));
} 

function loadFromLocalStorage(){
    const storedData = JSON.parse(localStorage.getItem("primusData"));
    if (storedData) {
        inPlan = storedData.inPlan.map(task => new Task(task.title, task.details, task.progress, task.currentStatus || "inPlan"));
        inProgress = storedData.inProgress.map(task => new Task(task.title, task.details, task.progress, task.currentStatus || "inProgress"));
        completed = storedData.completed.map(task => new Task(task.title, task.details, task.progress, task.currentStatus || "completed"));
        trashBin = storedData.trashBin.map(task => new Task (task.title, task.details, task.progress, task.currentStatus));
    }
    refreshAll();
}

//load previous instance
window.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
});

//function to add new tasks
document.getElementById("addNewTaskForm").addEventListener("submit" , function(event){
    event.preventDefault();
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDetails = document.getElementById("taskDetails").value;
    const taskProgress = document.getElementById("taskProgress").value;
    const newTask = new Task(taskTitle, taskDetails, taskProgress);
    if (taskTitle == "" || taskDetails == "" || taskProgress == ""){
        document.getElementById("addDetailsError").innerHTML = "Task must be added before submission";
    } else{
        newTask.addToInPlan();
        this.reset()
        displayInPlan();
        closeTheForm();
    }
})

function openAddToTaskForm(){
    document.querySelector(".addNewTask").style.display = "block"
}

function closeTheForm() {
    document.querySelector(".addNewTask").style.display = "none"
}

//TrashBin display
function openTrashBin(){
    document.querySelector(".trashBinWindow").style.display = "block"
}

function closeTrashBin(){
    document.querySelector(".trashBinWindow").style.display = "none"
}
//DOM for displaying the In Plan, In Progress, Completed, TrashBin

function refreshAll(){
    displayInPlan();
    displayInProgress();
    displayInCompleted();
    displayInTrashBin();
    saveToLocalStorage();
}

function generateElement (tag, taskAttribute, task, divName){
    const tagName = document.createElement(tag);
    tagName.textContent = task[taskAttribute];
    divName.appendChild(tagName);
}

function generateButtons (task, divName) {
    //move button
    const btn = document.createElement("button");
        divName.appendChild(btn);
        if (divName === inPlanDiv) {
            btn.textContent = "Move to In Progress"
        } else if (divName === inProgressDiv) {
            btn.textContent = "Move to Completed"
        } else if (divName === completedDiv) {
            divName.removeChild(btn);
        };
        btn.addEventListener("click" , () => {
            if (divName === inPlanDiv) {
                task.moveToInProgress()
            } else if (divName === inProgressDiv) {
                task.moveToCompletedfromProgress()
            };
            refreshAll();
        })
    //delete btn
     const deleteBtn = document.createElement("button");
        divName.appendChild(deleteBtn);
        deleteBtn.textContent = "Move to Trash";
        deleteBtn.addEventListener("click" , () => {
            task.delete();
            if (divName === inPlanDiv){
                displayInPlan()
            } else if (divName === inProgressDiv){
                displayInProgress();
            } else if(divName === completedDiv){
                displayInCompleted();
            }
            displayInTrashBin();
            refreshAll();
        })

} //function of buttons can be improved (clean code) based upon chatgpt feedback. not updating the code rn.

function recoverAndDeleteFromTrashBin(task){
    const recoverBtn = document.createElement("button");
    document.querySelector("#trashBinTasks").appendChild(recoverBtn);
    recoverBtn.textContent = "Recover";
    const index = trashBin.indexOf(task);
    recoverBtn.addEventListener("click", () => {
        const originArray = task.currentStatus; 
        if (originArray == "inPlan"){
            inPlan.push(task)
            refreshAll();
        } else if(originArray == "inProgress"){
            inProgress.push(task)
            refreshAll();
        } else if(originArray == "completed"){
            completed.push(task);
            refreshAll();
        }
        if (index !== -1){
            trashBin.splice(index, 1)
            refreshAll();
        }
        
    })

    const deleteBtn = document.createElement("button");
    document.querySelector("#trashBinTasks").appendChild(deleteBtn);
    deleteBtn.textContent = "Delete Permanently"
    deleteBtn.addEventListener("click", () => {
        const index = trashBin.indexOf(task);
        if (index !== -1) {
            trashBin.splice(index, 1);
        }    
        refreshAll();
    })
}

const inPlanDiv = document.querySelector(".inPlanTasks");
function displayInPlan () {
    inPlanDiv.innerHTML = "";
    inPlan.forEach(task => {
        generateElement("h1", "title",task, inPlanDiv) //displays title
        generateElement("p", "details", task, inPlanDiv) //displays details
        generateElement("p", "progress", task, inPlanDiv) // displays progress
        generateButtons(task, inPlanDiv)
} )}

const inProgressDiv = document.querySelector(".inProgressTasks");
function displayInProgress() {
    inProgressDiv.innerHTML = "";
    inProgress.forEach(task =>{
    generateElement("h1", "title",task, inProgressDiv) //displays title
    generateElement("p", "details", task, inProgressDiv) //displays details
    generateElement("p", "progress", task, inProgressDiv) // displays progress
    generateButtons(task, inProgressDiv)
})}

const completedDiv = document.querySelector(".completedTasks");
function displayInCompleted(){
    completedDiv.innerHTML = "";
    displayInPlan();
    displayInProgress();
    completed.forEach(task => {
    generateElement("h1", "title",task, completedDiv) //displays title
    generateElement("p", "details", task, completedDiv) //displays details
    generateElement("p", "progress", task, completedDiv) // displays progress
    generateButtons(task, completedDiv)
    })
}

const trashDiv = document.querySelector("#trashBinTasks");
function displayInTrashBin(){
    trashDiv.innerHTML = "";
    trashBin.forEach(task => {
    generateElement("h1", "title",task, trashDiv) //displays title
    generateElement("p", "details", task, trashDiv) //displays details
    generateElement("p", "progress", task, trashDiv) // displays progress
    recoverAndDeleteFromTrashBin(task);
    })
}


//add important tasks (star) functionlaity
//can add more buttons in future
//add drag and drop

 function addTestingData() {
    const plan = new Task("Plan", "1", "2")
    inPlan.push(plan);
    plan.currentStatus = "inPlan";
    const progress = new Task("Pro", "1", "2")
    inProgress.push(progress);
    progress.currentStatus = "inProgress";
    const completeed = new Task("Comp", "1",  "2")
    completed.push(completeed)
    completeed.currentStatus = "completed";
    refreshAll();
}