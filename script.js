document.addEventListener('DOMContentLoaded', (event) => {
    loadNotes();
});

document.getElementById('add-note-button').addEventListener('click', function() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();
    
    if (noteText) {
        addNoteToDOM(noteText);
        saveNoteToLocalStorage(noteText);
        noteInput.value = '';
    }
});

function addNoteToDOM(noteText) {
    const notesSection = document.getElementById('notes-section');
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    
    const noteContent = document.createTextNode(noteText);
    noteDiv.appendChild(noteContent);
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function() {
        notesSection.removeChild(noteDiv);
        deleteNoteFromLocalStorage(noteText);
    });
    
    noteDiv.appendChild(deleteButton);
    notesSection.appendChild(noteDiv);
}

function saveNoteToLocalStorage(noteText) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => addNoteToDOM(note));
}

function deleteNoteFromLocalStorage(noteText) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}
