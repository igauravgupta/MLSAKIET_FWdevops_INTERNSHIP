const inputBox = document.getElementById("input-box");

const listContainer = document.getElementById("list-container");

async function showdata() {
  listContainer.innerHTML = "";
  await fetch("http://localhost:8080/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON data
    })
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = data[i].task;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.setAttribute("id", data[i].task);
        span.innerHTML = "\u00d7";
        li.appendChild(span);
      }
    })
    .catch((error) => {
      console.error("There was a problem fetching the data:", error);
    });
}
showdata();
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ add_task: inputBox.value }), // Stringify the JSON object
    });
  }
  showdata();
}
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      tasktodelete = e.target.id;
      // console.log(tasktodelete);
      deleteTask(tasktodelete);
    }
  },
  false
);

async function deleteTask(taskToDelete) {
  const response = await fetch(`http://localhost:8080/delete/${taskToDelete}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  showdata();
}
