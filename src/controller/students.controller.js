const {
  getAllData,
  getData,
  addData,
  updateData,
  deleteData,
} = require("../model/students.model");

async function httpAllGetData(req, res) {
  const result = await getAllData();
  res.status(200).json(result);
}

async function httpGetData(req, res) {
  const name = req.params.name;
  const result = await getData(name);
  res.status(200).json(result);
}

async function httpAddData(req, res) {
  const data = req.body;
  await addData(data);
  res.status(200).json(data);
}

async function httpUpdateData(req, res) {
  const data = req.body;
  await updateData(data);
  res.status(200).json(data);
}

async function httpDeleteData(req, res) {
  const name = req.params.name;
  await deleteData(name);
  res.status(200).json(name);
}

module.exports = {
  httpAllGetData,
  httpGetData,
  httpAddData,
  httpUpdateData,
  httpDeleteData,
};
