function todoCollection() {
  this.list = [];

  this.addItem = function(caption, cb) {
    $.post(
      "http://mvc_api.local.geekydev.com/addItem.php",
      { data: caption },
      function(data) {
        cb(data);
      },
      "json"
    );
  };

  this.deleteItem = function(index, id) {
    this.list.splice(index, 1);

    $.post(
      "http://mvc_api.local.geekydev.com/delete.php",
      { id: id },
      function() {}
    );
  };

  this.updateItem = function(task, index, id) {
    this.list[index].caption = task;
    $.post(
      "http://mvc_api.local.geekydev.com/update.php",
      {
        id: id,
        caption: task
      },
      function() {}
    );
  };

  this.toggleTodo = function(index, id) {
    if (index > this.list.length - 1) return;

    let status = this.list[index].is_completed;
    let newStatus;

    if (status == 0) {
      newStatus = "1";
    } else {
      newStatus = "0";
    }

    $.post(
      "http://mvc_api.local.geekydev.com/mark.php",
      { checked: newStatus, id: id },
      function() {}
    );

    this.list[index].is_completed = newStatus;
  };

  this.checkAll = function(index, id) {
    let status = this.list[index].is_completed;
    if (status == "0") {
      $.post(
        "http://mvc_api.local.geekydev.com/mark.php",
        { checked: 1, id: id },
        function() {}
      );

      this.list[index].is_completed = "1";
    }
  };
}
