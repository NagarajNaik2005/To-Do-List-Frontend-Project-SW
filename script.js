let tasks = [];
let taskInput = document.getElementById("task");
let priorityInput = document.getElementById("priority");
let duedateInput = document.getElementById("dueDate");
let taskButton = document.getElementById("addTask");

let totalCount = document.getElementById("totalCount");
let activeCount = document.getElementById("activeCount");
let completedCount = document.getElementById("completedCount");

let allTasksButton = document.getElementById("allTasks");
let activeTasksButton = document.getElementById("activeTasks");
let completedTasksButton = document.getElementById("completedTasks");
let currentFilter = "all";

let searchInput = document.getElementById("search");
let searchText = "";

allTasksButton.addEventListener("click", function() {
    currentFilter = "all";
    renderTasks();
});

activeTasksButton.addEventListener("click", function() {
    currentFilter = "active";
    renderTasks();
});

completedTasksButton.addEventListener("click", function() {
    currentFilter = "completed";
    renderTasks();
});

searchInput.addEventListener("input", function() {
    searchText = searchInput.value.toLowerCase().trim();
    renderTasks();
});

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
        saveTasks();
        renderTasks();

        taskInput.value = "";
        priorityInput.value = "medium";
        duedateInput.value = "";
    }
});

let taskList = document.getElementById("taskList");

function renderTasks() {
    taskList.innerHTML = "";

    totalCount.textContent = tasks.length;

    const activeTasks = tasks.filter(function(task) {
    return !task.completed;
    });
    activeCount.textContent = activeTasks.length;

    const completedTasks = tasks.filter(function(task) {
    return task.completed;
    });
    completedCount.textContent = completedTasks.length;

    tasks.forEach(function (task) {

        if (currentFilter === "active" && task.completed) {
        return;
        }

        if (currentFilter === "completed" && !task.completed) {
        return;
        }

        if (!task.title.toLowerCase().includes(searchText)) {
        return;
        }

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
            saveTasks();
            renderTasks();
        });

        deleteButton.addEventListener("click", function() {
        const taskId = Number(deleteButton.dataset.id);
        tasks = tasks.filter(function(task) {
            return task.id !== taskId;
            
        });
        saveTasks();
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
            saveTasks();
            renderTasks();
            }
        });
    })
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

    renderTasks();
}
loadTasks();