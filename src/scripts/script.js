(function (ko) {
  var MainListViewModel = function (list) {
    var self = this;

    this.list = list;
    this.newTask = ko.observable("");
    this.tasks = ko.observableArray();

    this.addTask = function () {
      this.list.addTask(this.newTask());
      this.list.saveToLocalStorage(this.newTask());
      this.newTask("");
      this.tasks(this.list.tasks);
    };

    this.deleteTask = function (viewModel) {
      self.list.deleteTask(viewModel.title);
      self.list.deleteFromLocalStorage(viewModel.title);
      self.tasks(self.list.tasks);
    };

    this.checkTask = function (viewModel) {
      self.list.checkTask(viewModel.title, viewModel.status);
      self.tasks(self.list.tasks);
    };

    this.loadFromLocalStorage = function () {
      self.list.loadFromLocalStorage();
      self.tasks(self.list.tasks);
    };
  };

  var MainList = function () {
    this.tasks = [];

    this.addTask = function (taskTitle) {
      if (!taskTitle) {
        alert("The ToDo can't be empty!");
        return;
      }

      this.tasks.push({
        title: taskTitle,
        status: "",
      });
    };

    this.deleteTask = function (taskTitle) {
      this.tasks.forEach((task, index, arr) => {
        if (task.title === taskTitle) arr.splice(index, 1);
      });
    };

    this.checkTask = function (taskTitle, taskStatus) {
      const checked = "item__text--checked";
      const unchecked = "item__text--unchecked";

      this.tasks.forEach((task, index, arr) => {
        if (task.title === taskTitle) {
          if (taskStatus === unchecked) {
            arr[index].status = checked;
            this.updateLocalStorage(taskTitle, checked);
          } else {
            arr[index].status = unchecked;
            this.updateLocalStorage(taskTitle, unchecked);
          }
        }
      });
    };

    this.checkLocalStorage = function () {
      let tasks;
      if (localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }

      return tasks;
    };

    this.loadFromLocalStorage = function () {
      this.tasks = this.checkLocalStorage();
    };

    this.saveToLocalStorage = function (taskTitle) {
      this.tasks = this.checkLocalStorage();
      this.tasks.push({
        title: taskTitle,
        status: "item__text--unchecked",
      });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    };

    this.deleteFromLocalStorage = function (taskTitle) {
      this.tasks = this.checkLocalStorage();

      this.tasks.forEach((task, index, arr) => {
        if (task.title === taskTitle) arr.splice(index, 1);
      });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    };

    this.updateLocalStorage = function (taskTitle, taskStatus) {
      this.tasks = this.checkLocalStorage();
      this.tasks.forEach((task, index, arr) => {
        if (task.title === taskTitle) arr[index].status = taskStatus;
      });

      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    };
  };

  var list = new MainList();

  ko.applyBindings(
    new MainListViewModel(list),
    document.querySelector(".main")
  );
})(ko);
