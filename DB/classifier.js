const natural = require('natural');
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/chatbotDB";

const classifier = new natural.BayesClassifier();

async function trainClassifier() {
  try {
    const client = await MongoClient.connect(uri);
    console.log('Connected to MongoDB');

    const collection = client.db("chatbotDB").collection("intents");
    const intents = await collection.find({}).toArray();

    intents.forEach(intent => {
      intent.patterns.forEach(pattern => {
        classifier.addDocument(pattern.toLowerCase(), intent.tag.toLowerCase());
      });
    });

    classifier.train();

    console.log('Classifier trained.');
    client.close();
  } catch (err) {
    console.error('Failed to train classifier:', err);
  }
}

trainClassifier();

module.exports = classifier;
