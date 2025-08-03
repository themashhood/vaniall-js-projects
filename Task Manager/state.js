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
    }

    addToInPlan(){
        inPlan.push(this)
    }

    moveToInProgress() {
        const index = inPlan.indexOf(this);
        inPlan.splice(index, 1);
        inProgress.push(this);
    }

    moveToCompletedfromProgress(){
        const index = inProgress.indexOf(this);
        inProgress.splice(index, 1);
        completed.push(this);
    }

    moveToCompletedfromPlan(){
        const index = inPlan.indexOf(this);
        inPlan.splice(index,1)
        completed.push(this);
    }

    delete(){ //deletes the task from main page and moves it to trashbin
        const arrays = [inPlan, inProgress, completed]
        for (const array of arrays){
            const index = arrays.indexOf(this);
            array.splice(index, 1);
            break;
        }
        trashBin.push(this);
    }
}
//trashbin recovery functionalty to be added

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
    }
})

//DOM for displaying the InPlan, In Progress, Completed

const inPlanDiv = document.querySelector(".inPlanTasks");
function displayInPlan () {
    inPlanDiv.innerHTML = "";
    inPlan.forEach(object => {
        const index = inPlan.indexOf(object);
        const h1 = document.createElement("h1");
        h1.textContent = inPlan[index].title;
        inPlanDiv.appendChild(h1);

        //display details
        const p = document.createElement("p");
        p.textContent = inPlan[index].details;
        inPlanDiv.appendChild(p)

        //display progress
        const p1 = document.createElement("p");
        p1.textContent = inPlan[index].progress;
        inPlanDiv.appendChild(p1);

        //button to move to inProgress 
        if (h1 || p) {const btn = document.createElement("button");
        inPlanDiv.appendChild(btn);
        btn.textContent = "Move to In Progress"
        btn.addEventListener("click" , () => {
            object.moveToInProgress();
            displayInPlan();
            displayInProgress();
        })}

        //delete button
        if (h1 || p) {const deleteBtn = document.createElement("button");
        inPlanDiv.appendChild(deleteBtn);
        deleteBtn.textContent = "Move to Trash";
        deleteBtn.addEventListener("click" , () => {
            object.delete();
            displayInPlan();
        })}
} )}

const inProgressDiv = document.querySelector(".inProgressTasks");
function displayInProgress() {
    inProgressDiv.innerHTML = "";
    displayInPlan()
    inProgress.forEach(object =>{
    const index = inProgress.indexOf(object);
    const h1 = document.createElement("h1");
    h1.textContent = inProgress[index].title;
    inProgressDiv.appendChild(h1);

    //display details
    const p = document.createElement("p");
    p.textContent = inProgress[index].details;
    inProgressDiv.appendChild(p);

    //display progress
    const p1 = document.createElement("p");
    p1.textContent = inProgress[index].progress;
    inProgressDiv.appendChild(p1);

    //button to move to completed 
    const btn = document.createElement("button");
    inProgressDiv.appendChild(btn);
    btn.textContent = "Move to Completed"
    btn.addEventListener("click" , () => {
        object.moveToCompletedfromProgress();
        displayInProgress();
        displayInCompleted();
    })

    //delete button
        const deleteBtn = document.createElement("button");
        inProgressDiv.appendChild(deleteBtn);
        deleteBtn.textContent = "Move to Trash";
        deleteBtn.addEventListener("click" , () => {
            object.delete();
            displayInProgress();
        })
})}

const completedDiv = document.querySelector(".completedTasks");
function displayInCompleted(){
    completedDiv.innerHTML = "";
    displayInPlan();
    displayInProgress();
    completed.forEach(task => {
    const h1 = document.createElement("h1");
    h1.textContent = task.title;
    completedDiv.appendChild(h1)

    //display details
    const p = document.createElement("p");
    p.textContent = task.details;
    completedDiv.appendChild(p);

    //display progress
    const p1 = document.createElement("p");
    p1.textContent = task.progress;
    completedDiv.appendChild(p1);

    //delete button
    const deleteBtn = document.createElement("button");
    completedDiv.appendChild(deleteBtn);
    deleteBtn.textContent = "Move to Trash";
    deleteBtn.addEventListener("click" , () => {
        task.delete();
        completed.splice(task.index,1);
        displayInCompleted();
    })
})
}

//add important tasks (star) functionlaity
// you can add more buttons in future
//add drag and drop functionlaity