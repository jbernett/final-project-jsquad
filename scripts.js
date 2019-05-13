function Note(note, date, important) {
  this.note = note;
  this.date = date;
  this.important = important;
}

Note.prototype.noteDisplay = function noteDisplay(trTd) {
  let tableData = trTd;
  if (this.important === "off") {
    tableData += `<tr><td><strong>${this.note}</strong>`;
    return tableData;
  }
  tableData += `<tr class="table-danger"><td><strong>${this.note}</strong>`;
  return tableData;
};

Note.prototype.dateDisplay = function dateDisplay(trTd) {
  let tableData = trTd;
  if (this.date !== "") {
    tableData += `<i> ${this.date}</i>`;
    return tableData;
  }
  return tableData;
};

Note.prototype.addEditButton = function addEditButton(trTd) {
  let tableData = trTd;
  tableData += `</td><td class="text-right"><button type="button" class="btn btn-info btnEdit mr-1" value="edit"><span class="oi oi-pencil" title="person" aria-hidden="true"></span></button>`;
  return tableData;
};

Note.prototype.addDeleteButton = function addDeleteButton(trTd) {
  let tableData = trTd;
  tableData += `<button type="button" class="btn btn-dark btnDelete" value="delete"><span class="oi oi-x" title="person" aria-hidden="true"></span></button></td></tr>`;
  return tableData;
};

function createHTML(newNote) {
  let trTd = "";

  trTd = newNote.noteDisplay(trTd);
  trTd = newNote.dateDisplay(trTd);
  trTd = newNote.addEditButton(trTd);
  trTd = newNote.addDeleteButton(trTd);

  document.querySelector(".table tbody").innerHTML += trTd;
}

document.querySelector("#myForm").addEventListener("submit", e => {
  e.preventDefault();

  if (document.querySelector("#note").value === "") {
    document.querySelector("#note").placeholder = "Please enter a note";
  } else {
    const note = document.querySelector("#note").value;

    const date = document.querySelector("#dueDate").value;
    const d1 = new Date(date.replace("-", ","));
    const d2 = new Date();
    if (d1 > d2 || date === "") {
      document.querySelector("#dueDate").value = "";
      let important;
      if (document.querySelector("#important").checked === true) {
        important = document.querySelector("#important").value;
      } else {
        important = "off";
      }
      document.querySelector("#important").checked = false;

      const newNote = new Note(note, date, important);

      createHTML(newNote);
      document.querySelector("#note").value = "";
      $("#myModal").modal("hide");
    }
    else{
      alert("Due date must be later than today.")
    }
  }
});

function extractNote(noteSpace) {
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

function toEdit() {
    // Change modal label to say edit note
    document.querySelector("#modalLabel").textContent = "Edit Note";
    // hide btn so user is less likely to accidentally delete note
    $("#closeWithOutSaving").hide();
  }


function toAdd() {
    // Change modal label to say add note
    document.querySelector("#modalLabel").textContent = "Add Note";
    // Add button back in if it was hidden
    $("#closeWithOutSaving").show();
  }


document.addEventListener("click", e => {
  // eslint-disable-next-line default-case
  switch (true) {
    //decide if e has a value of delete
    case e.target.value === "delete":
    //e has value of delete, remove the note that e resides in
      e.target.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode
      );
      break;
    //decide if e's parent has a value of delete (this is the result of clicking direclty on the x in the button)
    case e.target.parentNode.value === "delete":
    //e's parent has value of delete, remove the note e resides in
      e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
      );
      break;
    //decide if e has a value of edit
    case e.target.value === "edit":
      //e has value of edit, get the information from e's note
      extractNote(e.target.parentNode.parentNode);
      //populate the note submission form with e's note's information and make it visible
      toEdit();
      break;
      //decide if e's parent has a value of edit
    case e.target.parentNode.value === "edit":
    //e has value of edit, get the information from e's note
      extractNote(e.target.parentNode.parentNode.parentNode);
      //populate the note submission form with e's note's information and make it visible
        toEdit();
      break;
    //decide if e or e's parent has a value of add
    case e.target.value === "add" || e.target.parentNode.value === "add":
    //e or e's parent has value of add, bring up empty copy of note submission form
      toAdd();
      break;
  }
});

