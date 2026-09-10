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
  const student = students.find((student) => student.id === id );
  return res.json(student);
  
});

app.post("/api/students", (req, res) => {
  const body = req.body;
  students.push({ ...body, id: students.length + 1 });
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

  
  students[index] = { id, ...updatedStudent };

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

