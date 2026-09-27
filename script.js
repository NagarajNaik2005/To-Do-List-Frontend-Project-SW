let tasks = [];
let taskInput = document.getElementById("task");
let priorityInput = document.getElementById("priority");
let duedateInput = document.getElementById("dueDate");
let taskButton = document.getElementById("addTask");

taskButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (taskInput.value.trim() === "") {
        console.log("Please enter a task");
    }
    else {
        const task = {
            id: Date.now(),
            title: taskInput.value.trim(),
            priority: priorityInput.value,
            dueDate: duedateInput.value,
            completed: false
        };
        tasks.push(task);
        renderTasks();
    }
});

let taskList = document.getElementById("taskList");

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (task.completed) {
        li.classList.add("completed");
        }

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");
        const title = document.createElement("h3");
        title.textContent = task.title;
        taskInfo.appendChild(title);
        li.appendChild(taskInfo);
        const details = document.createElement("p");
        details.textContent = `${task.priority} • Due: ${task.dueDate}`;
        taskInfo.appendChild(details);

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        const completeButton = document.createElement("button");
        completeButton.dataset.id = task.id;
        completeButton.textContent = "Complete";
        completeButton.type = "button";
        actions.appendChild(completeButton);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.type = "button";
        actions.appendChild(editButton);
        editButton.dataset.id = task.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        actions.appendChild(deleteButton);
        deleteButton.dataset.id = task.id;

        li.appendChild(actions);

        taskList.appendChild(li);


        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;
            renderTasks();
        });

        deleteButton.addEventListener("click", function() {
        const taskId = Number(deleteButton.dataset.id);
        tasks = tasks.filter(function(task) {
            return task.id !== taskId;
            
        });
        renderTasks();
        });

        editButton.addEventListener("click", function() {
            const taskId = Number(editButton.dataset.id);
            const selectedTask = tasks.find(function(task) {
                return task.id === taskId;
            });

            const newTitle = prompt("Enter the new task title:", selectedTask.title);
            if (newTitle !== null && newTitle.trim() !== "") {
            selectedTask.title = newTitle.trim();
            renderTasks();
            }
        });
    })
}
