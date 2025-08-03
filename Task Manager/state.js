//Arrays for 4 task states
let inPlan = [];
let inProgress = [];
let completed = [];
let trashBin = [];

class createInPlan{
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
        const index = arrays.indexOf(this);
        for (array of arrays){
            array.splice(index, 1);
            break;
        }
        trashBin.push(this);
    }
}
//trashbin recovery functionalty to be added

let task1 = new createInPlan("Work", "lorem ipsum hjfjh", "4/5");
task1.addToInPlan();

let task2 = new createInPlan("WORK 2", "loraabhfk", "4/5");
task2.addToInPlan();

//DOM for displaying the InPlan, In Progress, Completed

const inPlanDiv = document.querySelector(".inPlan");
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

        //button to move to inProgress 
        const btn = document.createElement("button");
        inPlanDiv.appendChild(btn);
        btn.textContent = "Move to In Progress"
        btn.addEventListener("click" , () => {
            object.moveToInProgress();
            displayInPlan();
            displayInProgress();
        })

        //delete button
        const deleteBtn = document.createElement("button");
        inPlanDiv.appendChild(deleteBtn);
        deleteBtn.textContent = "Move to Trash";
        deleteBtn.addEventListener("click" , () => {
            object.delete();
            displayInPlan();
        })
} )}

const inProgressDiv = document.querySelector(".inProgress");
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

const completedDiv = document.querySelector(".completed");
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

    //delete button
    const deleteBtn = document.createElement("button");
    completedDiv.appendChild(deleteBtn);
    deleteBtn.textContent = "Move to Trash";
    deleteBtn.addEventListener("click" , () => {
        object.delete();
        displayInCompleted();
    })
})
}

//add buttons with each object

//add form to take data

