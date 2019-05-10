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
  return (trTd += `</td><td class="text-right"><button type="button" class="btn btn-info btnEdit mr-1" value="edit"><span class="oi oi-pencil" title="person" aria-hidden="true"></span></button>`);
};

Note.prototype.addDeleteButton = function addDeleteButton(trTd) {
  return (trTd += `<button type="button" class="btn btn-dark btnDelete" value="delete"><span class="oi oi-x" title="person" aria-hidden="true"></span></button></td></tr>`);
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

      if (document.querySelector("#important").checked === true) {
        const important = document.querySelector("#important").value;
      } else {
        const important = "off";
      }
      document.querySelector("#important").checked = false;

      newNote = new Note(note, date, important);

      createHTML(newNote);
      document.querySelector("#note").value = "";
      $("#myModal").modal("hide");
    }
  }
});

document.addEventListener("click", e => {
  // decide if target is the add button
  toAdd(e);
  // decide if target is a delete button
  toDelete(e);
  // decide if the target is an edit button
  toEdit(e);
});

function toDelete(e) {
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
}
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

function toEdit(e) {
  if (
    e.target &&
    (e.target.value === "edit" || e.target.parentNode.value === "edit")
  ) {
    if (e.target.value === "edit") {
      // get the note
      extractNote(e.target.parentNode.parentNode);
    } else {
      // get the note
      extractNote(e.target.parentNode.parentNode.parentNode);
    }
    // Change modal label to say edit note
    document.querySelector("#modalLabel").textContent = "Edit Note";
    // hide btn so user is less likely to accidentally delete note
    $("#closeWithOutSaving").hide();
  }
}

function toAdd(e) {
  if (
    e.target &&
    (e.target.value === "add" || e.target.parentNode.value === "add")
  ) {
    // Change modal label to say add note
    document.querySelector("#modalLabel").textContent = "Add Note";
    // Add button back in if it was hidden
    $("#closeWithOutSaving").show();
  }
}
