// Initialize tasks array from local storage (if available)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/*The code selects various HTML elements using their IDs. 
These elements are buttons, input fields, a dropdown menu,
and a task list container.*/
let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");
let filter = document.getElementById("filter");
let clearCompleted = document.getElementById("clearCompleted");
let counter = document.getElementById("counter");

// Function to update the tasks list and display tasks
function updateTasks() {
    toDoContainer.innerHTML = ""; // Clear existing tasks
    const currentFilter = filter.value;
    let openTasks = 0;

    tasks.forEach((task, index) => {
        if (currentFilter === "completed" && !task.completed) return;
        if (currentFilter === "active" && task.completed) return;

        const paragraph = document.createElement("p");
        paragraph.classList.add("paragraph-styling");
        paragraph.innerText = task.text;
        paragraph.addEventListener("click", () => toggleTask(index));
        paragraph.addEventListener("dblclick", () => removeTask(index));
        if (task.completed) {
            paragraph.classList.add("completed-task");
        } else {
            openTasks++;
        }
        toDoContainer.appendChild(paragraph);
    });

    counter.textContent = openTasks + " tasks remaining";
    updateLocalStorage();
}

// Function to add a task
function addTask() {
    const text = inputField.value.trim();
    if (text.length < 3) {
        inputField.style.border = "1px solid red"; // Highlight the input field with a red border
        alert("Task description should be at least 3 characters long.");
    } else if (text) {
        tasks.push({ text, completed: false });
        inputField.value = "";
        updateTasks();
    } else {
        inputField.style.border = "1px solid red"; // Highlight the input field with a red border
        alert("Task description cannot be blank.");
    }
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1);
    updateTasks();
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTasks();
}

// Function to clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    updateTasks();
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputField.style.border = "1px solid #ccc"; // Reset the input field border
}

addToDoButton.addEventListener("click", addTask);
inputField.addEventListener("keypress", event => {
    if (event.key === "Enter") addTask();
});

filter.addEventListener("change", updateTasks);
clearCompleted.addEventListener("click", clearCompletedTasks);

updateTasks(); // Initial update of the tasks list
