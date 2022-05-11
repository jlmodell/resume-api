const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const PORT = 8000;

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", function (_, res) {
  res.send({
    appName: "resume-api-express",
    stack: "Node.js, Express, MongoDB",
    version: "1.0.0",
    url: "https://github.com/jlmodell/resume-api-express",
  });
});

const client = new MongoClient(process.env.MONGODB_URI);

// routes

app.get("/api/resume", async function (_, res) {
  await client.connect();
  const db = client.db("personal");
  const coll = db.collection("resume");

  const resume = await coll.findOne({});

  res.send(resume);
});

app.put("/api/resume/skills", async function (req, res) {
  await client.connect();
  const db = client.db("personal");
  const coll = db.collection("resume");
  const filter = { _id: new ObjectId("627b1d0ac160c4b9d29a6b30") };

  const { skills } = await coll.findOne(filter, {
    projection: { _id: 0, skills: 1 },
  });

  if (skills.includes(req.body.skill)) {
    res.status(406).send("Skill already exists");
    return;
  }

  if (!req.body.skill) {
    res.status(406).send("Skill is required");
    return;
  }

  await coll.updateOne(filter, { $push: { skills: req.body.skill } });

  return res.send("Skill added");
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
