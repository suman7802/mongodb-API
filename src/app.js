const studentsRouter = require("./router/students.router");
const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/api/students", studentsRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
