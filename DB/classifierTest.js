const intents = require('./intents');  // Replace with the path to your intents file
const classifier = require('./classifier');  // Replace with the path to your classifier file

for (let intent of intents) {
  for (let pattern of intent.patterns) {
    // Here, I'm assuming your classifier has a "train" method that takes a pattern and a tag.
    classifier.addDocument(pattern, intent.tag);
  }
}

classifier.train();

console.log(classifier.classify("Hello"));  // This should log the tag for your greeting intent
console.log(classifier.classify("Goodbye"));  // This should log the tag for your goodbye intent
// Add more tests as needed...
