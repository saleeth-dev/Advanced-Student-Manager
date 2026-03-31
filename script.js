// IIFE
(function () {

  // Class (OOP)
  class Student {
    constructor(name, marks) {
      this.name = name;
      this.marks = marks;
      this.id = Date.now();
    }

    // Method (OOP)
    getGrade() {
      if (this.marks >= 90) return "A";
      if (this.marks >= 75) return "B";
      if (this.marks >= 50) return "C";
      return "F";
    }
  }

  let students = [];

  const nameInput = document.getElementById("name");
  const marksInput = document.getElementById("marks");
  const addBtn = document.getElementById("addBtn");
  const list = document.getElementById("studentList");
  const avgDisplay = document.getElementById("average");
  const searchInput = document.getElementById("search");

  // Pure Function
  const calculateAverage = (arr) =>
    arr.length === 0 ? 0 :
    (arr.reduce((sum, s) => sum + s.marks, 0) / arr.length).toFixed(2);

  // Recursion
  function countStudents(arr, index = 0) {
    if (index >= arr.length) return 0;
    return 1 + countStudents(arr, index + 1);
  }

  // Higher-order function
  function processData(callback) {
    callback();
  }

  // Render
  function render(data = students) {
    list.innerHTML = "";

    data.map(({ name, marks, id }) => {
      const student = students.find(s => s.id === id);

      const li = document.createElement("li");
      li.innerHTML = `
        ${name} - ${marks} (${student.getGrade()})
        <span class="delete" data-id="${id}">❌</span>
      `;
      list.appendChild(li);
    });

    avgDisplay.textContent = calculateAverage(students);

    console.log("Total Students:", countStudents(students));
  }

  // Add
  addBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const marks = Number(marksInput.value);

    if (!name || !marks) return alert("Enter valid data");

    const newStudent = new Student(name, marks);

    // Spread
    students = [...students, newStudent];

    processData(render);

    nameInput.value = "";
    marksInput.value = "";
  });

  // Delete
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const id = Number(e.target.dataset.id);

      // Filter
      students = students.filter(s => s.id !== id);

      render();
    }
  });

  // Search
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = students.filter(s =>
      s.name.toLowerCase().includes(value)
    );

    render(filtered);
  });

})();