const initialInsert = async () => {
  await client.connect();
  const db = client.db("personal");
  console.log(db);
  const coll = db.collection("resume");
  console.log(coll);

  await coll.insertOne({
    name: "Jeff Modell",
    email: "modell.jeff@me.com",
    pronouns: "he/him",
    certifications: ["Network+"],
    skills: [
      "Web Developer",
      "Software Engineer",
      "Database Administrator",
      "Network Administrator",
      "ReactJS",
      "NextJS",
      "Vue",
      "NodeJS",
      "Express",
      "Fastify",
      "NestJS",
      "Python",
      "FastAPI",
      "Pandas",
      "Numpy",
      "Pola.rs",
      "Go",
      "Fiber.v2",
      "Viper",
      "Rust",
      "Rocket",
      "Jinja2",
      "Pug",
      "HTML",
      "CSS3",
      "Tailwindcss",
      "Mongodb",
      "NoSQL",
      "Postgres",
      "Prisma",
    ],
    projects: [
      "https://github.com/jlmodell/resume-api-express",
      "https://github.com/jlmodell/resume-api-go",
      "https://github.com/jlmodell/resume-api-fastapi",
      "https://github.com/jlmodell/resume-frontend-react",
      "https://github.com/jlmodell/resume-frontend-svelte3",
    ],
  });
};

export default initialInsert;
