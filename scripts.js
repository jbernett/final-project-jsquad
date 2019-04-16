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

  trTd += `</td><td class="text-right"><button type="button" class="btn btn-dark btnEdit" value="edit"><strong>Edit</strong></button>`;

  trTd += `</td><td class="text-right"><button type="button" class="btn btn-dark btnDelete" value="delete"><strong>x</strong></button></td></tr>`;
  document.querySelector(".table tbody").innerHTML += trTd;
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

document.addEventListener("click", e => {
  // decide if target is a delete button
  if (e.target && e.target.value === "delete") {
    e.target.parentNode.parentNode.parentNode.removeChild(
      // remove the parent of the parent, which should be the whole note
      e.target.parentNode.parentNode
    );
    // check to see if target is the text IN a delete button (cuz they're different :-/ )
  } else if (e.target.parentNode.value === "delete") {
    // remove the parent of the parent, of the parent of e, which should be the whole note
    e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  // decide if the target is an edit button
  if (
    e.target &&
    (e.target.value === "edit" || e.target.parentNode.value === "edit")
  ) {
    // get the note
    const noteSpace = e.target.parentNode.parentNode.parentNode;
    // get the actual note text
    const noteText = noteSpace.querySelector("td").querySelector("strong")
      .textContent;
    // set variable for the date
    let noteDate = "";
    // decide if the date is null
    if (noteSpace.querySelector("td").querySelector("i") !== null) {
      // date is not null, set it to the date in the existing note
      noteDate = String(
        noteSpace.querySelector("td").querySelector("i").textContent
      ).trim();
    }
    // check if noteSpace contains class "table-danger", which signifies the "important" box is checked
    const noteImp = Array.from(noteSpace.classList).includes("table-danger");
    // delete the note now that we've extracted all the data from it
    document.querySelector("tbody").removeChild(noteSpace);
    // show the note addition form
    $("#myModal").modal("show");
    // set the note values to the pre-existing values so user can edit them
    document.querySelector("#note").value = noteText;
    document.querySelector("#dueDate").value = noteDate;
    document.querySelector("#important").checked = noteImp;
  }
});
