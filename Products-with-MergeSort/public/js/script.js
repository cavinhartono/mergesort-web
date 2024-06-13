function mergeSort(Arr, order = "asc") {
  if (Arr.length < 2) {
    return Arr;
  }

  const mid = Math.floor(Arr.length / 2);
  const left = Arr.slice(0, mid);
  const right = Arr.slice(mid);

  return merge(mergeSort(left, order), mergeSort(right, order), order);
}

function merge(Left, Right, order) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < Left.length && rightIndex < Right.length) {
    if (
      (order === "asc" && Left[leftIndex].nim < Right[rightIndex].nim) ||
      (order === "desc" && Left[leftIndex].nim > Right[rightIndex].nim)
    ) {
      result.push(Left[leftIndex]);
      leftIndex++;
    } else {
      result.push(Right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(Left.slice(leftIndex)).concat(Right.slice(rightIndex));
}

function sortStudents(order) {
  const studentList = document.getElementById("student-list");
  let Students = Array.from(studentList.getElementsByTagName("li"));

  Students = Students.map((student) => ({
    element: student,
    nim: parseInt(student.getAttribute("data-nim")),
  }));

  const sortedStudents = mergeSort(Students, order);

  studentList.innerHTML = "";

  sortedStudents.forEach((student) => {
    studentList.appendChild(student.element);
  });
}

function addStudent() {
  const name = document.getElementById("student-name").value;
  const nim = document.getElementById("student-nim").value;

  if (name === "" || nim === "") {
    alert("Please enter both student name and NIM.");
    return;
  }

  const studentList = document.getElementById("student-list");
  const li = document.createElement("li");
  li.setAttribute("data-nim", nim);
  li.innerHTML = `${nim} | ${name} <button class="delete-btn" onclick="deleteStudent(this)">Delete</button>`;

  studentList.appendChild(li);

  // Clear input fields
  document.getElementById("student-name").value = "";
  document.getElementById("student-nim").value = "";
}

function deleteStudent(button) {
  const li = button.parentElement;
  li.remove();
}
