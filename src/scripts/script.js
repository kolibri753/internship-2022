var $taskName = $(".form__input");
var $taskSubmitBtn = $(".form__submit");
var $taskList = $(".main__list");

$(document).ready(loadFromLocalStorage);
$taskSubmitBtn.click(addTask);
$taskList.click(deleteTask);
$taskList.click(checkTask);

function newItem($content, $status) {
  var $checkBtn = $("<button></button>", {
    append: '<i class="fa-solid fa-check"></i>',
    class: "item__check btn",
    'aria-label': "check-task",
  });

  var $itemText = $(`<p></p>`, {
    text: `${$content}`,
    class: `item__text ${$status}`,
  });

  var $deleteBtn = $("<button></button>", {
    append: '<i class="fa-solid fa-trash"</i>',
    class: "item__delete btn",
    'aria-label': "delete-task",
  });

  var $listItem = $("<li></li>", {
    append: [$checkBtn, $itemText, $deleteBtn],
    class: "list__item item",
  });

  return $listItem;
}

function addTask() {
  if (!$taskName.val()) {
    alert("The ToDo can't be empty!");
    return;
  }
  var $listItem = newItem($taskName.val());
  saveToLocalStorage($taskName.val());
  $taskList.append($listItem);
  $taskName.val("");
}

function deleteTask(e) {
  var $listItem = $(e.target);

  if ($listItem.is(".item__delete")) {
    $listItem.parent().remove();
    deleteFromLocalStorage($listItem);
  }
}


function checkTask(e) {
  var $listItem = $(e.target);

  if ($listItem.is(".item__check")) {
    $listItem.parent().children("p").toggleClass("item__text--checked");
  }

  if ($listItem.parent().children("p").is(".item__text--checked")) {
    updateLocalStorage($listItem, "item__text--checked");
  } else {
    updateLocalStorage($listItem, "item__text--unchecked");
  }
}

function checkLocalStorage() {
  var $tasks;
  if (localStorage.getItem("tasks") === null) {
    $tasks = [];
  } else {
    $tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  return $tasks;
}

function saveToLocalStorage(task) {
  var $tasks = checkLocalStorage();

  $tasks.push({ title: task, status: "item__text--unchecked" });
  localStorage.setItem("tasks", JSON.stringify($tasks));
}

function updateLocalStorage(task, status) {
  var $tasks = checkLocalStorage();
  var $taskIndex = task.parent().children("p").text();

  $.each($tasks, function (index) {
    if ($tasks[index].title === $taskIndex) {
      $tasks[index].status = status;
    }
  });

  localStorage.setItem("tasks", JSON.stringify($tasks));
}

function deleteFromLocalStorage(task) {
  var $tasks = checkLocalStorage();
  var $taskIndex = task.parent().children("p").text();

  $tasks.forEach((task, index, arr) => {
    if (task.title === $taskIndex) arr.splice(index, 1);
  });
  localStorage.setItem("tasks", JSON.stringify($tasks));
}

function loadFromLocalStorage() {
  var $tasks = checkLocalStorage();

  $.each($tasks, function (index) {
    var $listItem = newItem($tasks[index].title, $tasks[index].status);
    $taskList.append($listItem);
  });
}
