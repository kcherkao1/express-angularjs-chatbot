const express = require('express');
const classifier = require('../DB/classifier');
// var cors = require('cors');
const router = express.Router();




router.post('/test', async (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  const db = req.app.locals.db; // Access the db object from app locals

  try {
    // Fetch all intents from the database
    const intents = await db.find({}).toArray();

    // Implement logic to match user message with intent patterns and generate a response
    let botResponse = 'I did not understand that.';

    // Use the classifier to predict the intent of the user's message
    const predictedIntent = classifier.classify(userMessage);

    // Find the intent object that matches the predicted intent
    const matchedIntent = intents.find(intent => intent.tag.toLowerCase() === predictedIntent);

    // If a matching intent was found, choose a random response from that intent
    if (matchedIntent) {
      botResponse = matchedIntent.responses[Math.floor(Math.random() * matchedIntent.responses.length)];
    }

    res.json({ response: botResponse });
  } catch (error) {
    console.error('Failed to fetch intents from the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
