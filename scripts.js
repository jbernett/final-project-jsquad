function createHTML(noteInfo) {
  let trTd = "";

  if (noteInfo.important === "off") {
    trTd += `<tr><td><strong>${noteInfo.note}</strong>`;
  } else {
    trTd += `<tr class="table-danger"><td><strong>${noteInfo.note}</strong>`;
  }

  if (noteInfo.date !== "") {
    trTd += `<i> ${noteInfo.date}</i>`;
  }

  trTd += `</td><td>x</td></tr>`;
  document.querySelector(".table").innerHTML += trTd;
}
document.querySelector("#myForm").addEventListener("submit", e => {
  e.preventDefault();

  const noteInfo = {
    note: "",
    date: "",
    important: "off"
  };

  if (document.querySelector("#note").value === "") {
    document.querySelector("#note").innerHTML = "Please enter a note";
  } else {
    noteInfo.note = document.querySelector("#note").value;
    document.querySelector("#note").value = "";
  }

  noteInfo.date = document.querySelector("#dueDate").value;
  document.querySelector("#dueDate").value = "";

  if (document.querySelector("#important").checked === true) {
    noteInfo.important = document.querySelector("#important").value;
  }
  document.querySelector("#important").checked = false;

  createHTML(noteInfo);

  $("#myModal").modal("hide");
});
