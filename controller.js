function AppController() {
  this.model = new todoCollection();

  this.callback = function(data) {
    this.model.list.push(data);
    this.render();
  }.bind(this);

  this.addTodo = function(caption) {
    this.model.addItem(caption, this.callback);
  };

  this.addHandlers = function() {
    var self = this;

    document.getElementById("add-form").onsubmit = function(event) {
      event.preventDefault();
      var userInput = document.getElementById("user-input");
      var input = userInput.value;

      userInput.value = "";
      self.addTodo(input);
      self.render();
    };

    document.getElementById("check-all-btn").onclick = function(event) {
      for (var i in self.model.list) {
        var item = self.model.list[i];
        var id = item.id;

        var check = function(index, id) {
          self.model.checkAll(index, id);
        }.bind(null, i, id);

        check(i, id);
      }

      self.render();
    };
  };

  this.total = 0;
  this.done = 0;
  this.incomplete = 0;

  this.render = function() {
    var self = this;
    var taskList = document.getElementById("task_list");
    taskList.innerHTML = "";

    for (var i in this.model.list) {
      var item = this.model.list[i];

      var liDOM = document.createElement("li");
      liDOM.id = item.id;
      liDOM.className = "list-item";
      taskList.appendChild(liDOM);

      var leftDiv = document.createElement("div");
      leftDiv.className = "left-sub";
      liDOM.appendChild(leftDiv);

      var checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "checkbox";

      if (item.is_completed == 1) {
        checkBox.checked = true;
        self.done++;
      } else {
        checkBox.checked = false;
        self.incomplete++;
      }

      var id = item.id;

      checkBox.onclick = function(index, id) {
        self.model.toggleTodo(index, id);
        self.render();
      }.bind(null, i, id);

      leftDiv.appendChild(checkBox);

      var itemDOM = document.createElement("div");
      itemDOM.className = "item-desc";
      leftDiv.appendChild(itemDOM);

      var editForm = document.createElement("form");
      editForm.method = "POST";
      itemDOM.appendChild(editForm);

      var editTaskDOM = document.createElement("input");
      editTaskDOM.type = "text";
      editTaskDOM.value = item.caption;
      editTaskDOM.className = "item-desc-input";
      editForm.appendChild(editTaskDOM);

      var submitDOM = document.createElement("input");
      submitDOM.type = "submit";
      submitDOM.style.display = "none";
      editForm.appendChild(submitDOM);

      editForm.onsubmit = function(index, id, event) {
        event.preventDefault();
        var field = event.target.childNodes[0];
        field.blur();
        self.model.updateItem(field.value, index, id);
      }.bind(null, i, id);

      var delDOM = document.createElement("span");
      delDOM.className = "del_btn";

      delDOM.onclick = function(index, id, event) {
        if (confirm("Do you really want to delete this task?")) {
          self.model.deleteItem(index, id);
          self.render();
        }
      }.bind(null, i, id);

      liDOM.appendChild(delDOM);

      var delIcon = document.createElement("i");
      delIcon.className = "fas fa-times";
      delDOM.appendChild(delIcon);

      var field = checkBox.nextSibling.childNodes[0].childNodes[0];
      if (checkBox.checked) {
        field.style.textDecoration = "line-through";
        field.disabled = true;
      } else {
        field.style.textDecoration = "none";
        field.disabled = false;
      }

      self.total++;
    }

    document.getElementById("total").innerHTML = this.total;
    document.getElementById("complete").innerHTML = this.done;
    document.getElementById("incomplete").innerHTML = this.incomplete;
    this.total = 0;
    this.done = 0;
    this.incomplete = 0;
  };

  this.addHandlers();

  var that = this;

  fetch("http://mvc_api.local.geekydev.com/getData.php")
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      that.model.list = data;
      that.render();
    });
}
