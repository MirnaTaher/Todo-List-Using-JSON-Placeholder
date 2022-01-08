let xml = new XMLHttpRequest();
xml.open("GET", "https://jsonplaceholder.typicode.com/todos");
xml.send();
xml.onload = createDiv;
var div;

//dropdown menu options
var filterList = document.getElementById("filterList");
filterList.addEventListener("change", listItemsChange);

var userIdList = document.getElementById("userIdList");
userIdList.addEventListener("change", listIdChange);

function listItemsChange() {
  item = this.value;
  var obj = JSON.parse(xml.responseText);
  for (var elem of obj) {
    if (item == "complete" && elem.completed == true) {
      completedTaskFilter();
    } else if (item == "progress" && elem.completed == false) {
      progressTaskFilter();
    }
  }
}
function listIdChange() {
  item = this.value;
  var obj = JSON.parse(xml.responseText);
  for (var elem of obj) {
    if (item == elem.userId) {
      userIdFilter(item);
    }
  }
}

function createDiv() {
  var obj = JSON.parse(xml.responseText);
  removeDiv();
  for (let elem of obj) {
    div = document.createElement("div");
    div.innerHTML = elem.title;
    document.getElementById("listItemsDiv").append(div);
    backgroundColor(elem);
  }
}

function backgroundColor(elem) {
  if (elem.completed == true) {
    div.style.backgroundColor = "#8BF3D1";
  } else {
    div.style.backgroundColor = "#FFFF8A";
  }
}
function removeDiv() {
  document.getElementById("listItemsDiv").innerHTML = " ";
}

//options for the drop down menu
function completedTaskFilter() {
  var obj = JSON.parse(xml.responseText);
  removeDiv();
  for (let elem of obj) {
    if (elem.completed == true) {
      div = document.createElement("div");
      div.innerHTML = elem.title;
      document.getElementById("listItemsDiv").append(div);
      backgroundColor(elem);
    }
  }
}

function progressTaskFilter() {
  var obj = JSON.parse(xml.responseText);
  removeDiv();
  for (let elem of obj) {
    if (elem.completed == false) {
      div = document.createElement("div");
      div.innerHTML = elem.title;
      document.getElementById("listItemsDiv").append(div);
      backgroundColor(elem);
    }
  }
}

function userIdFilter(i) {
  var obj = JSON.parse(xml.responseText);
  removeDiv();
  for (let elem of obj) {
    if (elem.userId == i) {
      div = document.createElement("div");
      div.innerHTML = elem.title;
      document.getElementById("listItemsDiv").append(div);
      backgroundColor(elem);
    }
  }
}

//resetting the page to all the todo list
var resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", createDiv);