const express = require('express');
const bodyParser = require('body-parser');
const chatRouter = require('./routes/chat');
const { MongoClient } = require('mongodb');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db('chatbotDB').collection('intents');

    // Mount the router here after database connection is established
    app.use('/api/chat', chatRouter);

    app.locals.db = db; // Make the db object accessible in app locals

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

connectToDatabase();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
