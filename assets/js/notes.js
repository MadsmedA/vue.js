new Vue({
  el: "#notes",
  data: {
    notes: [],
    note: "",
  },

  beforeMount() {
    this.getFromLocalStorage();
    console.table(this.notes);
  },

  methods: {
    onSaveNote() {
      let newNote = {
        title: this.note,
      };
      this.note = "";

      this.notes.push(newNote);

      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      let jsonNotes = JSON.stringify(this.notes);
      localStorage.setItem("notes", jsonNotes);
      console.log(jsonNotes);
    },

    getFromLocalStorage() {
      let lsNotes = localStorage.getItem("notes");

      if (lsNotes === null) {
        lsNotes = "[]";
      }

      this.notes = JSON.parse(lsNotes);
    },
    
    changeToInput(i) {
        let e = event.target;
        e.parentElement.innerHTML = '<input type="checkbox"/><input type="text" onkeyup="" autofocus>';

        this.editText(i);
    },
    
    editText(i) {
        // console.log(i);
        let newTask = prompt("New task", this.notes[i].title);
        if( newTask !== null ){
            this.notes[i].title = newTask;
        }
        this.saveToLocalStorage();
    },
},
});
