const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (_, res) {
    res.send({
        appName: 'resume-api-express',
        stack: 'Node.js, Express, MongoDB',
        version: '1.0.0',
        url: 'https://github.com/jlmodell/resume-api-express',
    });
});

const client = new MongoClient(process.env.MONGODB_URI)

async function initialInsert() {
    await client.connect()
    const db = client.db('personal')
    console.log(db)
    const coll = db.collection('resume')
    console.log(coll)

    await coll.insertOne({
        name: 'Jeff Modell',
        email: 'modell.jeff@me.com',
        pronouns: "he/him",
        certifications: ['Network+',],
        skills: ['Web Developer', 'Software Engineer', 'Database Administrator', 'Network Administrator', 'ReactJS', 'NextJS', 'Vue', 'NodeJS', 'Express', 'Fastify', 'NestJS', 'Python', 'FastAPI', 'Pandas', 'Numpy', 'Pola.rs', 'Go', 'Fiber.v2', 'Viper', 'Rust', 'Rocket', 'Jinja2', 'Pug', 'HTML', 'CSS3', 'Tailwindcss', 'Mongodb', 'NoSQL', 'Postgres', 'Prisma',],
        projects: [
            "https://github.com/jlmodell/resume-api-express",
            "https://github.com/jlmodell/resume-api-go",
            "https://github.com/jlmodell/resume-api-fastapi",
            "https://github.com/jlmodell/resume-frontend-react",
            "https://github.com/jlmodell/resume-frontend-svelte3",

        ]
    })
}

app.get('/api/resume', async function (_, res) {
    // await initialInsert()

    await client.connect()
    const db = client.db('personal')
    const coll = db.collection('resume')

    const resume = await coll.findOne({})

    res.send(resume)
})

app.put('/api/resume/skills', async function (req, res) {
    await client.connect()
    const db = client.db('personal')
    const coll = db.collection('resume')
    const filter = { _id: new ObjectId('627b1d0ac160c4b9d29a6b30') }

    const { skills } = await coll.findOne(filter, { projection: { _id: 0, skills: 1 } })

    if (skills.includes(req.body.skill)) {
        res.status(406).send('Skill already exists')
        return
    }

    if (!req.body.skill) {
        res.status(406).send('Skill is required')
        return
    }

    await coll.updateOne(filter, { $push: { skills: req.body.skill } })

    return res.send('Skill added')
})


app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
})