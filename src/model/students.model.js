const {MongoClient} = require("mongodb");
require('dotenv').config()
// const uri = "mongodb://0.0.0.0:27017";
const uri = `mongodb+srv://suman:${process.env.pass}@csstudents.ebuav9s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const database = client.db("students");
const csStudents = database.collection("csStudents");

async function getAllData() {
  try {
    const options = {
      projection: {_id: false, name: true, section: true, code: true},
    };
    const result = csStudents.find({}, options);
    if ((await csStudents.countDocuments({})) === 0) {
      console.log(`No data found`);
      return false;
    }
    const results = [];
    for await (const data of result) {
      results.push(data);
    }
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function getData(data) {
  try {
    const query = {name: data};
    const options = {
      projection: {_id: false, name: true, code: true},
    };
    const result = csStudents.find(query, options);
    if ((await csStudents.countDocuments(query)) === 0) {
      console.log(`no matching data found`);
      return false;
    }
    const response = [];
    for await (const data of result) {
      response.push(data);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addData(data) {
  try {
    const document = {
      name: data.name,
      section: data.section,
      code: data.code,
    };
    const result = await csStudents.insertOne(document);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  }
}

async function updateData(data) {
  try {
    const oldData = {name: data.oldName};
    const newData = {
      $set: {
        name: data.newName,
        section: data.section,
        code: data.code,
      },
    };
    const options = {
      upsert: true,
    };

    if ((await csStudents.countDocuments(oldData)) === 0) {
      console.log(`No data found`);
      return false;
    } else {
      const result = await csStudents.updateOne(oldData, newData, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(data) {
  try {
    const query = {name: data};
    const result = csStudents.deleteOne(query);
    if ((await result).deletedCount === 1) {
      console.log(`Successfully deleted one document`);
    } else {
      console.log(`No documents matched the query. Deleted 0 documents`);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getData,
  addData,
  getAllData,
  updateData,
  deleteData,
};
