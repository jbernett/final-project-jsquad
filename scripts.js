const modal = document.querySelector("#myModal");

const btn = document.querySelector("#myBtn");

const span = document.querySelector("#close");

function createHTML(noteInfo) {
  let li = "";

  if (noteInfo.important === "on") {
    li += `<li><a href"#"><strong style="color: red">Important</strong> `;
    li += `<strong>${noteInfo.note}</strong>`;
  } else {
    li += `<li><a href"#"><strong>${noteInfo.note}</strong>`;
  }

  if (noteInfo.date !== "") {
    li += `<i> ${noteInfo.date}</i>`;
  }

  li += `<span>x<span></a></li>`;
  document.querySelector("#myUL").innerHTML += li;
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

    if (document.querySelector("#DueDate").checked === true) {
      noteInfo.date = document.querySelector("#dueDate").value;
      document.querySelector("#DueDate").checked = false;
      document.querySelector("#dueDate").value = "";
    }

    if (document.querySelector("#important").checked === true) {
      noteInfo.important = document.querySelector("#important").value;
    }
    document.querySelector("#important").checked = false;
    modal.style = "none";
  }
  createHTML(noteInfo);
});

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
