//first page ANIMATION
const logo = document.getElementById("firstImage");
const takeBtn = document.getElementById("takeStep");
setTimeout(() => {
    logo.style.animation = "none";
    logo.style.transform = "translateY(100px)";
    setTimeout(() => {
        takeBtn.style.display = "block";
    }, 1000);
}, 4000);

//QUOTES carousel
const quotes = [
  "Believe in the process.",
  "One step at a time.",
  "You are your best investment.",
  "Discipline is greater than motivation.",
  "Small actions lead to big results.",
  "Progress over perfection.",
  "Dream it. Write it. Do it.",
  "Focus. Plan. Execute.",
  "Your future is written today.",
  "Consistency creates change.",
];

let quoteIndex = 0;
const quoteDisplay = document.getElementById("quoteDisplay");

function updateQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `"${quotes[quoteIndex]}"`;
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

// Change quote every 4 seconds
setInterval(updateQuote, 4000);
//Note functionality
const saveButton = document.querySelector(".savebutton");
const userNote = document.getElementById("userNote");
const notesContainer = document.getElementById("notesContainer");
//save new note
saveButton.addEventListener("click", () => {
  const noteText = userNote.value.trim();
  if (noteText === "") {
    alert("Please write something before saving.");
    return;
  }

  const id = Date.now().toString();
  localStorage.setItem(id, JSON.stringify({ id, text: noteText }));

   // Create note card
  const noteCard = document.createElement("div");
  noteCard.classList.add("noteCard");
  noteCard.innerHTML = `
  <p>${noteText}</p>
  <button class="deleteNote">Delete</button>
`;

  notesContainer.appendChild(noteCard);
  userNote.value = ""; // Clear textarea
});

//delete note
notesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteNote")) {
    const noteCard = e.target.closest(".noteCard");
    const id = noteCard.getAttribute("data-id");
    localStorage.removeItem(id);
    noteCard.remove();
  }
});
//load notes from local storage on page load
window.addEventListener("load", () => {
  Object.keys(localStorage).forEach((key) => {
    const note = JSON.parse(localStorage.getItem(key));
    if (note?.text) {
      const noteCard = document.createElement("div");
      noteCard.classList.add("noteCard");
      noteCard.setAttribute("data-id", note.id);
      noteCard.innerHTML = `
        <p>${note.text}</p>
        <button class="deleteNote">Delete</button>
      `;
      notesContainer.appendChild(noteCard);
    }
  });
});
