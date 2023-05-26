const {
  httpAllGetData,
  httpGetData,
  httpAddData,
  httpUpdateData,
  httpDeleteData,
} = require("../controller/students.controller");

const express = require("express");
const studentsRouter = express.Router();

studentsRouter.get("/", httpAllGetData);
studentsRouter.get("/:name", httpGetData);
studentsRouter.post("/", httpAddData);
studentsRouter.put("/", httpUpdateData);
studentsRouter.delete("/:name", httpDeleteData);

module.exports = studentsRouter;
