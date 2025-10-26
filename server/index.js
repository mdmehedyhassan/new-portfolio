const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vlcgp9b.mongodb.net/`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("portfolioDB");
    const projectsCollection = db.collection("projects");
    const blogsCollections = db.collection("blogs");

    app.get('/projects',  async (req, res) => {
      const query = {};
      const cursor = projectsCollection.find(query);
      const projects = await cursor.toArray();
      res.send(projects);
    });
    app.post('/projects', async (req, res) => {
      const newProject = req.body;
      const result = await projectsCollection.insertOne(newProject);
      res.send(result);
    });

    app.get('/tags',  async (req, res) => {
      const query = {tags: req.query.tag};
      const cursor = projectsCollection.find(query);
      const tags = await cursor.toArray();
      res.send(tags);
    });
    app.get('/categories/:category',  async (req, res) => {
      const category = req.params.category;
      const query = {category: category};
      const cursor = projectsCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    app.get('/blogs',  async (req, res) => {
      const query = {};
      const cursor = blogsCollections.find(query);
      const blogs = await cursor.toArray();
      res.send(blogs);
    });
    app.post('/blogs', async (req, res) => {
      const newblog = req.body;
      const result = await blogsCollections.insertOne(newblog);
      res.send(result);
    });


    
  } catch (error) {
  } finally {
    // await client.close();
  }
}

run().catch;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log('http://localhost:'+ port)
})