const taskName = document.querySelector(".form__input");
const taskSubmitBtn = document.querySelector(".form__submit");
const taskList = document.querySelector(".main__list");

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
taskSubmitBtn.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", checkTask);

function newItem(content, status) {
  const listItem = document.createElement("li");
  listItem.classList.add("list__item");
  listItem.classList.add("item");

  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  checkBtn.classList.add("item__check");
  checkBtn.classList.add("btn");
  checkBtn.setAttribute("aria-label", "check-task");
  listItem.appendChild(checkBtn);

  const itemText = document.createElement("p");
  itemText.textContent = content;
  itemText.classList.add("item__text");
  itemText.classList.add(`${status}`);
  listItem.appendChild(itemText);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.classList.add("item__delete");
  deleteBtn.classList.add("btn");
  deleteBtn.setAttribute("aria-label", "delete-task");
  listItem.appendChild(deleteBtn);

  return listItem;
}

function addTask(e) {
  e.preventDefault();

  if (!taskName.value) {
    alert("The ToDo can't be empty!");
    return;
  }

  const listItem = newItem(taskName.value);
  saveToLocalStorage(taskName.value);
  taskList.appendChild(listItem);
  taskName.value = "";
}

function deleteTask(e) {
  const listItem = e.target;

  if (listItem.classList[0] === "item__delete") {
    listItem.parentElement.remove();
    deleteFromLocalStorage(listItem);
  }
}

function checkTask(e) {
  const listItem = e.target;
  const checked = "item__text--checked";
  const unchecked = "item__text--unchecked";

  if (listItem.classList[0] === "item__check") {
    listItem.parentElement.children[1].classList.toggle(checked);

    if (listItem.parentElement.children[1].classList.contains(checked)) {
      updateLocalStorage(listItem, checked);
    } else {
      updateLocalStorage(listItem, unchecked);
    }
  }
}

function checkLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  return tasks;
}

function saveToLocalStorage(task) {
  let tasks = checkLocalStorage();

  tasks.push({ title: task, status: "item__text--unchecked" });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage(task, status) {
  let tasks = checkLocalStorage();

  const taskIndex = task.parentElement.children[1].textContent;
  tasks.forEach((task, index, arr) => {
    if (task.title === taskIndex) arr[index].status = status;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteFromLocalStorage(task) {
  let tasks = checkLocalStorage();

  const taskIndex = task.parentElement.children[1].textContent;
  tasks.forEach((task, index, arr) => {
    if (task.title === taskIndex) arr.splice(index, 1);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  let tasks = checkLocalStorage();

  tasks.forEach((task) => {
    const listItem = newItem(task.title, task.status);
    taskList.appendChild(listItem);
  });
}
