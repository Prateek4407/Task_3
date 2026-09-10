# Task_3

# Student Management REST API

A basic REST API to manage student records, built to understand backend fundamentals — routing, HTTP methods, request/response cycle, JSON, and CRUD operations. Data is stored in a local `DATA.json` file instead of a database.

## Tech Stack

- Node.js
- Express.js

## How to Run

```bash
npm install
node index.js
```

The server will start at `http://localhost:8000`.

## API Documentation

| Method | Endpoint             | Purpose             |
|--------|-----------------------|----------------------|
| GET    | /api/students         | Get all students     |
| GET    | /api/students/:id     | Get student by ID    |
| POST   | /api/students         | Add a student        |
| PUT    | /api/students/:id     | Update a student     |
| DELETE | /api/students/:id     | Delete a student     |

### POST /api/students

**Request body**
```json
{
  "name": "Rahul",
  "age": 20,
  "course": "BTech"
}
```

**Response (201 Created)**
```json
{
  "status": "success"
}
```

### PUT /api/students/:id

**Request body**
```json
{
  "name": "Raj Kumar",
  "age": 21,
  "course": "CSE"
}
```

**Response (200 OK)**
```json
{
  "status": "success",
  "message": "Student updated successfully",
  "student": {
    "id": 1,
    "name": "Raj Kumar",
    "age": 21,
    "course": "CSE"
  }
}
```

## Error Handling

- Invalid/non-numeric ID → `400 Bad Request`
- Student not found → `404 Not Found`
- Missing required fields (`name`, `age`, `course`) on POST/PUT → `400 Bad Request`

## Data Persistence

Student data lives in `DATA.json` and is loaded into memory on server start. Any create, update, or delete is written back to `DATA.json` so changes survive a server restart.
