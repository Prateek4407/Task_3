


const express = require('express');
const students = require('./DATA.json');
const app = express();
const fs = require('fs');
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});



app.get('/api/students', (req, res) => {
  res.json(students);
});

app.get('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid student ID" });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ status: "error", message: "Student not found" });
  }

  return res.json(student);
});

app.post("/api/students", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({
      status: "error",
      message: "name, age, and course are all required"
    });
  }

  const newId = students.length > 0
    ? Math.max(...students.map(s => s.id)) + 1
    : 1;

  students.push({ name, age, course, id: newId });
  fs.writeFile("./DATA.json", JSON.stringify(students, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: "error" });
    }
    res.status(201).json({ status: "success" });
  });
});

app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Student not found" });
  }

  students.splice(index, 1);

  fs.writeFile("./DATA.json", JSON.stringify(students, null, 2), err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: "error", message: "Failed to delete student" });
    }
    res.status(200).json({ status: "success", message: "Student deleted successfully" });
  });
});

app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedStudent = req.body;
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Student not found" });
  }

  const { name, age, course } = updatedStudent;

  if (!name || !age || !course) {
    return res.status(400).json({
      status: "error",
      message: "name, age, and course are all required"
    });
  }

  students[index] = { id, name, age, course };

  fs.writeFile("./DATA.json", JSON.stringify(students, null, 2), err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: "error", message: "Failed to update student" });
    }
    res.status(200).json({ status: "success", message: "Student updated successfully", student: students[index] });
  });
});






app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});
