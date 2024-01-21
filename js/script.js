let inputTask = document.getElementById("task");
let btn = document.getElementById("btn");
let tasks = document.getElementById("tasks");

btn.addEventListener("click", function () {
    AddTodo();
    inputTask.value = "";
});
async function AddTodo() {
    let task = {
    title: inputTask.value,
    apiKey: "65ad87182681618c591c5a55",
    };
    let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "post",
    body: JSON.stringify(task),
    headers: { "content-type": "application/json" },
    });
    let result = await data.json();
  // console.log(result);
    if (result.message == "success") {
    getAllTodo();
    }
}

getAllTodo();

async function getAllTodo() {
    let data = await fetch(
    "https://todos.routemisr.com/api/v1/todos/65ad87182681618c591c5a55"
    );
    let result = await data.json();
  // console.log(result.todos);
    display(result.todos);
}

function display(task) {
    let cartoona = ``;
    for (let i = 0; i < task.length; i++) {
    cartoona += `
<div class="${task[i].completed ? "complete-task" : ""} tasks my-3 rounded text-light d-flex justify-content-between w-75 m-auto px-3 py-2 align-items-center">
<div class="task">
    <p class="${task[i].completed ? "text-decoration-line-through" : ""} task-text m-0 p-0">${task[i].title}</p>
</div>
<div class="d-flex align-items-center">
    <i onclick="completedTodo('${task[i]._id}')" class="${task[i].completed ? "d-none" : ""} fa-regular fa-circle"></i>
    <i onclick="completedFalseTodo('${task[i].apiKey}', '${task[i].title}') ,deleteTodo('${task[i]._id}')" class="${task[i].completed ? "d-flex" : "d-none"
    } fa-regular fa-circle-check"></i>
    <i onclick="deleteTodo('${task[i]._id}')" class="fa-solid fa-trash mx-2"></i>
</div>
</div>
`;
    }
    tasks.innerHTML = cartoona;
}

async function deleteTodo(id) {
  // console.log(id);
    let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "delete",
    body: JSON.stringify({
    todoId: id,
    }),
    headers: { "content-type": "application/json" },
    });
    let result = await data.json();
    if (result.message == "success") {
    getAllTodo();
    }
}

async function completedTodo(id) {
    let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "put",
    body: JSON.stringify({
    todoId: id,
    }),
    headers: { "content-type": "application/json" },
    });
    let result = await data.json();
  // console.log(result);
    if (result.message == "success") {
    getAllTodo();
    }
}

async function completedFalseTodo(id, titl) {
    let task = {
    title: titl,
    apiKey: id,
    };
  // console.log(task);
    let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "post",
    body: JSON.stringify(task),
    headers: { "content-type": "application/json" },
    });
    let result = await data.json();
  // console.log(result);
    if (result.message == "success") {
    getAllTodo();
    }
}
